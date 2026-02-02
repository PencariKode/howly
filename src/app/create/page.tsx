'use server';


import MainContainer from "@c/MainContainer";
import { getServerSession } from "next-auth";
import { authOptions } from "@r/auth";
import SimpleFormHeader from "@c/Form/SimpleFormHeader";
import CreateRoomForm from "@/components/Form/CreateRoomForm";
import Link from "next/link";



export default async function Page() {
    const session = await getServerSession(authOptions);

    return (
        <MainContainer>
            <section
                className={ `minMaxWidth min-h-[75vh] lg:min-h-[110vh] mt-6 flex flex-col gap-5 items-center justify-center xs:px-10 sm:px-20 md:px-25 lg:px-40 xl:px-60 2xl:px-80` }>
                <div
                    className={ `minMaxWidth min-h-10 h-fit py-8 px-4 ring-hl-text/30 ring-[0.5px] bg-hl-secondary text-hl-text rounded-md flex flex-col gap-2 items-center justify-center` }>
                    <SimpleFormHeader />
                    { session ? (

                        <>
                            <div className={ `flex flex-col items-center justify-center gap-1` }>
                                <h1 className="text-xl font-bold">Buat Room Baru</h1>
                                <p className="text-sm">Buat room-mu sendiri untuk bermain!</p>
                            </div>

                            <CreateRoomForm />
                        </>

                    ) : (
                        <div className={ `flex flex-col items-center justify-center gap-2` }>
                            <h1 className="text-xl font-bold text-center text-red-800">Anda harus login untuk membuat room</h1>
                            <p className="text-sm text-center">Please <Link className={ `hover:underline text-cyan-600` } href="/auth/login">log in</Link> to continue</p>
                        </div>
                    ) }


                </div>

                <div
                    className={ `minMaxWidth min-h-10 py-8 px-4 ring-hl-text/30 ring-[0.5px] bg-hl-secondary text-hl-text rounded-md flex flex-col gap-2 items-center justify-center` }>
                    <SimpleFormHeader />
                    <div className={ `flex flex-col items-center justify-center gap-1` }>
                        <h1 className="text-xl font-bold">Kiat & Catatan</h1>
                        <p className="text-sm">Beberapa catatan untuk membantumu</p>
                    </div>

                    <div className={ `flex flex-col items-center justify-center gap-4 py-5 px-2 minMaxWidth ` }>
                        <ol className={ `list-decimal list-inside text-left text-sm space-y-2 *:even:ml-3 font-extralight` }>
                            <li>Pemilik room tidak akan ikut bermain, pemilik room akan menjadi <i>Moderator</i> permainan.</li>
                            <li>Pastikan nama room yang kamu buat unik dan mudah diingat.</li>
                            <li>Jumlah pemain minimal adalah 7 orang, dan maksimal 59 orang.</li>
                            <li>Pilih role set yang sesuai dengan preferensimu, apakah menggunakan role default atau custom.</li>
                            <li>Pastikan kekuatan kedua belah pihak itu seimbang (antara <i>werewolf</i> dan <i>warga</i>).</li>
                            <li>Periksa kembali konfigurasi role sebelum membuat room untuk memastikan semuanya sesuai.</li>
                            <li>Setelah membuat room, bagikan link kepada teman-temanmu untuk bergabung.</li>
                            <li>Permainan hanya akan dimulai jika pemilik room menekan tombol <i>mulai permainan</i>.</li>
                            <li>Permainan akan dijeda dan dapat dihentikan otomatis jika <i>Moderator</i> tidak memiliki koneksi ke <i>Server</i>.</li>
                        </ol>
                    </div>
                </div>
            </section>
        </MainContainer>
    );
};