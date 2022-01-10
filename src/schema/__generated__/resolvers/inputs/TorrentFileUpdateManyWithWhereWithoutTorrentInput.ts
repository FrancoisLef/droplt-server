import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentFileScalarWhereInput } from "../inputs/TorrentFileScalarWhereInput";
import { TorrentFileUpdateManyMutationInput } from "../inputs/TorrentFileUpdateManyMutationInput";

@TypeGraphQL.InputType("TorrentFileUpdateManyWithWhereWithoutTorrentInput", {
  isAbstract: true
})
export class TorrentFileUpdateManyWithWhereWithoutTorrentInput {
  @TypeGraphQL.Field(_type => TorrentFileScalarWhereInput, {
    nullable: false
  })
  where!: TorrentFileScalarWhereInput;

  @TypeGraphQL.Field(_type => TorrentFileUpdateManyMutationInput, {
    nullable: false
  })
  data!: TorrentFileUpdateManyMutationInput;
}
