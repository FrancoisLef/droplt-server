import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { TorrentFile } from "../models/TorrentFile";
import { TorrentCount } from "../resolvers/outputs/TorrentCount";

@TypeGraphQL.ObjectType("Torrent", {
  isAbstract: true
})
export class Torrent {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  torrentId!: string;

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

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
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
  eta?: number | null;

  files?: TorrentFile[];

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  progress!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  ratio!: number;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  status!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  downloaded!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  uploaded!: number;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  isDeleted!: boolean;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  addedAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  completedAt?: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  deletedAt?: Date | null;

  @TypeGraphQL.Field(_type => TorrentCount, {
    nullable: true
  })
  _count?: TorrentCount | null;
}
