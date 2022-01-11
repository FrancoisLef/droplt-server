import { PubSub } from 'graphql-subscriptions';

export enum Topic {
  TorrentRealtimeUpdate = 'TORRENT_REALTIME_UPDATE',
}

export const pubSub = new PubSub();
