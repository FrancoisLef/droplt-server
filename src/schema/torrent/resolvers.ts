import * as TypeGraphQL from 'type-graphql';

import { Torrent } from '../__generated__';
import { TorrentStat } from './model';

@TypeGraphQL.Resolver(() => Torrent)
export class CustomTorrentResolver {
  @TypeGraphQL.FieldResolver(() => TorrentStat, { nullable: false })
  async stat(): Promise<TorrentStat> {
    return {};
  }
}
