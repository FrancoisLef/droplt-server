import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { TorrentUpdateManyMutationInput } from "../../../inputs/TorrentUpdateManyMutationInput";
import { TorrentWhereInput } from "../../../inputs/TorrentWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyTorrentArgs {
  @TypeGraphQL.Field(_type => TorrentUpdateManyMutationInput, {
    nullable: false
  })
  data!: TorrentUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => TorrentWhereInput, {
    nullable: true
  })
  where?: TorrentWhereInput | undefined;
}
