import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentFileOrderByWithAggregationInput } from "../../../inputs/TorrentFileOrderByWithAggregationInput";
import { TorrentFileScalarWhereWithAggregatesInput } from "../../../inputs/TorrentFileScalarWhereWithAggregatesInput";
import { TorrentFileWhereInput } from "../../../inputs/TorrentFileWhereInput";
import { TorrentFileScalarFieldEnum } from "../../../../enums/TorrentFileScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class GroupByTorrentFileArgs {
  @TypeGraphQL.Field(_type => TorrentFileWhereInput, {
    nullable: true
  })
  where?: TorrentFileWhereInput | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileOrderByWithAggregationInput], {
    nullable: true
  })
  orderBy?: TorrentFileOrderByWithAggregationInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileScalarFieldEnum], {
    nullable: false
  })
  by!: Array<"torrentFileId" | "torrentId" | "name" | "size" | "downloaded" | "createdAt" | "updatedAt">;

  @TypeGraphQL.Field(_type => TorrentFileScalarWhereWithAggregatesInput, {
    nullable: true
  })
  having?: TorrentFileScalarWhereWithAggregatesInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;
}
