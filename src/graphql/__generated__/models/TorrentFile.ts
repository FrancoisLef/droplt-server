import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../scalars";
import { Torrent } from "../models/Torrent";

@TypeGraphQL.ObjectType("TorrentFile", {
  isAbstract: true
})
export class TorrentFile {
  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  torrentFileId!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  torrentId?: string | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  name!: string;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  size!: number;

  @TypeGraphQL.Field(_type => TypeGraphQL.Float, {
    nullable: false
  })
  downloaded!: number;

  Torrent?: Torrent | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false
  })
  updatedAt!: Date;
}
