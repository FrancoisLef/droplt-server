import { Torrent } from '@prisma/client';

export type PrismaTorrentPayload = Omit<
  Torrent,
  'torrentId' | 'createdAt' | 'updatedAt'
>;

export type FeedTorrent = PrismaTorrentPayload & {
  eta?: number;
  peers?: number;
  seeds?: number;
  download?: number;
  upload?: number;
};

export interface RawFeed {
  [hash: string]: Record<string, FeedTorrent>;
}

export interface CreatesFeed {
  [hash: string]: Record<string, FeedTorrent>;
}

export interface UpdatesFeed {
  [hash: string]: Record<string, Partial<FeedTorrent>>;
}

export interface DiffFeed {
  creates: CreatesFeed;
  updates: UpdatesFeed;
  deletes: string[];
}
