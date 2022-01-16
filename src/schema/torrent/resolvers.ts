import * as TypeGraphQL from 'type-graphql';

import { Topic } from '../../services/pubSub';
import { Torrent } from '../__generated__';

@TypeGraphQL.Resolver(() => Torrent)
export class CustomTorrentResolver {
  @TypeGraphQL.FieldResolver(() => Number, { nullable: true })
  async eta(@TypeGraphQL.Root() torrent: Torrent): Promise<number | null> {
    return torrent.eta || null;
  }

  @TypeGraphQL.FieldResolver(() => Number, { nullable: true })
  async download(@TypeGraphQL.Root() torrent: Torrent): Promise<number | null> {
    return torrent.download || null;
  }

  @TypeGraphQL.FieldResolver(() => Number, { nullable: true })
  async upload(@TypeGraphQL.Root() torrent: Torrent): Promise<number | null> {
    return torrent.upload || null;
  }

  @TypeGraphQL.FieldResolver(() => Number, { nullable: true })
  async seeds(@TypeGraphQL.Root() torrent: Torrent): Promise<number | null> {
    return torrent.seeds || null;
  }

  @TypeGraphQL.FieldResolver(() => Number, { nullable: true })
  async peers(@TypeGraphQL.Root() torrent: Torrent): Promise<number | null> {
    return torrent.peers || null;
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
