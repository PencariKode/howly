import DocLayout from "@c/DocLayout";

export default function PrivacyPage() {
    return (
        <DocLayout
            title="Kebijakan Privasi"
            subtitle="Howly - Permainan Werewolf Berbasis Web"
            updated="24 Februari 2026"
        >
            <section className="flex flex-col gap-3">
                <h2>1. Pendahuluan</h2>
                <p>
                    Kebijakan Privasi ini menjelaskan bagaimana Howly (&quot;Layanan&quot;, &quot;Kami&quot;), yang
                    dikembangkan oleh PencariKode (&quot;Pengembang&quot;), mengumpulkan, menggunakan, menyimpan, dan
                    melindungi informasi pribadi Pengguna (&quot;Anda&quot;) saat mengakses dan menggunakan Layanan ini.
                </p>
                <p>
                    Dengan menggunakan Layanan ini, Anda menyetujui praktik pengumpulan dan penggunaan data sebagaimana
                    diuraikan dalam kebijakan ini. Apabila Anda tidak menyetujui kebijakan ini, harap tidak melanjutkan
                    penggunaan Layanan.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>2. Informasi yang Kami Kumpulkan</h2>

                <h3>2.1 Informasi Akun</h3>
                <p>
                    Saat Anda membuat akun atau masuk melalui penyedia autentikasi pihak ketiga (Google atau GitHub),
                    Kami dapat menerima informasi berikut:
                </p>
                <ul>
                    <li>Nama lengkap atau nama tampilan</li>
                    <li>Alamat email</li>
                    <li>Foto profil</li>
                    <li>Identifikasi unik dari penyedia autentikasi (OAuth ID)</li>
                </ul>

                <h3>2.2 Informasi yang Anda Berikan Secara Langsung</h3>
                <p>Saat menggunakan Layanan, Anda dapat memberikan informasi tambahan secara sukarela, termasuk:</p>
                <ul>
                    <li>Nama pengguna atau nama tampilan yang dikustomisasi</li>
                    <li>Pesan yang dikirimkan melalui fitur real-time chat dalam permainan</li>
                    <li>Konfigurasi dan preferensi ruang permainan</li>
                </ul>

                <h3>2.3 Informasi yang Dikumpulkan Secara Otomatis</h3>
                <p>Saat Anda mengakses Layanan, sistem dapat mengumpulkan informasi teknis secara otomatis, meliputi:</p>
                <ul>
                    <li>Alamat IP</li>
                    <li>Jenis dan versi peramban (browser)</li>
                    <li>Jenis perangkat dan sistem operasi</li>
                    <li>Halaman yang diakses dan durasi kunjungan</li>
                    <li>Waktu akses dan zona waktu</li>
                </ul>

                <h3>2.4 Cookies dan Penyimpanan Lokal</h3>
                <p>Layanan menggunakan cookies dan/atau penyimpanan lokal (local storage) untuk:</p>
                <ul>
                    <li>Mengelola sesi autentikasi</li>
                    <li>Menyimpan preferensi Pengguna</li>
                    <li>Menjaga keberlangsungan sesi permainan</li>
                </ul>
            </section>

            <section className="flex flex-col gap-3">
                <h2>3. Penggunaan Informasi</h2>
                <p>Informasi yang dikumpulkan digunakan untuk tujuan berikut:</p>

                <h3>3.1 Penyediaan Layanan</h3>
                <ul>
                    <li>Mengautentikasi identitas Pengguna</li>
                    <li>Mengelola akun Pengguna</li>
                    <li>Menyediakan fitur permainan, termasuk pembagian peran, chat, dan voting</li>
                    <li>Menghubungkan Pengguna ke ruang permainan yang sesuai</li>
                </ul>

                <h3>3.2 Peningkatan Layanan</h3>
                <ul>
                    <li>Menganalisis pola penggunaan untuk meningkatkan pengalaman Pengguna</li>
                    <li>Mengidentifikasi dan memperbaiki masalah teknis</li>
                    <li>Mengembangkan fitur baru berdasarkan kebutuhan Pengguna</li>
                </ul>

                <h3>3.3 Keamanan dan Penegakan Aturan</h3>
                <ul>
                    <li>Mendeteksi dan mencegah penyalahgunaan Layanan</li>
                    <li>Mengidentifikasi aktivitas mencurigakan atau pelanggaran terhadap Syarat dan Ketentuan</li>
                    <li>Melindungi hak dan keamanan seluruh Pengguna</li>
                </ul>
            </section>

            <section className="flex flex-col gap-3">
                <h2>4. Penyimpanan Data</h2>

                <h3>4.1 Lokasi Penyimpanan</h3>
                <p>
                    Data Pengguna disimpan pada server yang dikelola melalui platform Vercel dan penyedia layanan
                    basis data yang digunakan oleh Layanan ini.
                </p>

                <h3>4.2 Durasi Penyimpanan</h3>
                <p>
                    Data Pengguna disimpan selama akun masih aktif. Apabila Pengguna memilih untuk menghapus akunnya,
                    seluruh data terkait akan dihapus secara permanen dalam jangka waktu yang wajar.
                </p>

                <h3>4.3 Data Permainan</h3>
                <p>
                    Data yang dihasilkan selama permainan berlangsung (seperti pesan chat, hasil voting, dan riwayat
                    peran) dapat disimpan untuk jangka waktu terbatas guna mendukung fungsionalitas Layanan. Data
                    permainan yang telah berakhir dapat dihapus secara otomatis oleh sistem.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>5. Pembagian Data kepada Pihak Ketiga</h2>

                <h3>5.1 Prinsip Umum</h3>
                <p>
                    Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Pengguna kepada pihak
                    ketiga mana pun.
                </p>

                <h3>5.2 Penyedia Layanan Pihak Ketiga</h3>
                <p>Kami dapat membagikan data secara terbatas kepada penyedia layanan pihak ketiga yang mendukung operasional Layanan, termasuk:</p>
                <ul>
                    <li><strong>Penyedia Autentikasi</strong>: Google dan GitHub, untuk keperluan proses masuk (login)</li>
                    <li><strong>Platform Hosting</strong>: Vercel, untuk menyajikan dan menjalankan Layanan</li>
                    <li><strong>Penyedia Basis Data</strong>: Untuk menyimpan data Pengguna dan data permainan</li>
                </ul>
                <p>Penyedia layanan pihak ketiga ini tunduk pada kebijakan privasi mereka masing-masing.</p>

                <h3>5.3 Kewajiban Hukum</h3>
                <p>
                    Kami dapat mengungkapkan informasi Pengguna apabila diwajibkan oleh hukum, perintah pengadilan,
                    atau permintaan resmi dari otoritas pemerintah yang berwenang.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>6. Keamanan Data</h2>

                <h3>6.1 Langkah Perlindungan</h3>
                <p>Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi data Pengguna, termasuk:</p>
                <ul>
                    <li>Penggunaan protokol HTTPS untuk enkripsi data dalam transmisi</li>
                    <li>Pengelolaan autentikasi melalui standar OAuth 2.0</li>
                    <li>Pembatasan akses terhadap data Pengguna hanya kepada pihak yang berwenang</li>
                </ul>

                <h3>6.2 Keterbatasan</h3>
                <p>
                    Meskipun Kami berupaya semaksimal mungkin, tidak ada metode transmisi data melalui internet atau
                    metode penyimpanan elektronik yang sepenuhnya aman. Kami tidak dapat menjamin keamanan absolut
                    atas data Pengguna.
                </p>

                <h3>6.3 Tanggung Jawab Pengguna</h3>
                <p>Pengguna bertanggung jawab untuk:</p>
                <ul>
                    <li>Menjaga kerahasiaan kredensial akun</li>
                    <li>Tidak membagikan informasi login kepada pihak lain</li>
                    <li>Segera melaporkan kepada Kami apabila terjadi akses tidak sah terhadap akun</li>
                </ul>
            </section>

            <section className="flex flex-col gap-3">
                <h2>7. Hak-Hak Pengguna</h2>
                <p>Pengguna memiliki hak-hak berikut terkait data pribadinya:</p>

                <h3>7.1 Hak Akses</h3>
                <p>Pengguna berhak untuk mengetahui data pribadi apa saja yang Kami kumpulkan dan simpan.</p>

                <h3>7.2 Hak Pembaruan</h3>
                <p>Pengguna berhak untuk memperbarui atau memperbaiki informasi akun melalui halaman profil.</p>

                <h3>7.3 Hak Penghapusan</h3>
                <p>
                    Pengguna berhak untuk menghapus akunnya beserta seluruh data terkait secara permanen melalui
                    fitur penghapusan akun pada halaman profil.
                </p>

                <h3>7.4 Hak Penarikan Persetujuan</h3>
                <p>
                    Pengguna berhak untuk menarik persetujuannya atas pengumpulan dan penggunaan data kapan saja
                    dengan cara menghapus akun atau menghubungi Kami secara langsung.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>8. Komunikasi dalam Permainan</h2>

                <h3>8.1 Pesan Chat</h3>
                <p>
                    Pesan yang dikirimkan melalui fitur real-time chat bersifat terbatas pada ruang permainan yang
                    berlaku. Pesan tersebut dapat dilihat oleh pemain lain dalam ruang permainan yang sama sesuai
                    dengan mekanisme peran masing-masing.
                </p>

                <h3>8.2 Penyimpanan Pesan</h3>
                <p>
                    Pesan chat dapat disimpan secara sementara selama sesi permainan berlangsung. Setelah permainan
                    berakhir, pesan dapat dihapus secara otomatis oleh sistem.
                </p>

                <h3>8.3 Tanggung Jawab Konten</h3>
                <p>
                    Pengguna bertanggung jawab penuh atas konten pesan yang dikirimkan. Kami tidak memantau pesan
                    secara aktif, namun berhak untuk meninjau dan mengambil tindakan apabila menerima laporan pelanggaran.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>9. Layanan Pihak Ketiga</h2>

                <h3>9.1 Tautan Eksternal</h3>
                <p>
                    Layanan ini dapat memuat tautan ke situs web atau layanan pihak ketiga. Kami tidak bertanggung
                    jawab atas praktik privasi atau konten dari situs web atau layanan tersebut.
                </p>

                <h3>9.2 Autentikasi Pihak Ketiga</h3>
                <p>
                    Saat Anda memilih untuk masuk melalui Google atau GitHub, Anda tunduk pada kebijakan privasi
                    penyedia layanan tersebut. Kami hanya menerima informasi yang diizinkan oleh Pengguna melalui
                    proses persetujuan OAuth.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>10. Perlindungan Data Anak</h2>
                <p>
                    Layanan ini tidak dirancang secara khusus untuk anak di bawah usia 13 tahun. Kami tidak secara
                    sengaja mengumpulkan data pribadi dari anak di bawah usia tersebut. Apabila Kami mengetahui bahwa
                    data dari anak di bawah usia 13 tahun telah terkumpul tanpa persetujuan orang tua atau wali,
                    Kami akan mengambil langkah yang wajar untuk menghapus data tersebut.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>11. Perubahan Kebijakan Privasi</h2>
                <p>
                    Kami berhak untuk mengubah atau memperbarui Kebijakan Privasi ini sewaktu-waktu. Setiap perubahan
                    akan berlaku efektif sejak tanggal pembaruan yang tercantum pada bagian atas dokumen ini.
                    Penggunaan Layanan secara berkelanjutan setelah perubahan dipublikasikan dianggap sebagai
                    persetujuan Anda terhadap kebijakan yang telah diperbarui.
                </p>
                <p>Kami menyarankan Pengguna untuk meninjau Kebijakan Privasi ini secara berkala guna mengetahui perubahan yang terjadi.</p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>12. Hukum yang Berlaku</h2>
                <p>
                    Kebijakan Privasi ini diatur oleh dan ditafsirkan berdasarkan hukum yang berlaku di Republik
                    Indonesia, termasuk namun tidak terbatas pada Undang-Undang Nomor 27 Tahun 2022 tentang
                    Perlindungan Data Pribadi.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>13. Kontak</h2>
                <p>
                    Apabila Anda memiliki pertanyaan, permintaan, atau keluhan terkait Kebijakan Privasi ini atau
                    pengelolaan data pribadi Anda, silakan hubungi Kami melalui:
                </p>
                <ul>
                    <li><strong>Email</strong>: <a href="mailto:pencaricode@gmail.com">pencaricode@gmail.com</a></li>
                    <li><strong>GitHub</strong>: <a href="https://github.com/PencariKode" target="_blank" rel="noopener noreferrer">github.com/PencariKode</a></li>
                    <li><strong>LinkedIn</strong>: <a href="https://www.linkedin.com/in/panjidepari" target="_blank" rel="noopener noreferrer">linkedin.com/in/panjidepari</a></li>
                </ul>
            </section>

            <hr className="border-white/10" />
            <p className="text-zinc-500 text-xs text-center">
                Dengan menggunakan Layanan Howly, Anda menyatakan telah membaca dan memahami Kebijakan Privasi ini
                serta menyetujui pengumpulan dan penggunaan data sebagaimana diuraikan di atas.
            </p>
        </DocLayout>
    );
}
