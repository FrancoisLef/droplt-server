import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentCreateInput } from "../../../inputs/TorrentCreateInput";

@TypeGraphQL.ArgsType()
export class CreateTorrentArgs {
  @TypeGraphQL.Field(_type => TorrentCreateInput, {
    nullable: false
  })
  data!: TorrentCreateInput;
}
