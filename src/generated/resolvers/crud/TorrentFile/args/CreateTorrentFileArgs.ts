import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentFileCreateInput } from "../../../inputs/TorrentFileCreateInput";

@TypeGraphQL.ArgsType()
export class CreateTorrentFileArgs {
  @TypeGraphQL.Field(_type => TorrentFileCreateInput, {
    nullable: false
  })
  data!: TorrentFileCreateInput;
}
