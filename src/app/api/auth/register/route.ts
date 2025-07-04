// /src/app/api/auth/register/route.ts
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return new Response(JSON.stringify({ message: "Semua field wajib diisi" }), { status: 400 });
        }

        await dbConnect();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: "Email sudah digunakan" }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        return new Response(JSON.stringify({ message: "Akun berhasil dibuat" }), { status: 201 });
    } catch (error) {
        console.error("Register Error:", error);
        return new Response(JSON.stringify({ message: "Terjadi kesalahan server" }), { status: 500 });
    }
}
