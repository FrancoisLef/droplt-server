import * as TypeGraphQL from 'type-graphql';

@TypeGraphQL.ObjectType()
export class TorrentStats {
  @TypeGraphQL.Field(() => Number, {
    nullable: true,
  })
  downloadSpeed?: number | null;

  @TypeGraphQL.Field(() => Number, {
    nullable: true,
  })
  uploadSpeed?: number | null;

  @TypeGraphQL.Field(() => Number, {
    nullable: true,
  })
  peers?: number | null;

  @TypeGraphQL.Field(() => Number, {
    nullable: true,
  })
  seeds?: number | null;

  @TypeGraphQL.Field(() => Number, {
    nullable: true,
  })
  eta?: number | null;
}
