import { Torrent } from '@generated/type-graphql';
import { Ctx, Query, Resolver } from 'type-graphql';

import { Context } from '../types';

@Resolver(() => Torrent)
export class TorrentResolver {
  @Query(() => [Torrent], {
    nullable: false,
  })
  async torrents(@Ctx() { prisma }: Context): Promise<Torrent[]> {
    return prisma.torrent.findMany();
  }
}
