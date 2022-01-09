import { Torrent } from '@prisma/client';

export type NormalizedTorrent = Omit<
  Torrent,
  'torrentId' | 'createdAt' | 'updatedAt'
>;
