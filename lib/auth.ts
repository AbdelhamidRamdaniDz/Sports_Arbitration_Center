import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image?: string | null;
      isAdmin?: boolean;
    }
  }
  interface User {
    id: string;
    name: string | null;
    email: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string | null;
    name: string | null;
    isAdmin?: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("البريد الإلكتروني وكلمة المرور مطلوبان");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("البريد الإلكتروني غير مسجل");
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("كلمة المرور غير صحيحة");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn() {
      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name || null,
          email: token.email || null,
          isAdmin: token.isAdmin
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      const envAdmin = (process.env.SUPER_ADMIN_EMAIL || "admin@gmail.com").trim().toLowerCase();
      const emailNorm = token.email?.trim().toLowerCase();
      token.isAdmin = (emailNorm === envAdmin);
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        const u = new URL(url);
        if (u.origin === baseUrl) return url;
        return baseUrl;
      } catch {
        return baseUrl;
      }
    }
  },
};