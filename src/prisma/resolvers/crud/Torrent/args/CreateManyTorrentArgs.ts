import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentCreateManyInput } from "../../../inputs/TorrentCreateManyInput";

@TypeGraphQL.ArgsType()
export class CreateManyTorrentArgs {
  @TypeGraphQL.Field(_type => [TorrentCreateManyInput], {
    nullable: false
  })
  data!: TorrentCreateManyInput[];

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  skipDuplicates?: boolean | undefined;
}
