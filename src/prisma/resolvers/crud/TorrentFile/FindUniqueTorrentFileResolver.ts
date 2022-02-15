import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { FindUniqueTorrentFileArgs } from "./args/FindUniqueTorrentFileArgs";
import { TorrentFile } from "../../../models/TorrentFile";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => TorrentFile)
export class FindUniqueTorrentFileResolver {
  @TypeGraphQL.Query(_returns => TorrentFile, {
    nullable: true
  })
  async torrentFile(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: FindUniqueTorrentFileArgs): Promise<TorrentFile | null> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).torrentFile.findUnique({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
