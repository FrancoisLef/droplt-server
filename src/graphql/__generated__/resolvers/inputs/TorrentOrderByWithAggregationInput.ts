import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentAvgOrderByAggregateInput } from "../inputs/TorrentAvgOrderByAggregateInput";
import { TorrentCountOrderByAggregateInput } from "../inputs/TorrentCountOrderByAggregateInput";
import { TorrentMaxOrderByAggregateInput } from "../inputs/TorrentMaxOrderByAggregateInput";
import { TorrentMinOrderByAggregateInput } from "../inputs/TorrentMinOrderByAggregateInput";
import { TorrentSumOrderByAggregateInput } from "../inputs/TorrentSumOrderByAggregateInput";
import { SortOrder } from "../../enums/SortOrder";

@TypeGraphQL.InputType("TorrentOrderByWithAggregationInput", {
  isAbstract: true
})
export class TorrentOrderByWithAggregationInput {
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
  path?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  eta?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  progress?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  ratio?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  status?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  downloaded?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  uploaded?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  createdAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  updatedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  addedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => SortOrder, {
    nullable: true
  })
  completedAt?: "asc" | "desc" | undefined;

  @TypeGraphQL.Field(_type => TorrentCountOrderByAggregateInput, {
    nullable: true
  })
  _count?: TorrentCountOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TorrentAvgOrderByAggregateInput, {
    nullable: true
  })
  _avg?: TorrentAvgOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TorrentMaxOrderByAggregateInput, {
    nullable: true
  })
  _max?: TorrentMaxOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TorrentMinOrderByAggregateInput, {
    nullable: true
  })
  _min?: TorrentMinOrderByAggregateInput | undefined;

  @TypeGraphQL.Field(_type => TorrentSumOrderByAggregateInput, {
    nullable: true
  })
  _sum?: TorrentSumOrderByAggregateInput | undefined;
}
