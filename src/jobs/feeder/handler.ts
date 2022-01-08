import { Torrent } from '@prisma/client';
import deepEqual from 'deep-equal';
import { pick } from 'ramda';

import prisma from '../../prisma';
import transmission, {
  NormalizedTorrent,
  normalizeTransmissionTorrent,
} from '../../services/transmission';

interface Feed {
  [id: string]: Record<string, Partial<NormalizedTorrent>>;
}

const PROPS_TO_SAVE: Array<keyof NormalizedTorrent> = [
  'id',
  'name',
  'hash',
  'totalSize',
  'progress',
  'state',
];

export default class Handler {
  private currFeed: Feed = {};

  public async run(): Promise<void> {
    // fetch data from provider
    const listTorrents = await transmission.listTorrents();

    // normalize data
    const torrents = listTorrents.arguments.torrents.map((t) =>
      normalizeTransmissionTorrent(t)
    );

    // build next feed
    const nextFeed = this.formatFeed(torrents);

    // build diff with current feed
    const feedDiff = this.feedDiff(nextFeed);

    // build diff to be applied to database
    const updates = this.formatUpdates(feedDiff);

    if (updates.length !== 0) {
      console.log(updates);
      // const upserts = updates.map(data => {
      //   const { hash, name } = data;

      //   return prisma.torrent.upsert({
      //     where: {
      //       hash
      //     },
      //     update: data,
      //     create: {
      //       hash,
      //       name,
      //     }
      //   });
      // });
      // await prisma.$transaction(upserts);
      // // console.log(updates);
      // const batch = repository.createBatch();
      // updates.map((update) => {
      //   const torrent = new Torrent();
      //   if (update.uuid) {
      //     torrent.id = update.uuid;
      //   }
      //   if (update.name) {
      //     torrent.name = update.name;
      //   }
      //   if (update.totalSize) {
      //     torrent.size = update.totalSize;
      //   }
      //   if (update.state) {
      //     torrent.state = update.state;
      //   }
      //   if (update.progress) {
      //     torrent.progress = update.progress;
      //   }
      //   batch.create(torrent);
      // });
      // await batch.commit();
    }

    this.currFeed = nextFeed;
  }

  public onError(err: Error): void {
    console.log('Oops', err);
  }

  private feedDiff(nextFeed: Feed): Feed {
    const { currFeed } = this;

    let newItemCount = 0;
    const newItemHash: string[] = [];

    const diff = Object.keys(nextFeed).reduce((acc, hash) => {
      const currFeedItem = currFeed[hash];
      const nextFeedItem = nextFeed[hash];

      // hash doesn't exists: it's a brand new item, so every detail is part of the diff
      if (typeof currFeedItem === 'undefined') {
        // // add whole item to diff
        // acc[hash] = nextFeedItem;
        newItemCount += 1;
        newItemHash.push(hash);
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
    }, {} as Feed);

    // insert added items
    this.handleAddedItems(nextFeed, newItemHash);

    // try to detect deleted torrents
    this.handleDeletedItems(nextFeed, newItemCount);

    return diff;
  }

  private async handleAddedItems(nextFeed: Feed, hashes: string[]) {
    if (hashes.length === 0) {
      return;
    }

    // force typescript to consider this array
    // as an array of complete normalized torrent
    // instead of an array of partial normalized ones
    const torrents = hashes.map(
      (hash) => nextFeed[hash]
    ) as unknown as NormalizedTorrent[];
    const transactions = torrents.map((torrent) => {
      const { hash, name, state, progress, totalSize } = torrent;
      return prisma.torrent.create({
        data: {
          hash,
          name,
          progress,
          status: state,
          totalSize,
        },
      });
    });
    await prisma.$transaction(transactions);
  }

  private handleDeletedItems(nextFeed: Feed, newItemCount: number) {
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

    if (shouldLook) {
      Object.keys(this.currFeed).forEach((hash) => {
        if (typeof nextFeed[hash] === 'undefined') {
          // soft delete item from database
          console.log('DELETE', hash);
        }
      });
    }
  }

  private formatFeed(torrents: NormalizedTorrent[]): Feed {
    return torrents.reduce(
      (acc, torrent) => ({
        ...acc,
        [torrent.hash]: torrent,
      }),
      {}
    );
  }

  private formatUpdates(feed: Feed): Array<Partial<Torrent>> {
    // We need to filter the torrent properties we want to save to database.
    // To ease this process we add torrent uuit to.
    return Object.keys(feed)
      .filter(
        (hash) => Object.keys(pick(PROPS_TO_SAVE, feed[hash])).length !== 0
      )
      .map((hash) => ({
        hash,
        ...pick(PROPS_TO_SAVE, feed[hash]),
      }));
  }
}
