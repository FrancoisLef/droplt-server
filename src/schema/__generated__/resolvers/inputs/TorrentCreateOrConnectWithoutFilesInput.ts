import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentCreateWithoutFilesInput } from "../inputs/TorrentCreateWithoutFilesInput";
import { TorrentWhereUniqueInput } from "../inputs/TorrentWhereUniqueInput";

@TypeGraphQL.InputType("TorrentCreateOrConnectWithoutFilesInput", {
  isAbstract: true
})
export class TorrentCreateOrConnectWithoutFilesInput {
  @TypeGraphQL.Field(_type => TorrentWhereUniqueInput, {
    nullable: false
  })
  where!: TorrentWhereUniqueInput;

  @TypeGraphQL.Field(_type => TorrentCreateWithoutFilesInput, {
    nullable: false
  })
  create!: TorrentCreateWithoutFilesInput;
}
