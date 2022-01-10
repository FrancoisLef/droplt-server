import * as TypeGraphQL from 'type-graphql';

import { Torrent } from '../__generated__';
import { TorrentStats } from './models';

@TypeGraphQL.Resolver(() => Torrent)
export class CustomTorrentResolver {
  @TypeGraphQL.FieldResolver(() => TorrentStats, { nullable: false })
  async stats(): Promise<TorrentStats> {
    return {};
  }
}
