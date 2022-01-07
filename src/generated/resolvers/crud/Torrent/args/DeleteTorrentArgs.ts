import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentWhereUniqueInput } from "../../../inputs/TorrentWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteTorrentArgs {
  @TypeGraphQL.Field(_type => TorrentWhereUniqueInput, {
    nullable: false
  })
  where!: TorrentWhereUniqueInput;
}
