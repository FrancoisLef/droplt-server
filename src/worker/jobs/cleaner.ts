import { AsyncTask } from 'toad-scheduler';

import { normalize } from '../helpers';
import prisma from '../services/prisma';
import transmission from '../services/transmission';
import { RawFeed } from '../types';

class CleanerJob {
  private currFeed: RawFeed = {};

  public async run(): Promise<void> {
    // fetch data from provider
    const listTorrents = await transmission.listTorrents();

    // count torrents from database
    const dbTorrentsCount = await prisma.torrent.count();

    // count torrents from provider
    const btTorrentsCount = listTorrents.arguments.torrents.length;

    if (btTorrentsCount === dbTorrentsCount) {
      return;
    }

    // get torrents id from database
    const dbTorrents = await prisma.torrent.findMany({
      select: {
        torrentId: true,
      },
    });

    // get torrents id from provider
    const btTorrentsIds = listTorrents.arguments.torrents.map(
      (torrent) => normalize(torrent).torrentId
    );

    // find differences
    const toDelete = dbTorrents
      .filter((torrent) => !btTorrentsIds.includes(torrent.torrentId))
      .map((torrent) => torrent.torrentId);

    if (toDelete.length === 0) {
      return;
    }

    // delete from database
    const transactions = toDelete.map((torrentId) => {
      return prisma.torrent.delete({
        where: {
          torrentId,
        },
      });
    });

    await prisma.$transaction(transactions);
  }

  public onError(err: Error): void {
    console.log('Oops', err);
  }
}

const cleanerJob = new CleanerJob();

export default new AsyncTask(
  'clean',
  () => cleanerJob.run(),
  cleanerJob.onError
);
