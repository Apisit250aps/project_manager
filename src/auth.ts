// auth.ts
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth"
import clientPromise from "./libs/db"
import Credentials from "next-auth/providers/credentials"
import { DefaultJWT, JWT } from "next-auth/jwt"
import { User as Users } from "./models/user"
import dbConnect from "./libs/mongoose"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string
  }
}

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          await dbConnect()

          const user = await Users.findOne({ email: credentials?.email })
          if (!user) return null

          const isValid = await user.comparePassword(credentials?.password)
          if (!isValid) return null

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  pages: {
    signIn: "/auth/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: { session: DefaultSession; token: JWT }) {
      if (token.id) {
        if (!session.user) {
          session.user = { id: token.id as string }
        } else {
          session.user.id = token.id as string
        }
      }
      return session
    }
  }
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
