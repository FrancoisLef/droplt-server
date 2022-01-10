import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateTorrentFileArgs } from "./args/AggregateTorrentFileArgs";
import { TorrentFile } from "../../../models/TorrentFile";
import { AggregateTorrentFile } from "../../outputs/AggregateTorrentFile";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => TorrentFile)
export class AggregateTorrentFileResolver {
  @TypeGraphQL.Query(_returns => AggregateTorrentFile, {
    nullable: false
  })
  async aggregateTorrentFile(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateTorrentFileArgs): Promise<AggregateTorrentFile> {
    return getPrismaFromContext(ctx).torrentFile.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
