

import SimpleFormHeader from "@c/Form/SimpleFormHeader";


export default function CreateJoinRoom({children}: {children: React.ReactNode}) {

    return (
        <div className="flex min-h-screen items-center justify-center bg-hl-bg px-4 py-12">
            <div className="pointer-events-none fixed inset-0 z-0"
                style={ {
                    background: `
                        radial-gradient(ellipse 40% 50% at 0% 0%, rgba(107,21,37,0.40) 0%, transparent 70%),
                        radial-gradient(ellipse 40% 50% at 100% 100%, rgba(139,32,48,0.30) 0%, transparent 70%),
                        radial-gradient(ellipse 30% 40% at 100% 50%, rgba(166,52,69,0.25) 0%, transparent 70%),
                        radial-gradient(ellipse 25% 30% at 25% 100%, rgba(107,21,37,0.30) 0%, transparent 70%)
                    `
                } }
            />

            <div className="relative z-10 w-full max-w-lg flex flex-col gap-5">
                <div className="auth-card">
                    <SimpleFormHeader />
                    {children}
                </div>

                <div className="auth-card">
                    <SimpleFormHeader />
                    <div className="flex flex-col items-center justify-center gap-1 mb-4">
                        <h1 className="text-xl font-bold tracking-tight text-white">Kiat & Catatan</h1>
                        <p className="text-sm text-zinc-400">Beberapa catatan untuk membantumu</p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-4 py-2 px-1 w-full">
                        <ol className="list-decimal list-inside text-left text-sm space-y-2 *:even:ml-3 font-light text-zinc-300">
                            <li>Pemilik room tidak akan ikut bermain, pemilik room akan menjadi <em>Moderator</em> permainan.</li>
                            <li>Pastikan nama room yang kamu buat unik dan mudah diingat.</li>
                            <li>Jumlah pemain minimal adalah 7 orang, dan maksimal 59 orang.</li>
                            <li>Pilih role set yang sesuai dengan preferensimu, apakah menggunakan role default atau custom.</li>
                            <li>Pastikan kekuatan kedua belah pihak itu seimbang (antara <em>werewolf</em> dan <em>warga</em>).</li>
                            <li>Periksa kembali konfigurasi role sebelum membuat room untuk memastikan semuanya sesuai.</li>
                            <li>Setelah membuat room, bagikan link kepada teman-temanmu untuk bergabung.</li>
                            <li>Permainan hanya akan dimulai jika pemilik room menekan tombol <em>mulai permainan</em>.</li>
                            <li>Permainan akan dijeda dan dapat dihentikan otomatis jika <em>Moderator</em> tidak memiliki koneksi ke <em>Server</em>.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};