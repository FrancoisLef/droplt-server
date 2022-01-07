import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentCountAggregate } from "../outputs/TorrentCountAggregate";
import { TorrentMaxAggregate } from "../outputs/TorrentMaxAggregate";
import { TorrentMinAggregate } from "../outputs/TorrentMinAggregate";

@TypeGraphQL.ObjectType("AggregateTorrent", {
  isAbstract: true
})
export class AggregateTorrent {
  @TypeGraphQL.Field(_type => TorrentCountAggregate, {
    nullable: true
  })
  _count!: TorrentCountAggregate | null;

  @TypeGraphQL.Field(_type => TorrentMinAggregate, {
    nullable: true
  })
  _min!: TorrentMinAggregate | null;

  @TypeGraphQL.Field(_type => TorrentMaxAggregate, {
    nullable: true
  })
  _max!: TorrentMaxAggregate | null;
}
