import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";

@TypeGraphQL.InputType("TorrentCreateWithoutFilesInput", {
  isAbstract: true
})
export class TorrentCreateWithoutFilesInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  torrentId?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  hash!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  transmissionId!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false
  })
  size!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  path!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  progress?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: true
  })
  ratio?: number | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  status!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  downloaded?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true
  })
  uploaded?: number | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  addedAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  completedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;
}
