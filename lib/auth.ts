import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import bcrypt from "bcrypt";

const authOptions: AuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID!,
        //     clientSecret: process.env.GOOGLE_SECRET!,
        // }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: 'Name', placeholder: 'Enter your Name', type: 'text' },
                email: { label: 'Email', placeholder: 'Enter your Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });
                if (!user) {
                    const hashedPassword = bcrypt.hashSync(credentials.password, 10);
                    const newUser = await prisma.user.create({
                        data: {
                            name: credentials.name,
                            email: credentials.email,
                            password: hashedPassword
                        }
                    });
                    console.log("1. CREAte: User in DB:", user);
                    return {
                        id: newUser.id.toString(),
                        name: newUser.name,
                        email: newUser.email
                    };
                }

                const checkPassword = bcrypt.compareSync(credentials.password, user.password);

                if (!checkPassword) {
                    return null;
                }
                console.log("1. AUTHORIZE: User found in DB:", user);
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email
                };
            }
        })
    ],

    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                // Add user id to the session
                (session.user as any).id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        },
    }
}

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession }