import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentFileUpdateWithoutTorrentInput } from "../inputs/TorrentFileUpdateWithoutTorrentInput";
import { TorrentFileWhereUniqueInput } from "../inputs/TorrentFileWhereUniqueInput";

@TypeGraphQL.InputType("TorrentFileUpdateWithWhereUniqueWithoutTorrentInput", {
  isAbstract: true
})
export class TorrentFileUpdateWithWhereUniqueWithoutTorrentInput {
  @TypeGraphQL.Field(_type => TorrentFileWhereUniqueInput, {
    nullable: false
  })
  where!: TorrentFileWhereUniqueInput;

  @TypeGraphQL.Field(_type => TorrentFileUpdateWithoutTorrentInput, {
    nullable: false
  })
  data!: TorrentFileUpdateWithoutTorrentInput;
}
