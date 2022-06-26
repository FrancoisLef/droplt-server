import * as TGql from 'type-graphql';

import { Torrent } from '../models/Torrent';

@TGql.ObjectType('TorrentFile', {
  isAbstract: true,
})
export class TorrentFile {
  @TGql.Field(() => String, {
    nullable: false,
  })
  torrentFileId!: string;

  @TGql.Field(() => String, {
    nullable: true,
  })
  torrentId?: string | null;

  @TGql.Field(() => String, {
    nullable: false,
  })
  name!: string;

  @TGql.Field(() => TGql.Float, {
    nullable: false,
  })
  size!: number;

  @TGql.Field(() => TGql.Float, {
    nullable: false,
  })
  downloaded!: number;

  Torrent?: Torrent | null;

  @TGql.Field(() => Date, {
    nullable: false,
  })
  createdAt!: Date;

  @TGql.Field(() => Date, {
    nullable: false,
  })
  updatedAt!: Date;
}
