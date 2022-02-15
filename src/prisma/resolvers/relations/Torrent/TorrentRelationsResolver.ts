import * as TypeGraphQL from "type-graphql";
import { Torrent } from "../../../models/Torrent";
import { TorrentFile } from "../../../models/TorrentFile";
import { TorrentFilesArgs } from "./args/TorrentFilesArgs";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Torrent)
export class TorrentRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [TorrentFile], {
    nullable: false
  })
  async files(@TypeGraphQL.Root() torrent: Torrent, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: TorrentFilesArgs): Promise<TorrentFile[]> {
    return getPrismaFromContext(ctx).torrent.findUnique({
      where: {
        torrentId: torrent.torrentId,
      },
    }).files(args);
  }
}
