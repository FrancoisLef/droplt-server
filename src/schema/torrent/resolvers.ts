import * as TypeGraphQL from 'type-graphql';

import { Topic } from '../../services/redis';
// import { FeedTorrent } from '../../services/transmission';
import { Torrent } from '../__generated__';
import { TorrentStats } from './models';

@TypeGraphQL.Resolver(() => Torrent)
export class CustomTorrentResolver {
  @TypeGraphQL.FieldResolver(() => TorrentStats, { nullable: false })
  async stats(@TypeGraphQL.Root() torrent: Torrent): Promise<TorrentStats> {
    return {
      torrentId: torrent.torrentId,
    };
  }

  @TypeGraphQL.Subscription(() => Torrent, {
    topics: Topic.TorrentUpdate,
  })
  async realtimeUpdates(
    @TypeGraphQL.Root() torrentUpdates: Partial<Torrent>
  ): Promise<Partial<Torrent>> {
    console.log('received', torrentUpdates);
    return {
      torrentId: '',
    };
  }
}
