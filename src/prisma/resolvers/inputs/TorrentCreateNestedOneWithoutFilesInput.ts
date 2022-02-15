import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentCreateOrConnectWithoutFilesInput } from "../inputs/TorrentCreateOrConnectWithoutFilesInput";
import { TorrentCreateWithoutFilesInput } from "../inputs/TorrentCreateWithoutFilesInput";
import { TorrentWhereUniqueInput } from "../inputs/TorrentWhereUniqueInput";

@TypeGraphQL.InputType("TorrentCreateNestedOneWithoutFilesInput", {
  isAbstract: true
})
export class TorrentCreateNestedOneWithoutFilesInput {
  @TypeGraphQL.Field(_type => TorrentCreateWithoutFilesInput, {
    nullable: true
  })
  create?: TorrentCreateWithoutFilesInput | undefined;

  @TypeGraphQL.Field(_type => TorrentCreateOrConnectWithoutFilesInput, {
    nullable: true
  })
  connectOrCreate?: TorrentCreateOrConnectWithoutFilesInput | undefined;

  @TypeGraphQL.Field(_type => TorrentWhereUniqueInput, {
    nullable: true
  })
  connect?: TorrentWhereUniqueInput | undefined;
}
