import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentFileOrderByWithRelationAndSearchRelevanceInput } from "../../../inputs/TorrentFileOrderByWithRelationAndSearchRelevanceInput";
import { TorrentFileWhereInput } from "../../../inputs/TorrentFileWhereInput";
import { TorrentFileWhereUniqueInput } from "../../../inputs/TorrentFileWhereUniqueInput";
import { TorrentFileScalarFieldEnum } from "../../../../enums/TorrentFileScalarFieldEnum";

@TypeGraphQL.ArgsType()
export class TorrentFilesArgs {
  @TypeGraphQL.Field(_type => TorrentFileWhereInput, {
    nullable: true
  })
  where?: TorrentFileWhereInput | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: TorrentFileOrderByWithRelationAndSearchRelevanceInput[] | undefined;

  @TypeGraphQL.Field(_type => TorrentFileWhereUniqueInput, {
    nullable: true
  })
  cursor?: TorrentFileWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileScalarFieldEnum], {
    nullable: true
  })
  distinct?: Array<"torrentFileId" | "torrentId" | "name" | "size" | "downloaded" | "createdAt" | "updatedAt"> | undefined;
}
