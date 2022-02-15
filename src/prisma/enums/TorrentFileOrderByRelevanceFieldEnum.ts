import * as TypeGraphQL from "type-graphql";

export enum TorrentFileOrderByRelevanceFieldEnum {
  torrentFileId = "torrentFileId",
  torrentId = "torrentId",
  name = "name"
}
TypeGraphQL.registerEnumType(TorrentFileOrderByRelevanceFieldEnum, {
  name: "TorrentFileOrderByRelevanceFieldEnum",
  description: undefined,
});
