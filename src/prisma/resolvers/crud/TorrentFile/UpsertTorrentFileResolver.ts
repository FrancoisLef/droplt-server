import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { UpsertTorrentFileArgs } from "./args/UpsertTorrentFileArgs";
import { TorrentFile } from "../../../models/TorrentFile";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => TorrentFile)
export class UpsertTorrentFileResolver {
  @TypeGraphQL.Mutation(_returns => TorrentFile, {
    nullable: false
  })
  async upsertTorrentFile(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpsertTorrentFileArgs): Promise<TorrentFile> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).torrentFile.upsert({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
