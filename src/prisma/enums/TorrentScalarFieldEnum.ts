import * as TypeGraphQL from "type-graphql";

export enum TorrentScalarFieldEnum {
  torrentId = "torrentId",
  name = "name",
  size = "size",
  path = "path",
  eta = "eta",
  progress = "progress",
  ratio = "ratio",
  status = "status",
  downloaded = "downloaded",
  uploaded = "uploaded",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  addedAt = "addedAt",
  completedAt = "completedAt"
}
TypeGraphQL.registerEnumType(TorrentScalarFieldEnum, {
  name: "TorrentScalarFieldEnum",
  description: undefined,
});
