import NextAuth from "next-auth"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import Google from "next-auth/providers/google"
import { db } from "@/db"

const handler = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
        clientId: process.env.AUTH_GOOGLE_ID!,
        clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      }),
  ],
})

export { handler as GET, handler as POST };