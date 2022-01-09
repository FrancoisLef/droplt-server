import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentFileAvgAggregate } from "../outputs/TorrentFileAvgAggregate";
import { TorrentFileCountAggregate } from "../outputs/TorrentFileCountAggregate";
import { TorrentFileMaxAggregate } from "../outputs/TorrentFileMaxAggregate";
import { TorrentFileMinAggregate } from "../outputs/TorrentFileMinAggregate";
import { TorrentFileSumAggregate } from "../outputs/TorrentFileSumAggregate";

@TypeGraphQL.ObjectType("TorrentFileGroupBy", {
  isAbstract: true
})
export class TorrentFileGroupBy {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  torrentFileId!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  torrentId!: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  size!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  downloaded!: number;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  @TypeGraphQL.Field(_type => TorrentFileCountAggregate, {
    nullable: true
  })
  _count!: TorrentFileCountAggregate | null;

  @TypeGraphQL.Field(_type => TorrentFileAvgAggregate, {
    nullable: true
  })
  _avg!: TorrentFileAvgAggregate | null;

  @TypeGraphQL.Field(_type => TorrentFileSumAggregate, {
    nullable: true
  })
  _sum!: TorrentFileSumAggregate | null;

  @TypeGraphQL.Field(_type => TorrentFileMinAggregate, {
    nullable: true
  })
  _min!: TorrentFileMinAggregate | null;

  @TypeGraphQL.Field(_type => TorrentFileMaxAggregate, {
    nullable: true
  })
  _max!: TorrentFileMaxAggregate | null;
}
