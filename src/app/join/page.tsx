'use server';


import { getServerSession } from "next-auth";
import { authOptions } from "@r/auth";
import Link from "next/link";
import CreateJoinRoom from "@c/CreateJoinRoom";
import JoinRoomForm from "./JoinRoomForm";



export default async function JoinPage() {
    const session = await getServerSession(authOptions);

    return (
        <CreateJoinRoom>
            { session ? (
                <>
                    <div className="flex flex-col items-center justify-center gap-1 mb-4">
                        <h1 className="text-2xl font-bold tracking-tight text-white">Masuk ke dalam Room</h1>
                        <p className="text-sm text-zinc-400">Masukkan kode room untuk bergabung!</p>
                    </div>

                    <JoinRoomForm />
                </>

            ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-6">
                    <h1 className="text-xl font-bold text-center text-red-400">Anda harus login untuk masuk ke dalam room</h1>
                    <p className="text-sm text-center text-zinc-400">Silakan <Link className="font-semibold text-[#c9586a] transition-colors hover:text-[#d87a89]" href="/login">log in</Link> untuk melanjutkan</p>
                </div>
            ) }
        </CreateJoinRoom>
    );
};
