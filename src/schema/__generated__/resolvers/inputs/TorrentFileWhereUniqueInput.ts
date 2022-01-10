import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("TorrentFileWhereUniqueInput", {
  isAbstract: true
})
export class TorrentFileWhereUniqueInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  torrentFileId?: string | undefined;
}
