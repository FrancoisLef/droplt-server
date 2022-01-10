import * as TypeGraphQL from 'type-graphql';

import { Torrent } from '../../generated';

@TypeGraphQL.Resolver(() => Torrent)
export default class CustomTorrentResolver {
  @TypeGraphQL.FieldResolver(() => String, { nullable: true })
  async download() {
    return '';
  }

  @TypeGraphQL.FieldResolver(() => String, { nullable: true })
  async upload() {
    return '';
  }
}
