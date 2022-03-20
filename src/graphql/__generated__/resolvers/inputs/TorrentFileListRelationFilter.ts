import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentFileWhereInput } from "../inputs/TorrentFileWhereInput";

@TypeGraphQL.InputType("TorrentFileListRelationFilter", {
  isAbstract: true
})
export class TorrentFileListRelationFilter {
  @TypeGraphQL.Field(_type => TorrentFileWhereInput, {
    nullable: true
  })
  every?: TorrentFileWhereInput | undefined;

  @TypeGraphQL.Field(_type => TorrentFileWhereInput, {
    nullable: true
  })
  some?: TorrentFileWhereInput | undefined;

  @TypeGraphQL.Field(_type => TorrentFileWhereInput, {
    nullable: true
  })
  none?: TorrentFileWhereInput | undefined;
}
