import * as TypeGraphQL from 'type-graphql';

import { Topic } from '../../services/pubSub';
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

  @TypeGraphQL.Subscription(() => [Torrent], {
    topics: Topic.TorrentRealtimeUpdate,
  })
  async torrentsUpdate(
    @TypeGraphQL.Root() updates: Torrent[]
  ): Promise<Torrent[]> {
    return updates;
  }
}
