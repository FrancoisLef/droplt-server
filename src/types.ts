import { PrismaClient } from '@prisma/client';
import { Torrent } from '@prisma/client';
import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export interface Context {
  prisma: PrismaClient;
  user: DecodedIdToken;
  req: Request;
}

export type PrismaTorrentPayload = Omit<Torrent, 'createdAt' | 'updatedAt'>;

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
