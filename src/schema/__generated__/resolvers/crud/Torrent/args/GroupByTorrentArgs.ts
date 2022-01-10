import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentOrderByWithAggregationInput } from "../../../inputs/TorrentOrderByWithAggregationInput";
import { TorrentScalarWhereWithAggregatesInput } from "../../../inputs/TorrentScalarWhereWithAggregatesInput";
import { TorrentWhereInput } from "../../../inputs/TorrentWhereInput";
import { TorrentScalarFieldEnum } from "../../../../enums/TorrentScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByTorrentArgs {
  @TypeGraphQL.Field(_type => TorrentWhereInput, {
    nullable: true
  })
  where?: TorrentWhereInput | undefined;

  @TypeGraphQL.Field(_type => [TorrentOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: TorrentOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"torrentId" | "hash" | "transmissionId" | "name" | "size" | "path" | "progress" | "ratio" | "status" | "downloaded" | "uploaded" | "addedAt" | "completedAt" | "createdAt" | "updatedAt">;

  @TypeGraphQL.Field(_type => TorrentScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: TorrentScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
