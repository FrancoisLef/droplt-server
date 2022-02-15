import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentFileUpdateManyMutationInput } from "../../../inputs/TorrentFileUpdateManyMutationInput";
import { TorrentFileWhereInput } from "../../../inputs/TorrentFileWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyTorrentFileArgs {
  @TypeGraphQL.Field(_type => TorrentFileUpdateManyMutationInput, {
    nullable: false
  })
  data!: TorrentFileUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => TorrentFileWhereInput, {
    nullable: true
  })
  where?: TorrentFileWhereInput | undefined;
}
