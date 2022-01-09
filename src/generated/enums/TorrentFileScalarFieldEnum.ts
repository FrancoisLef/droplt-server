import * as TypeGraphQL from "type-graphql";

export enum TorrentFileScalarFieldEnum {
  torrentFileId = "torrentFileId",
  torrentId = "torrentId",
  name = "name",
  size = "size",
  downloaded = "downloaded",
  createdAt = "createdAt",
  updatedAt = "updatedAt"
}
TypeGraphQL.registerEnumType(TorrentFileScalarFieldEnum, {
  name: "TorrentFileScalarFieldEnum",
  description: undefined,
});
