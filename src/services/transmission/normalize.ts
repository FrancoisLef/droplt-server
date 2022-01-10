import { Torrent as TransmissionTorrent } from '@ctrl/transmission';

import { FeedTorrent } from './types';

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

const normalize = (torrent: TransmissionTorrent): FeedTorrent => {
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
    downloaded: torrent.downloadedEver,
    uploaded: torrent.uploadedEver,
    addedAt,
    completedAt,
  };
  return result;
};

export default normalize;
