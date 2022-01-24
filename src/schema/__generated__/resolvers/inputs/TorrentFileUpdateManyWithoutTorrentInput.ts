import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { TorrentFileCreateManyTorrentInputEnvelope } from "../inputs/TorrentFileCreateManyTorrentInputEnvelope";
import { TorrentFileCreateOrConnectWithoutTorrentInput } from "../inputs/TorrentFileCreateOrConnectWithoutTorrentInput";
import { TorrentFileCreateWithoutTorrentInput } from "../inputs/TorrentFileCreateWithoutTorrentInput";
import { TorrentFileScalarWhereInput } from "../inputs/TorrentFileScalarWhereInput";
import { TorrentFileUpdateManyWithWhereWithoutTorrentInput } from "../inputs/TorrentFileUpdateManyWithWhereWithoutTorrentInput";
import { TorrentFileUpdateWithWhereUniqueWithoutTorrentInput } from "../inputs/TorrentFileUpdateWithWhereUniqueWithoutTorrentInput";
import { TorrentFileUpsertWithWhereUniqueWithoutTorrentInput } from "../inputs/TorrentFileUpsertWithWhereUniqueWithoutTorrentInput";
import { TorrentFileWhereUniqueInput } from "../inputs/TorrentFileWhereUniqueInput";

@TypeGraphQL.InputType("TorrentFileUpdateManyWithoutTorrentInput", {
  isAbstract: true
})
export class TorrentFileUpdateManyWithoutTorrentInput {
  @TypeGraphQL.Field(_type => [TorrentFileCreateWithoutTorrentInput], {
    nullable: true
  })
  create?: TorrentFileCreateWithoutTorrentInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileCreateOrConnectWithoutTorrentInput], {
    nullable: true
  })
  connectOrCreate?: TorrentFileCreateOrConnectWithoutTorrentInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileUpsertWithWhereUniqueWithoutTorrentInput], {
    nullable: true
  })
  upsert?: TorrentFileUpsertWithWhereUniqueWithoutTorrentInput[] | undefined;

  @TypeGraphQL.Field(_type => TorrentFileCreateManyTorrentInputEnvelope, {
    nullable: true
  })
  createMany?: TorrentFileCreateManyTorrentInputEnvelope | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileWhereUniqueInput], {
    nullable: true
  })
  set?: TorrentFileWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileWhereUniqueInput], {
    nullable: true
  })
  disconnect?: TorrentFileWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileWhereUniqueInput], {
    nullable: true
  })
  delete?: TorrentFileWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileWhereUniqueInput], {
    nullable: true
  })
  connect?: TorrentFileWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileUpdateWithWhereUniqueWithoutTorrentInput], {
    nullable: true
  })
  update?: TorrentFileUpdateWithWhereUniqueWithoutTorrentInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileUpdateManyWithWhereWithoutTorrentInput], {
    nullable: true
  })
  updateMany?: TorrentFileUpdateManyWithWhereWithoutTorrentInput[] | undefined;

  @TypeGraphQL.Field(_type => [TorrentFileScalarWhereInput], {
    nullable: true
  })
  deleteMany?: TorrentFileScalarWhereInput[] | undefined;
}
