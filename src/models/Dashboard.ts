import * as TGql from 'type-graphql';

@TGql.ObjectType('Dashboard', {
  isAbstract: true,
})
export class Dashboard {
  @TGql.Field(() => TGql.Float, {
    nullable: false,
  })
  freeSpace!: number;

  @TGql.Field(() => TGql.Float, {
    nullable: false,
  })
  torrents!: number;

  @TGql.Field(() => TGql.Float, {
    nullable: false,
  })
  files!: number;

  @TGql.Field(() => String, {
    nullable: false,
  })
  version!: string;

  @TGql.Field(() => TGql.Float, {
    nullable: false,
  })
  uploaded!: number;

  @TGql.Field(() => TGql.Float, {
    nullable: false,
  })
  downloaded!: number;
}
