import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentOrderByWithRelationInput } from "../../../inputs/TorrentOrderByWithRelationInput";
import { TorrentWhereInput } from "../../../inputs/TorrentWhereInput";
import { TorrentWhereUniqueInput } from "../../../inputs/TorrentWhereUniqueInput";
import { TorrentScalarFieldEnum } from "../../../../enums/TorrentScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyTorrentArgs {
  @TypeGraphQL.Field(_type => TorrentWhereInput, {
    nullable: true
  })
  where?: TorrentWhereInput | undefined;

  @TypeGraphQL.Field(_type => [TorrentOrderByWithRelationInput], {
    nullable: true
  })
  orderBy?: TorrentOrderByWithRelationInput[] | undefined;

  @TypeGraphQL.Field(_type => TorrentWhereUniqueInput, {
    nullable: true
  })
  cursor?: TorrentWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [TorrentScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"torrentId" | "hash" | "transmissionId" | "name" | "size" | "path" | "eta" | "progress" | "ratio" | "status" | "downloaded" | "uploaded" | "isDeleted" | "createdAt" | "updatedAt" | "addedAt" | "completedAt" | "deletedAt"> | undefined;
}
