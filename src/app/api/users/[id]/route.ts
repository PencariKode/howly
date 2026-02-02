import dbConnect from "@l/dbConnect";
import User from "@/models/User";
import {getToken} from "next-auth/jwt";
import {getServerSession} from "next-auth";

export const dynamic = "auto";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession();
    if (!session || !session.user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }
    await dbConnect();

        let user;
        let userId = (await params).id;
        try {
            if (userId === "me") {
                user = await User.findOne({ email: session.user.email }).select("-password");
            } else {
                user = await User.findById(userId).select("-password");
            }
            if (!user) {
                return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
            }
            return new Response(JSON.stringify(user), { status: 200 });

        } catch (error: any) {
            console.error("Error fetching user:", error);
            return new Response(JSON.stringify({ error: "Internal Server Error", message: error.reason.toString() || error.message }), { status: 500 });
        }
}