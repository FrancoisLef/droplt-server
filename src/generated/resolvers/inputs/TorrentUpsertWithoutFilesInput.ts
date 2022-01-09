import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentCreateWithoutFilesInput } from "../inputs/TorrentCreateWithoutFilesInput";
import { TorrentUpdateWithoutFilesInput } from "../inputs/TorrentUpdateWithoutFilesInput";

@TypeGraphQL.InputType("TorrentUpsertWithoutFilesInput", {
  isAbstract: true
})
export class TorrentUpsertWithoutFilesInput {
  @TypeGraphQL.Field(_type => TorrentUpdateWithoutFilesInput, {
    nullable: false
  })
  update!: TorrentUpdateWithoutFilesInput;

  @TypeGraphQL.Field(_type => TorrentCreateWithoutFilesInput, {
    nullable: false
  })
  create!: TorrentCreateWithoutFilesInput;
}
