import { Context } from "@/app/api/graphql/route";
import Conversation from "@/configs/gpt";

export const resolvers = {
    Query: {
        user: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.user.findUnique({
                where: {
                    id: args.id
                }
            })
        },
        users: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.user.findMany({
                include: { conversations: true }
            });
        },
        conversation: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.conversation.findUnique({
                where:{
                    id: Number(args.id)
                }
            })
        },
        conversations: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.conversation.findMany({
                where:{
                    UserId:Number(args.userId)
                },
                include: {chats:true}
            })
        }
    },
    User: {
        conversations: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.conversation.findMany({
                where: {
                    UserId: _parent.id
                }
            });
        }
    },
    Conversation: {
        chats: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.chat.findMany({
                where: {
                    ConversationId: _parent.id
                }
            })
        }
    },
    Mutation: {
        addConversation: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.conversation.create({
                data: {
                    UserId: Number(args.userId),
                    title: args.title
                },
                include:{
                    user: true
                }
            })
        },
        updateConversation: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.conversation.update({
                where: {
                    id: Number(args.id)
                },
                data: {
                    title: args.title
                }
            })
        },
        deleteConversation: async (_parent: any, args: any, context: Context) => {
            return await context.prisma.conversation.delete({
                where: {
                    id: Number(args.id)
                },
                include:{
                    user: true
                }
            })
        },
    }
};