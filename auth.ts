import {AuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "./src/lib/mongodb";
import User from "./src/models/User";
import dbConnect from "./src/lib/dbConnect";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
                name: {label: "Name", type: "text"},
                isRegister: {label: "Register", type: "text"}
            },
            async authorize(rawCredentials) {
                const credentials = rawCredentials as {
                    email?: string;
                    password?: string;
                    name?: string;
                    isRegister?: string;
                };

                if (!credentials.email || !credentials.password || !credentials.isRegister || !credentials.isRegister) {
                    throw new Error("Semua field harus diisi");
                }

                await dbConnect();
                const user = await User.findOne({email: credentials?.email});
                if (credentials?.isRegister === "true") {
                    if (user) throw new Error("Email sudah terdaftar");
                    if (!credentials.name || credentials.name.length < 3) {
                        throw new Error("Nama harus terdiri dari minimal 3 karakter");
                    }

                    const hashedPassword = await bcrypt.hash(credentials.password, 10);

                    const newUser = new User({
                        name: credentials.name,
                        email: credentials.email,
                        password: hashedPassword
                    });
                    await newUser.save();

                    return {
                        id: newUser._id,
                        email: newUser.email,
                        name: newUser.name
                    };
                } else {
                    if (!user) throw new Error("Email tidak ditemukan");
                    if (!user.password) {
                        throw new Error("User terdaftar dengan metode lain, silakan masuk menggunakan metode tersebut");
                    }
                    const passwordMatch = await bcrypt.compare(credentials.password, user.password);
                    if (!passwordMatch) throw new Error("Email atau password salah");

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name
                    };
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) token.id = user.id;
            return token;
        },
        async session({session, token}) {
            if (session.user && token?.id) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/login"
    },
    secret: process.env.NEXTAUTH_SECRET
};
