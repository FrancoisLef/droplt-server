import {
  NormalizedTorrent as CtrlNormalizedTorrent,
  TorrentState,
} from '@ctrl/shared-torrent';
import { Torrent } from '@ctrl/transmission';

export interface NormalizedTorrent extends CtrlNormalizedTorrent {
  hash: string;
}

const getState = (status: number): TorrentState => {
  let state = 'unknown';
  if (status === 6) {
    state = 'seeding';
  } else if (status === 4) {
    state = 'downloading';
  } else if (status === 0) {
    state = 'paused';
  } else if (status === 2) {
    state = 'checking';
  } else if (status === 3 || status === 5) {
    state = 'queued';
  }

  return state as TorrentState;
};

export const normalizeTransmissionTorrent = (
  torrent: Torrent
): NormalizedTorrent => {
  const dateAdded = new Date(torrent.addedDate * 1000).toISOString();
  const dateCompleted = new Date(torrent.doneDate * 1000).toISOString();

  const result: NormalizedTorrent = {
    id: torrent.id,
    name: torrent.name,
    hash: torrent.hashString,
    state: getState(torrent.status),
    isCompleted: torrent.leftUntilDone < 1,
    stateMessage: '',
    progress: torrent.percentDone,
    ratio: torrent.uploadRatio,
    dateAdded,
    dateCompleted,
    label: torrent.labels?.length ? torrent.labels[0] : undefined,
    savePath: torrent.downloadDir,
    uploadSpeed: torrent.rateUpload,
    downloadSpeed: torrent.rateDownload,
    eta: torrent.eta,
    queuePosition: torrent.queuePosition,
    connectedPeers: torrent.peersSendingToUs,
    connectedSeeds: torrent.peersGettingFromUs,
    totalPeers: torrent.peersConnected,
    totalSeeds: torrent.peersConnected,
    totalSelected: torrent.sizeWhenDone,
    totalSize: torrent.totalSize,
    totalUploaded: torrent.uploadedEver,
    totalDownloaded: torrent.downloadedEver,
  };
  return result;
};
