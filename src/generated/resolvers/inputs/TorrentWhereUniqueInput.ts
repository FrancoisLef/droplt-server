import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("TorrentWhereUniqueInput", {
  isAbstract: true
})
export class TorrentWhereUniqueInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  torrentId?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  hash?: string | undefined;
}
