import { Query, Resolver } from 'type-graphql';

import transmission from '../services/transmission';
import { Dashboard } from './models/Dashboard';

@Resolver(() => Dashboard)
export class DashboardResolver {
  @Query(() => Dashboard, {
    nullable: false,
  })
  async dashboard(): Promise<Dashboard> {
    const session = await transmission.getSession();
    const torrents = await transmission.listTorrents();

    const downloaded = torrents.arguments.torrents.reduce((acc, torrent) => {
      return acc + torrent.downloadedEver;
    }, 0);

    const uploaded = torrents.arguments.torrents.reduce((acc, torrent) => {
      return acc + torrent.uploadedEver;
    }, 0);

    return {
      downloaded,
      uploaded,
      torrentCount: torrents.arguments.torrents.length,
      freeSpace: session.arguments['download-dir-free-space'],
      version: session.arguments.version,
    };
  }
}
