import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentFileCreateWithoutTorrentInput } from "../inputs/TorrentFileCreateWithoutTorrentInput";
import { TorrentFileUpdateWithoutTorrentInput } from "../inputs/TorrentFileUpdateWithoutTorrentInput";
import { TorrentFileWhereUniqueInput } from "../inputs/TorrentFileWhereUniqueInput";

@TypeGraphQL.InputType("TorrentFileUpsertWithWhereUniqueWithoutTorrentInput", {
  isAbstract: true
})
export class TorrentFileUpsertWithWhereUniqueWithoutTorrentInput {
  @TypeGraphQL.Field(_type => TorrentFileWhereUniqueInput, {
    nullable: false
  })
  where!: TorrentFileWhereUniqueInput;

  @TypeGraphQL.Field(_type => TorrentFileUpdateWithoutTorrentInput, {
    nullable: false
  })
  update!: TorrentFileUpdateWithoutTorrentInput;

  @TypeGraphQL.Field(_type => TorrentFileCreateWithoutTorrentInput, {
    nullable: false
  })
  create!: TorrentFileCreateWithoutTorrentInput;
}
