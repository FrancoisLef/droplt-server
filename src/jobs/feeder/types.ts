import { FeedTorrent } from '../../services/transmission';

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
