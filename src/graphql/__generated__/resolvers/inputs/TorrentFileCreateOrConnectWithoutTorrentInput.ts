import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentFileCreateWithoutTorrentInput } from "../inputs/TorrentFileCreateWithoutTorrentInput";
import { TorrentFileWhereUniqueInput } from "../inputs/TorrentFileWhereUniqueInput";

@TypeGraphQL.InputType("TorrentFileCreateOrConnectWithoutTorrentInput", {
  isAbstract: true
})
export class TorrentFileCreateOrConnectWithoutTorrentInput {
  @TypeGraphQL.Field(_type => TorrentFileWhereUniqueInput, {
    nullable: false
  })
  where!: TorrentFileWhereUniqueInput;

  @TypeGraphQL.Field(_type => TorrentFileCreateWithoutTorrentInput, {
    nullable: false
  })
  create!: TorrentFileCreateWithoutTorrentInput;
}
