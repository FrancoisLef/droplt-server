import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentFileCreateManyInput } from "../../../inputs/TorrentFileCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyTorrentFileArgs {
  @TypeGraphQL.Field(_type => [TorrentFileCreateManyInput], {
    nullable: false
  })
  data!: TorrentFileCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
