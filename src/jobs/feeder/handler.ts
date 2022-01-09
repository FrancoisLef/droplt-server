import { Torrent as TransmissionTorrent } from '@ctrl/transmission';
// import { Torrent } from '@prisma/client';
import deepEqual from 'deep-equal';

// import { pick } from 'ramda';
import prisma from '../../prisma';
import transmission, {
  FeedTorrent,
  normalize,
} from '../../services/transmission';

interface RawFeed {
  [hash: string]: Record<string, FeedTorrent>;
}

interface CreatesFeed {
  [hash: string]: Record<string, FeedTorrent>;
}

interface UpdatesFeed {
  [hash: string]: Record<string, Partial<FeedTorrent>>;
}

interface DiffFeed {
  creates: CreatesFeed;
  updates: UpdatesFeed;
}

// const PROPS_TO_SAVE: Array<keyof NormalizedTorrent> = [
//   'id',
//   'name',
//   'hash',
//   'totalSize',
//   'progress',
//   'state',
// ];

export default class Handler {
  private currFeed: RawFeed = {};

  public async run(): Promise<void> {
    // fetch data from provider
    const listTorrents = await transmission.listTorrents();

    // build next feed
    const nextFeed = this.formatFeed(listTorrents.arguments.torrents);

    // build diff with current feed
    const { creates, updates } = this.feedsDiff(nextFeed);

    // insert newly added torrents
    await this.handleCreates(creates);

    // update existing torrents
    await this.handleUpdates(updates);

    console.log(creates, updates);

    // // build diff to be applied to database
    // const updates = this.formatUpdates(feedDiff);

    // if (updates.length !== 0) {
    //   console.log(updates);
    //   // const upserts = updates.map(data => {
    //   //   const { hash, name } = data;

    //   //   return prisma.torrent.upsert({
    //   //     where: {
    //   //       hash
    //   //     },
    //   //     update: data,
    //   //     create: {
    //   //       hash,
    //   //       name,
    //   //     }
    //   //   });
    //   // });
    //   // await prisma.$transaction(upserts);
    //   // // console.log(updates);
    //   // const batch = repository.createBatch();
    //   // updates.map((update) => {
    //   //   const torrent = new Torrent();
    //   //   if (update.uuid) {
    //   //     torrent.id = update.uuid;
    //   //   }
    //   //   if (update.name) {
    //   //     torrent.name = update.name;
    //   //   }
    //   //   if (update.totalSize) {
    //   //     torrent.size = update.totalSize;
    //   //   }
    //   //   if (update.state) {
    //   //     torrent.state = update.state;
    //   //   }
    //   //   if (update.progress) {
    //   //     torrent.progress = update.progress;
    //   //   }
    //   //   batch.create(torrent);
    //   // });
    //   // await batch.commit();
    // }

    this.currFeed = nextFeed;
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

    return {
      creates,
      updates,
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

  // private handleDeletedItems(nextFeed: Feed, newItemCount: number) {
  //   // we need to look for deleted items in two scenarios:
  //   // 1. the next feed length is less than the current feed length
  //   // 2. at least one new item was added and the next feed length is
  //   //    equal to or greater than the current feed length
  //   //
  //   // we definitely don't need to look for deleted items if the number
  //   // of new items is equal to the difference between next feed list
  //   // length and previous feed list length
  //   const nextFeedLength = Object.keys(nextFeed).length;
  //   const currFeedLength = Object.keys(this.currFeed).length;

  //   // check if the next feed has less items than the current feed
  //   let shouldLook = nextFeedLength < currFeedLength;

  //   if (newItemCount > 0) {
  //     if (nextFeedLength >= currFeedLength) shouldLook = true;
  //     if (newItemCount === nextFeedLength - currFeedLength) shouldLook = false;
  //   }

  //   if (shouldLook) {
  //     Object.keys(this.currFeed).forEach((hash) => {
  //       if (typeof nextFeed[hash] === 'undefined') {
  //         // soft delete item from database
  //         console.log('DELETE', hash);
  //       }
  //     });
  //   }
  // }

  // private formatUpdates(feed: Feed): Array<Partial<Torrent>> {
  //   // We need to filter the torrent properties we want to save to database.
  //   // To ease this process we add torrent uuit to.
  //   return Object.keys(feed)
  //     .filter(
  //       (hash) => Object.keys(pick(PROPS_TO_SAVE, feed[hash])).length !== 0
  //     )
  //     .map((hash) => ({
  //       hash,
  //       ...pick(PROPS_TO_SAVE, feed[hash]),
  //     }));
  // }

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
