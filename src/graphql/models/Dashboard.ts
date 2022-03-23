import * as TGQL from 'type-graphql';

@TGQL.ObjectType('Dashboard', {
  isAbstract: true,
})
export class Dashboard {
  @TGQL.Field(() => TGQL.Float, {
    nullable: false,
  })
  freeSpace!: number;

  @TGQL.Field(() => TGQL.Float, {
    nullable: false,
  })
  torrents!: number;

  @TGQL.Field(() => TGQL.Float, {
    nullable: false,
  })
  files!: number;

  @TGQL.Field(() => String, {
    nullable: false,
  })
  version!: string;

  @TGQL.Field(() => TGQL.Float, {
    nullable: false,
  })
  uploaded!: number;

  @TGQL.Field(() => TGQL.Float, {
    nullable: false,
  })
  downloaded!: number;
}
