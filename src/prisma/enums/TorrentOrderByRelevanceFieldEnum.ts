import * as TypeGraphQL from "type-graphql";

export enum TorrentOrderByRelevanceFieldEnum {
  torrentId = "torrentId",
  name = "name",
  path = "path",
  status = "status"
}
TypeGraphQL.registerEnumType(TorrentOrderByRelevanceFieldEnum, {
  name: "TorrentOrderByRelevanceFieldEnum",
  description: undefined,
});
