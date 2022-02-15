import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentFileOrderByRelevanceInput } from "../inputs/TorrentFileOrderByRelevanceInput";
import { TorrentOrderByWithRelationAndSearchRelevanceInput } from "../inputs/TorrentOrderByWithRelationAndSearchRelevanceInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("TorrentFileOrderByWithRelationAndSearchRelevanceInput", {
  isAbstract: true
})
export class TorrentFileOrderByWithRelationAndSearchRelevanceInput {
  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  torrentFileId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  torrentId?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  name?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  size?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  downloaded?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => TorrentOrderByWithRelationAndSearchRelevanceInput, {
    nullable: true
  })
  Torrent?: TorrentOrderByWithRelationAndSearchRelevanceInput | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  updatedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => TorrentFileOrderByRelevanceInput, {
    nullable: true
  })
  _relevance?: TorrentFileOrderByRelevanceInput | undefined;
}
