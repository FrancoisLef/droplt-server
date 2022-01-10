import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentWhereInput } from "../../../inputs/TorrentWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyTorrentArgs {
  @TypeGraphQL.Field(_type => TorrentWhereInput, {
    nullable: true
  })
  where?: TorrentWhereInput | undefined;
}
