import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentFileCreateManyTorrentInput } from "../inputs/TorrentFileCreateManyTorrentInput";

@TypeGraphQL.InputType("TorrentFileCreateManyTorrentInputEnvelope", {
  isAbstract: true
})
export class TorrentFileCreateManyTorrentInputEnvelope {
  @TypeGraphQL.Field(_type => [TorrentFileCreateManyTorrentInput], {
    nullable: false
  })
  data!: TorrentFileCreateManyTorrentInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
