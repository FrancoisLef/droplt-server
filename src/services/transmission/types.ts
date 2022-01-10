import { Torrent } from '@prisma/client';

export type FeedTorrent = Omit<
  Torrent,
  'torrentId' | 'createdAt' | 'updatedAt'
>;

export type RealtimeTorrent = FeedTorrent & {
  peers: number;
  seeds: number;
  upload: number;
  download: number;
  eta: number;
};
