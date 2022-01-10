import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentCreateInput } from "../../../inputs/TorrentCreateInput";
import { TorrentUpdateInput } from "../../../inputs/TorrentUpdateInput";
import { TorrentWhereUniqueInput } from "../../../inputs/TorrentWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertTorrentArgs {
  @TypeGraphQL.Field(_type => TorrentWhereUniqueInput, {
    nullable: false
  })
  where!: TorrentWhereUniqueInput;

  @TypeGraphQL.Field(_type => TorrentCreateInput, {
    nullable: false
  })
  create!: TorrentCreateInput;

  @TypeGraphQL.Field(_type => TorrentUpdateInput, {
    nullable: false
  })
  update!: TorrentUpdateInput;
}
