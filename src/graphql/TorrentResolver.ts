import { GraphQLResolveInfo } from 'graphql';
import graphqlFields from 'graphql-fields';
import * as TGQL from 'type-graphql';

import { Context } from '../types';
import { FindManyTorrentArgs, Torrent } from './__generated__';
import {
  transformCountFieldIntoSelectRelationsCount,
  transformFields,
} from './__generated__/helpers';

@TGQL.Resolver(() => Torrent)
export class TorrentResolver {
  @TGQL.Query(() => [Torrent], {
    nullable: false,
  })
  async torrents(
    @TGQL.Ctx() { prisma }: Context,
    @TGQL.Info() info: GraphQLResolveInfo,
    @TGQL.Args() args: FindManyTorrentArgs
  ): Promise<Torrent[]> {
    const { _count } = transformFields(graphqlFields(info));
    return prisma.torrent.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
