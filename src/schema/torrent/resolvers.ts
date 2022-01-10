import * as TypeGraphQL from 'type-graphql';

import { Torrent } from '../__generated__';

@TypeGraphQL.Resolver(() => Torrent)
export class CustomTorrentResolver {
  @TypeGraphQL.FieldResolver(() => String, { nullable: true })
  async download() {
    return '';
  }

  @TypeGraphQL.FieldResolver(() => String, { nullable: true })
  async upload() {
    return '';
  }
}
