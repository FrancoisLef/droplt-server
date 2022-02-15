import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { SortOrder } from "../../enums/SortOrder";
import { TorrentFileOrderByRelevanceFieldEnum } from "../../enums/TorrentFileOrderByRelevanceFieldEnum";

@TypeGraphQL.InputType("TorrentFileOrderByRelevanceInput", {
  isAbstract: true
})
export class TorrentFileOrderByRelevanceInput {
  @TypeGraphQL.Field(_type => [TorrentFileOrderByRelevanceFieldEnum], {
    nullable: false
  })
  fields!: Array<"torrentFileId" | "torrentId" | "name">;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: false
  })
  sort!: "asc" | "desc";

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  search!: string;
}
