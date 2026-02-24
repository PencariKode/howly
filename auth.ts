import { AuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@l/prisma";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
        name: {},
        isRegister: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi");
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { accounts: true },
        });

        // regis
        if (credentials.isRegister === "true") {
          if (existingUser) {
            if (existingUser.accounts.length > 0) {
              const providerName = existingUser.accounts[0].provider;
              const displayName =
                providerName.charAt(0).toUpperCase() + providerName.slice(1);
              throw new Error(
                `Email ini sudah terdaftar melalui ${displayName}. Silakan gunakan metode login tersebut.`,
              );
            }
            throw new Error("Email sudah terdaftar");
          }

          if (!credentials.name || credentials.name.length < 3) {
            throw new Error("Nama harus terdiri dari minimal 3 karakter");
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const newUser = await prisma.user.create({
            data: {
              name: credentials.name,
              email: credentials.email,
              password: hashedPassword,
            },
          });

          return newUser;
        }

        // login
        if (!existingUser) {
          throw new Error("Akun tidak ditemukan");
        }

        if (!existingUser.password) {
          if (existingUser.accounts.length > 0) {
            const providerName = existingUser.accounts[0].provider;
            const displayName =
              providerName.charAt(0).toUpperCase() + providerName.slice(1);
            throw new Error(
              `Email ini terdaftar melalui ${displayName}. Silakan gunakan metode login tersebut.`,
            );
          }
          throw new Error("Akun tidak ditemukan");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          existingUser.password,
        );

        if (!isValid) {
          throw new Error("Password salah");
        }

        return existingUser;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      // refetch setelah update profile
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { name: true, image: true, role: true, createdAt: true },
        });
        if (dbUser) {
          token.name = dbUser.name;
          token.picture = dbUser.image;
          token.role = dbUser.role;
          token.createdAt = dbUser.createdAt.toISOString();
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        if (!token.id || !token.role) {
          throw new Error("Missing token data");
        }
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.createdAt = token.createdAt as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};
