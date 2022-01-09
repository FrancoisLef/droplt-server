import * as TypeGraphQL from "type-graphql";

export enum TorrentScalarFieldEnum {
  torrentId = "torrentId",
  hash = "hash",
  transmissionId = "transmissionId",
  name = "name",
  size = "size",
  path = "path",
  progress = "progress",
  ratio = "ratio",
  status = "status",
  downloaded = "downloaded",
  uploaded = "uploaded",
  addedAt = "addedAt",
  completedAt = "completedAt",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(TorrentScalarFieldEnum, {
  name: "TorrentScalarFieldEnum",
  description: undefined,
});
