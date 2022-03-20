import { Torrent } from '@generated/type-graphql';
import * as TGQL from 'type-graphql';

import { Context } from '../types';

@TGQL.Resolver(() => Torrent)
export class TorrentResolver {
  @TGQL.Query(() => [Torrent], {
    nullable: false,
  })
  async torrents(@TGQL.Ctx() { prisma }: Context): Promise<Torrent[]> {
    return prisma.torrent.findMany();
  }
}
