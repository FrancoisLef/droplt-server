import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateTorrentArgs } from "./args/AggregateTorrentArgs";
import { Torrent } from "../../../models/Torrent";
import { AggregateTorrent } from "../../outputs/AggregateTorrent";
import { transformFields, getPrismaFromContext, transformCountFieldIntoSelectRelationsCount } from "../../../helpers";

@TypeGraphQL.Resolver(_of => Torrent)
export class AggregateTorrentResolver {
  @TypeGraphQL.Query(_returns => AggregateTorrent, {
    nullable: false
  })
  async aggregateTorrent(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateTorrentArgs): Promise<AggregateTorrent> {
    return getPrismaFromContext(ctx).torrent.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
