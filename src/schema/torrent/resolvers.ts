import * as TypeGraphQL from 'type-graphql';

import { Topic } from '../../services/pubSub';
import { Torrent } from '../__generated__';

@TypeGraphQL.Resolver(() => Torrent)
export class CustomTorrentResolver {
  @TypeGraphQL.Subscription(() => [Torrent], {
    topics: Topic.TorrentRealtimeUpdate,
  })
  async torrentsUpdate(
    @TypeGraphQL.Root() updates: Torrent[]
  ): Promise<Torrent[]> {
    return updates;
  }
}
