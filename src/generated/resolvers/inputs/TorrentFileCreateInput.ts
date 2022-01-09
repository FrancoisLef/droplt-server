import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentCreateNestedOneWithoutFilesInput } from "../inputs/TorrentCreateNestedOneWithoutFilesInput";

@TypeGraphQL.InputType("TorrentFileCreateInput", {
  isAbstract: true
})
export class TorrentFileCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  torrentFileId?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  size!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  downloaded?: number | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => TorrentCreateNestedOneWithoutFilesInput, {
    nullable: true
  })
  Torrent?: TorrentCreateNestedOneWithoutFilesInput | undefined;
}
