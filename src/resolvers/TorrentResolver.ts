import * as TGql from 'type-graphql';

import { Torrent } from '../models/Torrent';
import { Context } from '../types';

@TGql.Resolver(() => Torrent)
export class TorrentResolver {
  @TGql.Query(() => [Torrent], {
    nullable: false,
  })
  async torrents(@TGql.Ctx() { prisma }: Context): Promise<Torrent[]> {
    return prisma.torrent.findMany();
  }
}
