import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentWhereInput } from "../inputs/TorrentWhereInput";

@TypeGraphQL.InputType("TorrentRelationFilter", {
  isAbstract: true
})
export class TorrentRelationFilter {
  @TypeGraphQL.Field(_type => TorrentWhereInput, {
    nullable: true
  })
  is?: TorrentWhereInput | undefined;

  @TypeGraphQL.Field(_type => TorrentWhereInput, {
    nullable: true
  })
  isNot?: TorrentWhereInput | undefined;
}
