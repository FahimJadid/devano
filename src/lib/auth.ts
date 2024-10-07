import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { AuthOptions, DefaultSession, getServerSession } from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
    adapter: DrizzleAdapter(db),
    session: {
      strategy: "jwt",
    },
    providers: [
      Google({
        clientId: process.env.AUTH_GOOGLE_ID || "",
        clientSecret: process.env.AUTH_GOOGLE_SECRET || (() => { throw new Error("AUTH_GOOGLE_SECRET is not defined") })(),
        }),
    ],

    callbacks: {
      async jwt({ token, user }) {
        const dbUser = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, token.email!),
        });
        if (!dbUser) {
          throw new Error("no user with email found");
        }
        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
        };
      },
      async session({ token, session }) {
        if (token) {
          session.user = {
            id: token.id as string,
            name: token.name,
            email: token.email,
            image: token.picture,
          };
        }
        return session;
      },
    },
  } satisfies AuthOptions;
  
export function getSession(){
    return getServerSession(authConfig);
}
