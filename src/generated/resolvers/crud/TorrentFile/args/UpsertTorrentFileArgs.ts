import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentFileCreateInput } from "../../../inputs/TorrentFileCreateInput";
import { TorrentFileUpdateInput } from "../../../inputs/TorrentFileUpdateInput";
import { TorrentFileWhereUniqueInput } from "../../../inputs/TorrentFileWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertTorrentFileArgs {
  @TypeGraphQL.Field(_type => TorrentFileWhereUniqueInput, {
    nullable: false
  })
  where!: TorrentFileWhereUniqueInput;

  @TypeGraphQL.Field(_type => TorrentFileCreateInput, {
    nullable: false
  })
  create!: TorrentFileCreateInput;

  @TypeGraphQL.Field(_type => TorrentFileUpdateInput, {
    nullable: false
  })
  update!: TorrentFileUpdateInput;
}
