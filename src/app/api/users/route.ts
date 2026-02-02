import dbConnect from "@l/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    const session = await getServerSession();
    await dbConnect();

    if (!session || !session.user) return new Response(JSON.stringify({ error: "Unauthorized", message: "Silahkan gunakan autentikasi anda" }), { status: 401 });

    try {

        const allUsers = await User.find().select("-password");

        return new Response(JSON.stringify(allUsers), { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}