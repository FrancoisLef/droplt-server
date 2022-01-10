import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentUpdateInput } from "../../../inputs/TorrentUpdateInput";
import { TorrentWhereUniqueInput } from "../../../inputs/TorrentWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateTorrentArgs {
  @TypeGraphQL.Field(_type => TorrentUpdateInput, {
    nullable: false
  })
  data!: TorrentUpdateInput;

  @TypeGraphQL.Field(_type => TorrentWhereUniqueInput, {
    nullable: false
  })
  where!: TorrentWhereUniqueInput;
}
