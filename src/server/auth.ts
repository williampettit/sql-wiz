import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  type DefaultSession,
  type DefaultUser,
  type ISODateString,
  type NextAuthOptions,
  getServerSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/lib/env";

import { prismaClient } from "@/server/prisma";

declare module "next-auth" {
  export interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    image: string;
  }

  export interface Session extends DefaultSession {
    user: User;
    expires: ISODateString;
  }
}

export const nextAuthOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prismaClient),
  callbacks: {
    async session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  session: {
    // strategy: "jwt",
    strategy: "database",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};

export async function getServerSessionWrapper() {
  return await getServerSession(nextAuthOptions);
}

export async function requireSession() {
  const session = await getServerSessionWrapper();

  if (!session) {
    throw new Error("User not logged in");
  }

  return session;
}

export async function requireOpenAiApiKey(): Promise<string> {
  const session = await requireSession();

  // get user's openai api key from database
  const { openAiApiKey: userOpenAiApiKey } =
    await prismaClient.user.findUniqueOrThrow({
      where: {
        id: session.user.id,
      },
      select: {
        openAiApiKey: true,
      },
    });

  // if user doesn't have an openai api key, throw error
  if (!userOpenAiApiKey) {
    throw new Error("User does not have an OpenAI API key");
  }

  return userOpenAiApiKey;
}
