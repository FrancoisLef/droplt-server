import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { UpdateTorrentFileArgs } from "./args/UpdateTorrentFileArgs";
import { TorrentFile } from "../../../models/TorrentFile";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => TorrentFile)
export class UpdateTorrentFileResolver {
  @TypeGraphQL.Mutation(_returns => TorrentFile, {
    nullable: true
  })
  async updateTorrentFile(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: UpdateTorrentFileArgs): Promise<TorrentFile | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).torrentFile.update({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
