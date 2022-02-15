import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentFileOrderByWithRelationAndSearchRelevanceInput } from "../../../inputs/TorrentFileOrderByWithRelationAndSearchRelevanceInput";
import { TorrentFileWhereInput } from "../../../inputs/TorrentFileWhereInput";
import { TorrentFileWhereUniqueInput } from "../../../inputs/TorrentFileWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateTorrentFileArgs {
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
}
