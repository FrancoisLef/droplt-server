import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentCreateOrConnectWithoutFilesInput } from "../inputs/TorrentCreateOrConnectWithoutFilesInput";
import { TorrentCreateWithoutFilesInput } from "../inputs/TorrentCreateWithoutFilesInput";
import { TorrentUpdateWithoutFilesInput } from "../inputs/TorrentUpdateWithoutFilesInput";
import { TorrentUpsertWithoutFilesInput } from "../inputs/TorrentUpsertWithoutFilesInput";
import { TorrentWhereUniqueInput } from "../inputs/TorrentWhereUniqueInput";

@TypeGraphQL.InputType("TorrentUpdateOneWithoutFilesInput", {
  isAbstract: true
})
export class TorrentUpdateOneWithoutFilesInput {
  @TypeGraphQL.Field(_type => TorrentCreateWithoutFilesInput, {
    nullable: true
  })
  create?: TorrentCreateWithoutFilesInput | undefined;

  @TypeGraphQL.Field(_type => TorrentCreateOrConnectWithoutFilesInput, {
    nullable: true
  })
  connectOrCreate?: TorrentCreateOrConnectWithoutFilesInput | undefined;

  @TypeGraphQL.Field(_type => TorrentUpsertWithoutFilesInput, {
    nullable: true
  })
  upsert?: TorrentUpsertWithoutFilesInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field(_type => TorrentWhereUniqueInput, {
    nullable: true
  })
  connect?: TorrentWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TorrentUpdateWithoutFilesInput, {
    nullable: true
  })
  update?: TorrentUpdateWithoutFilesInput | undefined;
}
