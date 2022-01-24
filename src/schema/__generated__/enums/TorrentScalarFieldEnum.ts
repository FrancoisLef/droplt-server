import * as TypeGraphQL from "type-graphql";

export enum TorrentScalarFieldEnum {
  torrentId = "torrentId",
  hash = "hash",
  transmissionId = "transmissionId",
  name = "name",
  size = "size",
  path = "path",
  eta = "eta",
  progress = "progress",
  ratio = "ratio",
  status = "status",
  downloaded = "downloaded",
  uploaded = "uploaded",
  isDeleted = "isDeleted",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  addedAt = "addedAt",
  completedAt = "completedAt",
  deletedAt = "deletedAt"
}
TypeGraphQL.registerEnumType(TorrentScalarFieldEnum, {
  name: "TorrentScalarFieldEnum",
  description: undefined,
});
