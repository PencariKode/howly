

export default function InfoGame() {
    return (
        <section id="info" className="min-h-screen minMaxWidth text-hl-text px-4">
            <div className="flex flex-col items-center justify-center gap-y-4 pt-10">
                <h2 className="text-2xl font-extrabold text-center text-red-600"><i className="fa-solid fa-skull-cow"></i> Info Permainan <i className="fa-solid fa-skull-cow"></i></h2>
                <p className="text-sm font-light text-left max-w-2xl leading-tight">
                    Permainan ini adalah permainan tebak-tebakan yang melibatkan dua tim: Tim Werewolf dan Tim Warga.
                    Setiap tim memiliki tujuan yang berbeda, dan pemain harus bekerja sama untuk mencapai tujuan mereka.
                </p>
            </div>
            <div className="max-w-2xl mx-auto mt-5 px-5 py-4 bg-red-700/25 text-hl-text leading-tight rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><i className="fa-solid fa-circle-radiation text-xl"></i> Informasi Umum</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Permainan dimulai dengan pembagian peran secara acak.</li>
                    <li>Identitas setiap pemain tidak wajib dirahasiakan, dapat disesuaikan tergantung cara bermain pemain.</li>
                    <li>Setiap malam, Tim Werewolf memilih satu pemain untuk dieliminasi.</li>
                    <li>Setiap siang, semua pemain berdiskusi dan memilih satu pemain untuk dieliminasi.</li>
                    <li>Setiap pemain yang telah dieliminasi akan diberitahukan perannya.</li>
                    <li>Jangan takut untuk berbohong demi kemenangan timmu dan dirimu.</li>
                    <li>Pada permainan ini tidak ada yang jahat, ini semua tergantung perspektif.</li>
                    <li>Inti dari permainnnya adalah jangan percaya siapapun tetapi buatlah orang percaya kepadamu.</li>
                </ul>
            </div>
        </section>
    );
};