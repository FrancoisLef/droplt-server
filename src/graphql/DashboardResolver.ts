import * as TGQL from 'type-graphql';

import transmission from '../services/transmission';
import { Dashboard } from './models/Dashboard';

@TGQL.Resolver(() => Dashboard)
export class DashboardResolver {
  @TGQL.Query(() => Dashboard, {
    nullable: false,
  })
  async dashboard(): Promise<Dashboard> {
    const session = await transmission.getSession();
    const torrents = await transmission.listTorrents();

    return {
      torrentCount: torrents.arguments.torrents.length,
      freeSpace: session.arguments['download-dir-free-space'],
      version: session.arguments.version,
    };
  }
}
