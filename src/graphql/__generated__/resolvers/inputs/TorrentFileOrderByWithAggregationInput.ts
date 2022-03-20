import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentFileAvgOrderByAggregateInput } from "../inputs/TorrentFileAvgOrderByAggregateInput";
import { TorrentFileCountOrderByAggregateInput } from "../inputs/TorrentFileCountOrderByAggregateInput";
import { TorrentFileMaxOrderByAggregateInput } from "../inputs/TorrentFileMaxOrderByAggregateInput";
import { TorrentFileMinOrderByAggregateInput } from "../inputs/TorrentFileMinOrderByAggregateInput";
import { TorrentFileSumOrderByAggregateInput } from "../inputs/TorrentFileSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("TorrentFileOrderByWithAggregationInput", {
  isAbstract: true
})
export class TorrentFileOrderByWithAggregationInput {
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

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  updatedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => TorrentFileCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: TorrentFileCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TorrentFileAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: TorrentFileAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TorrentFileMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: TorrentFileMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TorrentFileMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: TorrentFileMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TorrentFileSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: TorrentFileSumOrderByAggregateInput | undefined;
}
