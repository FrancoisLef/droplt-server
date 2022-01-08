import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentAvgAggregate } from "../outputs/TorrentAvgAggregate";
import { TorrentCountAggregate } from "../outputs/TorrentCountAggregate";
import { TorrentMaxAggregate } from "../outputs/TorrentMaxAggregate";
import { TorrentMinAggregate } from "../outputs/TorrentMinAggregate";
import { TorrentSumAggregate } from "../outputs/TorrentSumAggregate";

@TypeGraphQL.ObjectType("TorrentGroupBy", {
  isAbstract: true
})
export class TorrentGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  torrentId!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  hash!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  progress!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  status!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  totalSize!: number;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  @TypeGraphQL.Field(_type => TorrentCountAggregate, {
    nullable: true
  })
  _count!: TorrentCountAggregate | null;

  @TypeGraphQL.Field(_type => TorrentAvgAggregate, {
    nullable: true
  })
  _avg!: TorrentAvgAggregate | null;

  @TypeGraphQL.Field(_type => TorrentSumAggregate, {
    nullable: true
  })
  _sum!: TorrentSumAggregate | null;

  @TypeGraphQL.Field(_type => TorrentMinAggregate, {
    nullable: true
  })
  _min!: TorrentMinAggregate | null;

  @TypeGraphQL.Field(_type => TorrentMaxAggregate, {
    nullable: true
  })
  _max!: TorrentMaxAggregate | null;
}
