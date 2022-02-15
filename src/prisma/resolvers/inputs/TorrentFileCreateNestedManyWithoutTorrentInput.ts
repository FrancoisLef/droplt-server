import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentFileCreateManyTorrentInputEnvelope } from "../inputs/TorrentFileCreateManyTorrentInputEnvelope";
import { TorrentFileCreateOrConnectWithoutTorrentInput } from "../inputs/TorrentFileCreateOrConnectWithoutTorrentInput";
import { TorrentFileCreateWithoutTorrentInput } from "../inputs/TorrentFileCreateWithoutTorrentInput";
import { TorrentFileWhereUniqueInput } from "../inputs/TorrentFileWhereUniqueInput";

@TypeGraphQL.InputType("TorrentFileCreateNestedManyWithoutTorrentInput", {
  isAbstract: true
})
export class TorrentFileCreateNestedManyWithoutTorrentInput {
  @TypeGraphQL.Field(_type => [TorrentFileCreateWithoutTorrentInput], {
    nullable: true
  })
  create?: TorrentFileCreateWithoutTorrentInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileCreateOrConnectWithoutTorrentInput], {
    nullable: true
  })
  connectOrCreate?: TorrentFileCreateOrConnectWithoutTorrentInput[] | undefined;

  @TypeGraphQL.Field(_type => TorrentFileCreateManyTorrentInputEnvelope, {
    nullable: true
  })
  createMany?: TorrentFileCreateManyTorrentInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileWhereUniqueInput], {
    nullable: true
  })
  connect?: TorrentFileWhereUniqueInput[] | undefined;
}
