import * as TGql from 'type-graphql';

import { Dashboard } from '../models/Dashboard';
import transmission from '../services/transmission';

@TGql.Resolver(() => Dashboard)
export class DashboardResolver {
  @TGql.Query(() => Dashboard, {
    nullable: false,
  })
  async dashboard(): Promise<Dashboard> {
    const session = await transmission.getSession();
    const {
      arguments: { torrents },
    } = await transmission.listTorrents();
    const downloaded = torrents.reduce(
      (acc, { downloadedEver }) => acc + downloadedEver,
      0,
    );
    const uploaded = torrents.reduce(
      (acc, { uploadedEver }) => acc + uploadedEver,
      0,
    );
    const files = torrents.reduce((acc, { files }) => acc + files.length, 0);

    return {
      downloaded,
      uploaded,
      files,
      torrents: torrents.length,
      freeSpace: session.arguments['download-dir-free-space'],
      version: session.arguments.version,
    };
  }
}
