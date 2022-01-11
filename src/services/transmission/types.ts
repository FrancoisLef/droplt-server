import { Torrent } from '@prisma/client';

export type FeedTorrent = Omit<
  Torrent,
  'torrentId' | 'createdAt' | 'updatedAt'
>;

// export interface RealtimeTorrentUpdates {
//   torrentId: string;
//   peers: number;
//   seeds: number;
//   upload: number;
//   download: number;
//   eta: number;
// }
