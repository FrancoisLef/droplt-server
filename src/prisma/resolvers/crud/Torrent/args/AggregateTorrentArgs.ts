import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentOrderByWithRelationAndSearchRelevanceInput } from "../../../inputs/TorrentOrderByWithRelationAndSearchRelevanceInput";
import { TorrentWhereInput } from "../../../inputs/TorrentWhereInput";
import { TorrentWhereUniqueInput } from "../../../inputs/TorrentWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class AggregateTorrentArgs {
  @TypeGraphQL.Field(_type => TorrentWhereInput, {
    nullable: true
  })
  where?: TorrentWhereInput | undefined;

  @TypeGraphQL.Field(_type => [TorrentOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true
  })
  orderBy?: TorrentOrderByWithRelationAndSearchRelevanceInput[] | undefined;

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
}
