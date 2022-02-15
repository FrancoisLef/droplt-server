import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { SortOrder } from "../../enums/SortOrder";
import { TorrentOrderByRelevanceFieldEnum } from "../../enums/TorrentOrderByRelevanceFieldEnum";

@TypeGraphQL.InputType("TorrentOrderByRelevanceInput", {
  isAbstract: true
})
export class TorrentOrderByRelevanceInput {
  @TypeGraphQL.Field(_type => [TorrentOrderByRelevanceFieldEnum], {
    nullable: false
  })
  fields!: Array<"torrentId" | "name" | "path" | "status">;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: false
  })
  sort!: "asc" | "desc";

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  search!: string;
}
