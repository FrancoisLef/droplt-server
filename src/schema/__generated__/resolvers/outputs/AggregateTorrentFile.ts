import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentFileAvgAggregate } from "../outputs/TorrentFileAvgAggregate";
import { TorrentFileCountAggregate } from "../outputs/TorrentFileCountAggregate";
import { TorrentFileMaxAggregate } from "../outputs/TorrentFileMaxAggregate";
import { TorrentFileMinAggregate } from "../outputs/TorrentFileMinAggregate";
import { TorrentFileSumAggregate } from "../outputs/TorrentFileSumAggregate";

@TypeGraphQL.ObjectType("AggregateTorrentFile", {
  isAbstract: true
})
export class AggregateTorrentFile {
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
