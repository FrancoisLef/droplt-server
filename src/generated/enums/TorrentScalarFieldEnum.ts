import * as TypeGraphQL from "type-graphql";

export enum TorrentScalarFieldEnum {
  torrentId = "torrentId",
  hash = "hash",
  name = "name",
  progress = "progress",
  status = "status",
  totalSize = "totalSize",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(TorrentScalarFieldEnum, {
  name: "TorrentScalarFieldEnum",
  description: undefined,
});
