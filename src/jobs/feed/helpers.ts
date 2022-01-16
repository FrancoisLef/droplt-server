import { Torrent as TransmissionTorrent } from '@ctrl/transmission';
import { Torrent as PrismaTorrent } from '@prisma/client';
import { Torrent as TypeGraphQLTorrent } from 'src/schema/__generated__';

import { FeedTorrent, PrismaTorrentPayload, UpdatesFeed } from './types';

const statusMap = (status: number): string => {
  switch (status) {
    case 0:
      return 'PAUSED';
    case 1:
    case 3:
    case 5:
      return 'QUEUED';
    case 2:
      return 'CHECKING';
    case 4:
      return 'DOWNLOADING';
    case 6:
      return 'PAUSED';
    default:
      return 'UNKNWON';
  }
};

export const normalize = (torrent: TransmissionTorrent): FeedTorrent => {
  const addedAt = new Date(torrent.addedDate * 1000);
  const completedAt = torrent.doneDate
    ? new Date(torrent.doneDate * 1000)
    : null;

  const result: FeedTorrent = {
    hash: torrent.hashString,
    transmissionId: torrent.id,
    name: torrent.name,
    size: torrent.totalSize,
    path: torrent.downloadDir,
    progress: torrent.percentDone,
    ratio: torrent.uploadRatio,
    status: statusMap(torrent.status),
    eta: torrent.eta,
    peers: torrent.peersSendingToUs,
    seeds: torrent.peersGettingFromUs,
    download: torrent.rateDownload,
    upload: torrent.rateUpload,
    downloaded: torrent.downloadedEver,
    uploaded: torrent.uploadedEver,
    addedAt,
    completedAt,
  };
  return result;
};

export const sanitize = (torrent: FeedTorrent): PrismaTorrentPayload => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { eta, download, upload, seeds, peers, ...sanitized } = torrent;
  return sanitized;
};

export const sanitizePartial = (
  torrent: Partial<FeedTorrent>
): Partial<PrismaTorrentPayload> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { eta, download, upload, seeds, peers, ...sanitized } = torrent;
  return sanitized;
};

export const updatesEventPayload = (
  torrents: PrismaTorrent[],
  feed: UpdatesFeed
): TypeGraphQLTorrent[] => {
  return torrents.map((torrent) => {
    const feedPayload = feed[torrent.hash] || {};
    return {
      ...torrent,
      ...feedPayload,
    };
  });
};
