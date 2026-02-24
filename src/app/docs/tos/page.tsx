import DocLayout from "@c/DocLayout";

export default function TosPage() {
    return (
        <DocLayout
            title="Syarat dan Ketentuan Layanan"
            subtitle="Howly - Permainan Werewolf Berbasis Web"
            updated="24 Februari 2026"
        >
            <section className="flex flex-col gap-3">
                <h2>1. Pendahuluan</h2>
                <p>
                    Selamat datang di Howly. Dokumen ini mengatur syarat dan ketentuan penggunaan layanan Howly
                    (&quot;Layanan&quot;), sebuah aplikasi permainan Werewolf berbasis web yang dikembangkan dan dikelola
                    oleh PencariKode (&quot;Pengembang&quot;, &quot;Kami&quot;). Dengan mengakses atau menggunakan Layanan ini,
                    Anda (&quot;Pengguna&quot;) menyatakan telah membaca, memahami, dan menyetujui seluruh syarat dan
                    ketentuan yang tercantum di bawah ini.
                </p>
                <p>
                    Apabila Anda tidak menyetujui salah satu atau seluruh ketentuan dalam dokumen ini, Anda
                    dipersilakan untuk tidak menggunakan Layanan ini.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>2. Deskripsi Layanan</h2>
                <p>
                    Howly adalah aplikasi permainan Werewolf klasik yang dirancang untuk dimainkan secara luring
                    (tatap muka) dengan dukungan digital. Layanan ini mencakup, namun tidak terbatas pada:
                </p>
                <ul>
                    <li>Pembuatan dan pengelolaan ruang permainan (room)</li>
                    <li>Pembagian peran secara acak kepada pemain</li>
                    <li>Fitur komunikasi dalam permainan (real-time chat)</li>
                    <li>Fitur voting dalam permainan</li>
                    <li>Pengelolaan alur permainan oleh Gamemaster</li>
                </ul>
                <p>
                    Layanan ini bersifat gratis dan dapat diakses melalui peramban web (browser) tanpa memerlukan
                    instalasi perangkat lunak tambahan.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>3. Persyaratan Penggunaan</h2>

                <h3>3.1 Kelayakan</h3>
                <p>
                    Layanan ini dapat digunakan oleh siapa saja tanpa batasan usia tertentu. Namun, bagi pengguna
                    di bawah umur, disarankan untuk menggunakan Layanan ini di bawah pengawasan orang tua atau wali.
                </p>

                <h3>3.2 Akun Pengguna</h3>
                <p>
                    Untuk mengakses fitur tertentu, Pengguna mungkin diharuskan untuk membuat akun atau masuk melalui
                    penyedia autentikasi pihak ketiga (Google, GitHub). Pengguna bertanggung jawab penuh atas keamanan
                    dan kerahasiaan kredensial akunnya.
                </p>

                <h3>3.3 Perilaku Pengguna</h3>
                <p>Pengguna setuju untuk:</p>
                <ul>
                    <li>Menggunakan Layanan sesuai dengan tujuan yang dimaksudkan, yaitu bermain permainan Werewolf</li>
                    <li>Tidak menyalahgunakan fitur komunikasi (chat) untuk menyebarkan konten yang bersifat SARA, pornografi, ujaran kebencian, ancaman, atau konten ilegal lainnya</li>
                    <li>Tidak melakukan tindakan yang dapat mengganggu, merusak, atau membahayakan sistem, server, atau infrastruktur Layanan</li>
                    <li>Tidak melakukan eksploitasi, reverse engineering, atau upaya peretasan terhadap Layanan</li>
                    <li>Menjaga etika dan sportivitas selama bermain</li>
                </ul>
            </section>

            <section className="flex flex-col gap-3">
                <h2>4. Fitur dan Mekanisme Permainan</h2>

                <h3>4.1 Peran dalam Permainan</h3>
                <p>
                    Layanan menyediakan berbagai peran (role) yang dibagi menjadi tiga kategori: Netral (Gamemaster),
                    Tim Manusia (Warga, Peramal, Penyihir, Dukun, Raja), dan Tim Werewolf (Werewolf, Black Wolf,
                    Shapeshifter). Setiap peran memiliki tugas dan kemampuan masing-masing yang diatur secara otomatis
                    oleh sistem.
                </p>

                <h3>4.2 Pembagian Peran</h3>
                <p>
                    Pembagian peran dilakukan secara acak oleh sistem. Pengembang tidak memberikan jaminan bahwa
                    distribusi peran akan selalu memenuhi preferensi Pengguna.
                </p>

                <h3>4.3 Gamemaster</h3>
                <p>
                    Gamemaster adalah peran netral yang berfungsi sebagai moderator permainan. Pengguna yang berperan
                    sebagai Gamemaster bertanggung jawab untuk menjalankan permainan sesuai dengan aturan yang berlaku.
                </p>

                <h3>4.4 Aturan Permainan</h3>
                <p>
                    Beberapa aspek permainan, termasuk durasi diskusi, waktu voting, dan batasan jumlah peran, dapat
                    dikustomisasi oleh pembuat ruang permainan. Pengembang tidak bertanggung jawab atas konfigurasi
                    aturan yang dipilih oleh Pengguna.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>5. Privasi dan Data Pengguna</h2>

                <h3>5.1 Data yang Dikumpulkan</h3>
                <p>Layanan dapat mengumpulkan data berikut:</p>
                <ul>
                    <li>Informasi akun (nama, alamat email, foto profil) yang diperoleh melalui penyedia autentikasi pihak ketiga</li>
                    <li>Data aktivitas permainan (riwayat permainan, statistik)</li>
                    <li>Data teknis (alamat IP, jenis peramban, informasi perangkat) untuk keperluan operasional</li>
                </ul>

                <h3>5.2 Penggunaan Data</h3>
                <p>Data Pengguna digunakan semata-mata untuk:</p>
                <ul>
                    <li>Menyediakan dan meningkatkan kualitas Layanan</li>
                    <li>Mengidentifikasi dan menangani penyalahgunaan</li>
                    <li>Keperluan analitik internal</li>
                </ul>

                <h3>5.3 Penyimpanan dan Keamanan Data</h3>
                <p>
                    Kami berkomitmen untuk melindungi data Pengguna dengan langkah-langkah keamanan yang wajar. Namun,
                    tidak ada sistem yang sepenuhnya aman, dan Kami tidak dapat menjamin keamanan absolut atas data
                    yang disimpan.
                </p>

                <h3>5.4 Penghapusan Akun</h3>
                <p>
                    Pengguna berhak untuk menghapus akunnya kapan saja melalui halaman profil. Penghapusan akun akan
                    menghilangkan seluruh data yang terkait dengan akun tersebut secara permanen.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>6. Komunikasi dalam Permainan</h2>

                <h3>6.1 Real-Time Chat</h3>
                <p>
                    Layanan menyediakan fitur komunikasi langsung (real-time chat) menggunakan teknologi Server-Side
                    Events (SSE). Fitur ini ditujukan secara eksklusif untuk keperluan permainan.
                </p>

                <h3>6.2 Tanggung Jawab Konten</h3>
                <p>
                    Pengguna bertanggung jawab penuh atas setiap pesan atau konten yang dikirimkan melalui fitur
                    komunikasi. Pengembang berhak untuk mengambil tindakan terhadap Pengguna yang melanggar ketentuan
                    perilaku sebagaimana diatur dalam Pasal 3.3.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>7. Ketersediaan Layanan</h2>

                <h3>7.1 Uptime</h3>
                <p>
                    Layanan ini di-hosting menggunakan platform Vercel dengan arsitektur serverless. Meskipun Kami
                    berupaya untuk menjaga ketersediaan Layanan, Kami tidak menjamin bahwa Layanan akan tersedia
                    secara terus-menerus tanpa gangguan.
                </p>

                <h3>7.2 Pemeliharaan</h3>
                <p>
                    Pengembang berhak untuk melakukan pemeliharaan, pembaruan, atau perubahan pada Layanan
                    sewaktu-waktu tanpa pemberitahuan terlebih dahulu.
                </p>

                <h3>7.3 Penghentian Layanan</h3>
                <p>
                    Pengembang berhak untuk menghentikan Layanan secara sebagian atau seluruhnya kapan saja dengan
                    atau tanpa pemberitahuan sebelumnya.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>8. Kekayaan Intelektual</h2>

                <h3>8.1 Hak Cipta</h3>
                <p>
                    Seluruh konten, desain, kode sumber, dan elemen visual yang terdapat dalam Layanan ini merupakan
                    milik Pengembang dan dilindungi oleh hukum kekayaan intelektual yang berlaku.
                </p>

                <h3>8.2 Lisensi Pengguna</h3>
                <p>
                    Pengguna diberikan lisensi terbatas, non-eksklusif, dan tidak dapat dipindahtangankan untuk
                    mengakses dan menggunakan Layanan sesuai dengan ketentuan yang berlaku.
                </p>

                <h3>8.3 Proyek Sumber Terbuka</h3>
                <p>
                    Kode sumber Howly tersedia secara publik di GitHub. Penggunaan kode sumber tunduk pada lisensi
                    yang tercantum dalam repositori terkait.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>9. Batasan Tanggung Jawab</h2>

                <h3>9.1 Layanan &quot;Sebagaimana Adanya&quot;</h3>
                <p>
                    Layanan ini disediakan &quot;sebagaimana adanya&quot; (as-is) dan &quot;sebagaimana tersedia&quot;
                    (as-available) tanpa jaminan dalam bentuk apa pun, baik tersurat maupun tersirat.
                </p>

                <h3>9.2 Pengecualian Tanggung Jawab</h3>
                <p>Pengembang tidak bertanggung jawab atas:</p>
                <ul>
                    <li>Kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan Layanan</li>
                    <li>Kehilangan data atau gangguan layanan yang disebabkan oleh faktor di luar kendali Pengembang</li>
                    <li>Tindakan atau perilaku Pengguna lain dalam permainan</li>
                    <li>Konten yang dikirimkan oleh Pengguna melalui fitur komunikasi</li>
                </ul>
            </section>

            <section className="flex flex-col gap-3">
                <h2>10. Pelanggaran dan Sanksi</h2>
                <p>
                    Pengembang berhak untuk mengambil tindakan terhadap Pengguna yang melanggar ketentuan ini,
                    termasuk namun tidak terbatas pada:
                </p>
                <ul>
                    <li>Peringatan tertulis</li>
                    <li>Pembatasan akses terhadap fitur tertentu</li>
                    <li>Penangguhan sementara akun</li>
                    <li>Penghapusan permanen akun</li>
                </ul>
                <p>Keputusan mengenai sanksi sepenuhnya berada di bawah diskresi Pengembang.</p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>11. Perubahan Syarat dan Ketentuan</h2>
                <p>
                    Pengembang berhak untuk mengubah, memperbarui, atau merevisi syarat dan ketentuan ini kapan saja.
                    Perubahan akan berlaku efektif sejak dipublikasikan pada halaman ini. Penggunaan Layanan secara
                    berkelanjutan setelah perubahan dipublikasikan dianggap sebagai persetujuan Pengguna terhadap
                    perubahan tersebut.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>12. Hukum yang Berlaku</h2>
                <p>
                    Syarat dan ketentuan ini diatur oleh dan ditafsirkan berdasarkan hukum yang berlaku di Republik
                    Indonesia. Segala sengketa yang timbul sehubungan dengan Layanan ini akan diselesaikan melalui
                    musyawarah untuk mufakat terlebih dahulu sebelum menempuh jalur hukum yang berlaku.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>13. Kontak</h2>
                <p>
                    Apabila Anda memiliki pertanyaan, keluhan, atau masukan terkait syarat dan ketentuan ini,
                    silakan hubungi Kami melalui:
                </p>
                <ul>
                    <li><strong>Email</strong>: <a href="mailto:pencaricode@gmail.com">pencaricode@gmail.com</a></li>
                    <li><strong>GitHub</strong>: <a href="https://github.com/PencariKode" target="_blank" rel="noopener noreferrer">github.com/PencariKode</a></li>
                    <li><strong>LinkedIn</strong>: <a href="https://www.linkedin.com/in/panjidepari" target="_blank" rel="noopener noreferrer">linkedin.com/in/panjidepari</a></li>
                </ul>
            </section>

            <hr className="border-white/10" />
            <p className="text-zinc-500 text-xs text-center">
                Dengan menggunakan Layanan Howly, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui
                seluruh syarat dan ketentuan yang tercantum dalam dokumen ini.
            </p>
        </DocLayout>
    );
}
