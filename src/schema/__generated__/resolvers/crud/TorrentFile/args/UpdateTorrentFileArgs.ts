import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentFileUpdateInput } from "../../../inputs/TorrentFileUpdateInput";
import { TorrentFileWhereUniqueInput } from "../../../inputs/TorrentFileWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateTorrentFileArgs {
  @TypeGraphQL.Field(_type => TorrentFileUpdateInput, {
    nullable: false
  })
  data!: TorrentFileUpdateInput;

  @TypeGraphQL.Field(_type => TorrentFileWhereUniqueInput, {
    nullable: false
  })
  where!: TorrentFileWhereUniqueInput;
}
