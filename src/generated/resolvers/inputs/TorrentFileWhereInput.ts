import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { IntFilter } from "../inputs/IntFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";
import { TorrentRelationFilter } from "../inputs/TorrentRelationFilter";

@TypeGraphQL.InputType("TorrentFileWhereInput", {
  isAbstract: true
})
export class TorrentFileWhereInput {
  @TypeGraphQL.Field(_type => [TorrentFileWhereInput], {
    nullable: true
  })
  AND?: TorrentFileWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileWhereInput], {
    nullable: true
  })
  OR?: TorrentFileWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileWhereInput], {
    nullable: true
  })
  NOT?: TorrentFileWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  torrentFileId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => StringNullableFilter, {
    nullable: true
  })
  torrentId?: StringNullableFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true
  })
  name?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  size?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => IntFilter, {
    nullable: true
  })
  downloaded?: IntFilter | undefined;

  @TypeGraphQL.Field(_type => TorrentRelationFilter, {
    nullable: true
  })
  Torrent?: TorrentRelationFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  updatedAt?: DateTimeFilter | undefined;
}
