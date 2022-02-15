import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { CreateTorrentFileArgs } from "./args/CreateTorrentFileArgs";
import { TorrentFile } from "../../../models/TorrentFile";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => TorrentFile)
export class CreateTorrentFileResolver {
  @TypeGraphQL.Mutation(_returns => TorrentFile, {
    nullable: false
  })
  async createTorrentFile(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: CreateTorrentFileArgs): Promise<TorrentFile> {
    const { _count } = transformFields(
      graphqlFields(info as any)
    );
    return getPrismaFromContext(ctx).torrentFile.create({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
    });
  }
}
