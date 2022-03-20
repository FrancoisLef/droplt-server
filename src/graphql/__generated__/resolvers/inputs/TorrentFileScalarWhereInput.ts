import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { FloatFilter } from "../inputs/FloatFilter";
import { StringFilter } from "../inputs/StringFilter";
import { StringNullableFilter } from "../inputs/StringNullableFilter";

@TypeGraphQL.InputType("TorrentFileScalarWhereInput", {
  isAbstract: true
})
export class TorrentFileScalarWhereInput {
  @TypeGraphQL.Field(_type => [TorrentFileScalarWhereInput], {
    nullable: true
  })
  AND?: TorrentFileScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileScalarWhereInput], {
    nullable: true
  })
  OR?: TorrentFileScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileScalarWhereInput], {
    nullable: true
  })
  NOT?: TorrentFileScalarWhereInput[] | undefined;

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

  @TypeGraphQL.Field(_type => FloatFilter, {
    nullable: true
  })
  size?: FloatFilter | undefined;

  @TypeGraphQL.Field(_type => FloatFilter, {
    nullable: true
  })
  downloaded?: FloatFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true
  })
  updatedAt?: DateTimeFilter | undefined;
}
