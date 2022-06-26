import * as TGql from 'type-graphql';

import { TorrentFile } from './TorrentFile.js';

@TGql.ObjectType('Torrent', {
  isAbstract: true,
})
export class Torrent {
  @TGql.Field(() => String, {
    nullable: false,
  })
  torrentId!: string;

  @TGql.Field(() => String, {
    nullable: false,
  })
  name!: string;

  @TGql.Field(() => TGql.Float, {
    nullable: false,
  })
  size!: number;

  @TGql.Field(() => String, {
    nullable: false,
  })
  path!: string;

  @TGql.Field(() => TGql.Float, {
    nullable: true,
  })
  eta?: number | null;

  files?: TorrentFile[];

  @TGql.Field(() => TGql.Float, {
    nullable: false,
  })
  progress!: number;

  @TGql.Field(() => TGql.Float, {
    nullable: false,
  })
  ratio!: number;

  @TGql.Field(() => String, {
    nullable: false,
  })
  status!: string;

  @TGql.Field(() => TGql.Float, {
    nullable: false,
  })
  downloaded!: number;

  @TGql.Field(() => TGql.Float, {
    nullable: false,
  })
  uploaded!: number;

  @TGql.Field(() => Date, {
    nullable: false,
  })
  createdAt!: Date;

  @TGql.Field(() => Date, {
    nullable: false,
  })
  updatedAt!: Date;

  @TGql.Field(() => Date, {
    nullable: false,
  })
  addedAt!: Date;

  @TGql.Field(() => Date, {
    nullable: true,
  })
  completedAt?: Date | null;
}
