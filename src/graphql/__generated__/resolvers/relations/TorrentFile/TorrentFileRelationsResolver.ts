import * as TypeGraphQL from "type-graphql";
import { Torrent } from "../../../models/Torrent";
import { TorrentFile } from "../../../models/TorrentFile";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => TorrentFile)
export class TorrentFileRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Torrent, {
    nullable: true
  })
  async Torrent(@TypeGraphQL.Root() torrentFile: TorrentFile, @TypeGraphQL.Ctx() ctx: any): Promise<Torrent | null> {
    return getPrismaFromContext(ctx).torrentFile.findUnique({
      where: {
        torrentFileId: torrentFile.torrentFileId,
      },
    }).Torrent({});
  }
}
