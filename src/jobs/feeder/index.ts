import { Torrent as TransmissionTorrent } from '@ctrl/transmission';
import deepEqual from 'deep-equal';
import { AsyncTask } from 'toad-scheduler';

import prisma from '../../prisma';
import transmission, {
  FeedTorrent,
  normalize,
} from '../../services/transmission';
import { CreatesFeed, DiffFeed, RawFeed, UpdatesFeed } from './types';

class FeederJob {
  private count = 0;
  private currFeed: RawFeed = {};

  public async run(): Promise<void> {
    console.log(`-- RUN ${this.count} --`);
    // fetch data from provider
    const listTorrents = await transmission.listTorrents();

    // build next feed
    const nextFeed = this.formatFeed(listTorrents.arguments.torrents);

    // compute differences between current and next feeds
    const { creates, updates, deletes } = this.feedsDiff(nextFeed);

    // create newly detected torrents
    await this.handleCreates(creates);

    // update already detected torrents
    await this.handleUpdates(updates);

    // delete torrents
    await this.handleDeletes(deletes);

    await this.test();

    this.currFeed = nextFeed;

    console.log(`** DONE ${this.count} **`);
    this.count += 1;
  }

  private test(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`** TIMEOUT ${this.count} **`);
        resolve();
      }, 500);
    });
  }

  public onError(err: Error): void {
    console.log('Oops', err);
  }

  private feedsDiff(nextFeed: RawFeed): DiffFeed {
    const { currFeed } = this;

    const creates: CreatesFeed = {};

    const updates = Object.keys(nextFeed).reduce((acc, hash) => {
      const currFeedItem = currFeed[hash];
      const nextFeedItem = nextFeed[hash];

      // hash doesn't exists: it's a brand new item
      if (typeof currFeedItem === 'undefined') {
        creates[hash] = nextFeedItem;
        return acc;
      }

      // hash exists: compute props differences
      Object.keys(nextFeedItem).forEach((propKey) => {
        // if one of the prop is inequal, we need to add it to the diff
        if (!deepEqual(currFeedItem[propKey], nextFeedItem[propKey])) {
          // initialize hash diff when this is the first known inequal prop
          if (typeof acc[hash] === 'undefined') {
            acc[hash] = {};
          }
          // add prop to diff
          acc[hash][propKey] = nextFeedItem[propKey];
        }
      });

      return acc;
    }, {} as UpdatesFeed);

    const deletes = this.detectDeletes(nextFeed, Object.keys(creates).length);

    return {
      creates,
      updates,
      deletes,
    };
  }

  private async handleCreates(creates: CreatesFeed) {
    const transactions = Object.keys(creates).map((hash) => {
      const torrent = creates[hash] as unknown as FeedTorrent;
      return prisma.torrent.upsert({
        where: {
          hash,
        },
        update: {},
        create: torrent,
      });
    });

    return prisma.$transaction(transactions);
  }

  private async handleUpdates(updates: UpdatesFeed) {
    const transactions = Object.keys(updates).map((hash) => {
      const torrent = updates[hash] as unknown as Partial<FeedTorrent>;
      return prisma.torrent.update({
        where: {
          hash,
        },
        data: torrent,
      });
    });

    return prisma.$transaction(transactions);
  }

  private async handleDeletes(deletes: string[]) {
    const transactions = deletes.map((hash) => {
      return prisma.torrent.delete({
        where: {
          hash,
        },
      });
    });

    return prisma.$transaction(transactions);
  }

  private detectDeletes(nextFeed: RawFeed, newItemCount: number): string[] {
    // we need to look for deleted items in two scenarios:
    // 1. the next feed length is less than the current feed length
    // 2. at least one new item was added and the next feed length is
    //    equal to or greater than the current feed length
    //
    // we definitely don't need to look for deleted items if the number
    // of new items is equal to the difference between next feed list
    // length and previous feed list length
    const nextFeedLength = Object.keys(nextFeed).length;
    const currFeedLength = Object.keys(this.currFeed).length;

    // check if the next feed has less items than the current feed
    let shouldLook = nextFeedLength < currFeedLength;

    if (newItemCount > 0) {
      if (nextFeedLength >= currFeedLength) shouldLook = true;
      if (newItemCount === nextFeedLength - currFeedLength) shouldLook = false;
    }

    if (!shouldLook) {
      return [];
    }

    return Object.keys(this.currFeed).filter(
      (hash) => typeof nextFeed[hash] === 'undefined'
    );
  }

  private formatFeed(torrents: TransmissionTorrent[]): RawFeed {
    return torrents.reduce(
      (acc, torrent) => ({
        ...acc,
        [torrent.hashString]: normalize(torrent),
      }),
      {}
    );
  }
}

const feederJob = new FeederJob();

export default new AsyncTask('feed', () => feederJob.run(), feederJob.onError);
