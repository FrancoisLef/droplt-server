import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentFileWhereUniqueInput } from "../../../inputs/TorrentFileWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindUniqueTorrentFileArgs {
  @TypeGraphQL.Field(_type => TorrentFileWhereUniqueInput, {
    nullable: false
  })
  where!: TorrentFileWhereUniqueInput;
}
