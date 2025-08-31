import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import prisma from "@/lib/db";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";

export type Context = {
    prisma: typeof prisma
}

const server = new ApolloServer<Context>({
    resolvers,
    typeDefs
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => ({ prisma }),
});

export {handler as GET, handler as POST};