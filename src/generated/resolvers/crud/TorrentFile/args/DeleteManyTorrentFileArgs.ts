import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentFileWhereInput } from "../../../inputs/TorrentFileWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyTorrentFileArgs {
  @TypeGraphQL.Field(_type => TorrentFileWhereInput, {
    nullable: true
  })
  where?: TorrentFileWhereInput | undefined;
}
