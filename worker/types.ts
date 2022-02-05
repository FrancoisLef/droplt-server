import { Torrent } from '@prisma/client';

export type PrismaTorrentPayload = Omit<
  Torrent,
  'createdAt' | 'updatedAt' | 'deletedAt'
>;

export type FeedTorrent = PrismaTorrentPayload;

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

export enum Topic {
  TorrentUpdate = 'TORRENT_UPDATE',
}
