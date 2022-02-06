import * as TypeGraphQL from 'type-graphql';

@TypeGraphQL.ObjectType('TorrentRealtime')
export class TorrentRealtime {
  @TypeGraphQL.Field(() => Number, {
    nullable: true,
  })
  eta?: number;

  @TypeGraphQL.Field(() => Number, {
    nullable: true,
  })
  downloadSpeed?: number;

  @TypeGraphQL.Field(() => Number, {
    nullable: true,
  })
  uploadSpeed?: number;

  @TypeGraphQL.Field(() => Number, {
    nullable: true,
  })
  leechers?: number;

  @TypeGraphQL.Field(() => Number, {
    nullable: true,
  })
  seeders?: number;
}
