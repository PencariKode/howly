# Howly Project
Proyek ini adalah sebuah inisiatif sederhana yang bertujuan untuk melatih dan meningkatkan keterampilan saya dalam bahasa pemrograman JavaScript, HTML, CSS, serta teknologi web modern seperti [NextJs](https://nextjs.org/), [ReactJs](https://react.dev/), [TailwindCSS](https://tailwindcss.com/). 

## Howly: The Werewolf Game
***Howly*** adalah permainan Werewolf klasik di mana para *warga* bekerja sama untuk menebak dan menyingkirkan semua *Werewolf* yang bersembunyi di antara mereka. Tantangannya adalah para warga tidak dapat mengetahui siapa di antara mereka yang sebenarnya adalah Werewolf. Oleh karena itu, warga harus menyusun strategi untuk mengungkap identitas para Werewolf, sementara Werewolf juga harus merancang taktik agar tidak ketahuan.<br><br>
Permainan berlangsung dalam dua fase: siang dan malam. Pada siang hari, warga melakukan diskusi dan voting untuk menentukan siapa yang akan dibunuh, dengan harapan bahwa yang terpilih adalah Werewolf. Sebaliknya, pada malam hari, warga harus *"tertidur"*, memberikan kesempatan bagi Werewolf untuk diam-diam memilih dan membunuh salah satu warga.


## Tujuan
Aplikasi ini dibuat dengan tujuan untuk mempermudah orang-orang dalam memainkan permainan klasik Werewolf secara luring (tatap muka), sehingga semua pemain, termasuk yang memiliki peran tertentu, dapat menjalankan tugasnya tanpa kesulitan.

## Struktur Proyek
1. ***Front-End***<br>
    * Dibangun menggunakan React.js dan Next.js untuk memastikan performa yang cepat dan pengembangan yang efisien.
    * Styling dikelola dengan TailwindCSS untuk kemudahan dalam pembuatan antarmuka yang responsif dan konsisten.<br><br>
2. ***Back-end***
    * Server-side events (SSE) digunakan untuk mendukung fitur real-time chat, sehingga memungkinkan komunikasi langsung antar pemain selama permainan berlangsung tanpa perlu polling yang intensif.
    * Dikembangkan dengan pendekatan API-first, memungkinkan komunikasi antara client dan server yang efisien.<br><br>
3. ***Teknologi Tambahan***
    * Node.js sebagai lingkungan server-side utama.
    * Vercel untuk penyebaran (deployment) front-end sementara berbasis Next.js (opsional).

## Pemasalahan
1. Kenapa saya membuat aplikasi web ini?
2. Apa kelebihan dari aplikasi ini?
3. Kenapa harus web?
4. Kenapa harus SSE (Server-side Events)?

### Jawaban
1. Saat pertama kali diterima di Universitas, para senior mengadakan acara temu ramah untuk para mahasiswa baru sebagai ajang perkenalan. Dalam acara tersebut, kami memainkan game Werewolf secara langsung. Saya mendapat peran sebagai warga, tetapi saya menyadari bahwa beberapa teman saya mengalami kesulitan menjalankan peran mereka, terutama yang memiliki tugas selain sebagai warga<br><br>
Misalnya, para Werewolf kesulitan berkomunikasi satu sama lain karena terbatas oleh jarak dan aturan permainan yang melarang mereka berbicara secara langsung agar tidak ketahuan.<br><br>
Oleh karena itu, saya mengembangkan aplikasi web ini untuk mempermudah jalannya permainan *Werewolf* ketika dimainkan secara luring.<br><br>
2. Kelebihan dari aplikasi ini terletak pada fitur-fitur yang dirancang untuk mempermudah jalannya permainan. Fitur-fitur tersebut meliputi:<br>
- **Real-time Chat**: Memungkinkan komunikasi langsung antara pemain selama permainan berlangsung.  
- **Random-pick Role**: Membantu pembagian peran secara acak dan adil tanpa intervensi manual.  
- **Aplikasi Berbasis Web**: Memberikan kemudahan akses dari berbagai perangkat, seperti komputer, tablet, maupun ponsel, tanpa perlu instalasi tambahan.<br>
Fitur-fitur ini menjadikan permainan lebih lancar, efisien, dan fleksibel untuk dimainkan kapan saja dan di mana saja.<br>
3. Dengan berbasis web, aplikasi ini dapat diakses dari berbagai perangkat, seperti komputer, tablet, maupun ponsel, tanpa perlu instalasi tambahan. Penggunaan web juga dipilih untuk menjaga kesederhanaan aplikasi, sehingga mudah digunakan oleh siapa saja tanpa mengurangi fungsionalitasnya.<br><br>
4. Aplikasi ini menggunakan Server-Side Event (SSE) untuk implementasi fitur chat, karena keterbatasan dana untuk menyewa hosting atau domain. Sebagai solusi, saya memanfaatkan Vercel, platform hosting gratis yang menyediakan layanan serverless.<br>
Namun, Vercel tidak mendukung komunikasi dua arah antara server dan client, seperti yang diperlukan oleh teknologi WebSocket. Oleh karena itu, saya memilih SSE sebagai alternatif untuk komunikasi server ke client. SSE memungkinkan server untuk mengirimkan update secara real-time kepada client tanpa memerlukan polling yang intensif.<br>
Selain itu, untuk komunikasi dari client ke server, saya menggunakan AJAX. Dengan demikian, kombinasi SSE untuk server ke client dan AJAX untuk client ke server memungkinkan aplikasi ini berjalan dengan baik meskipun menggunakan hosting gratis dengan keterbatasan komunikasi dua arah.

## Fitur Dalam Game
1. ***Real-Time Chat***
    > Aplikasi ini menyediakan fitur *chat* bawaan yang dirancang untuk memudahkan pemain dengan peran tertentu dalam berkomunikasi, sehingga mereka dapat menjalankan tugasnya dengan lebih efektif tanpa kendala.
2. ***In-game Voting***
    > Aplikasi ini mempermudah proses voting dengan menyediakan fitur voting bawaan, sehingga para pemain tidak perlu repot melakukan voting manual secara luring.
3. ***Built-in Rules and Roles***
    > Aplikasi ini menyederhanakan jalannya permainan dengan secara otomatis menentukan tugas dan kewajiban setiap pemain. Ketika permainan dimulai, setiap pemain akan langsung mengetahui peran mereka dan apa yang harus dilakukan tanpa perlu pengaturan manual.
4. ***Customizable Rules***
    > Aplikasi ini menawarkan fitur untuk mengubah aturan permainan agar bisa disesuaikan dengan kebutuhan setiap sesi permainan. Beberapa contoh aturan yang dapat diubah termasuk durasi diskusi siang hari, waktu voting, durasi diskusi malam hari, serta batasan jumlah peran tertentu yang dapat digunakan dalam permainan.
5. ***Gamemaster***
    > Dengan adanya fitur khusus untuk peran GameMaster (Moderator), aplikasi ini mempermudah tugas moderator dalam mengatur dan menjalankan permainan, sehingga alur permainan dapat berlangsung lebih lancar dan terorganisir.
6. ***Gamemaster Notifier***
    > Gamemaster akan menerima notifikasi atau pemberitahuan otomatis mengenai langkah-langkah yang harus dilakukan, sehingga memudahkan mereka dalam mengelola jalannya permainan dengan lebih terarah dan efisien.
7. ***Dan Lainnya***
    > Selain fitur-fitur yang telah disebutkan, aplikasi ini juga dilengkapi dengan berbagai fitur lain yang sedang dikembangkan atau direncanakan untuk ditambahkan di masa mendatang, guna meningkatkan pengalaman bermain secara keseluruhan.

### Daftar Role (sementara)
1. **Gamemaster** (X)
    > Role ini berfungsi sebagai moderator yang bertanggung jawab mengatur jalannya permainan. Role ini bersifat netral dan tidak berpihak kepada pihak mana pun. *Role ini tidak bermain*.
2. **Warga** (M)
    > Role ini merupakan role dasar tanpa kemampuan khusus. Satu-satunya tugasnya adalah berpartisipasi dalam voting untuk menentukan pemain yang akan dieliminasi pada  siang hari. *Berpihak pada Manusia*
3. **Peramal** (M)
    > Setiap malam, role ini memiliki kemampuan untuk melihat role pemain lainnya. Tugas utamanya adalah menemukan para Werewolf dan menyampaikan informasi tersebut pada siang hari. Namun, ia harus melakukannya dengan cara yang cermat dan strategis agar identitasnya tetap tersembunyi. *Berpihak pada Manusia*
4. **Penyihir** (M)
    > Setiap malam, role ini memiliki kemampuan untuk memberikan sebuah ramuan kepada pemain lain. Jika ramuan tersebut diberikan kepada seorang Werewolf, maka Werewolf tersebut akan mati. Namun, ramuan ini tidak akan berpengaruh pada manusia, kecuali jika pada malam yang sama manusia tersebut dibunuh oleh Werewolf. Dalam situasi tersebut, jika sang penyihir memberikan ramuannya kepada manusia yang terbunuh, maka manusia itu akan hidup kembali. *Berpihak pada Manusia*
5. **Dukun** (M)
    > Pada malam hari, role ini memiliki kemampuan untuk berkomunikasi dengan pemain yang sudah mati. Dengan informasi yang mereka peroleh, role ini dapat membantu mengungkap siapa sebenarnya Werewolf di antara para pemain yang masih hidup. *Berpihak pada Manusia*
6. **Raja** (M)
    > Setiap 2 hari sekali role ini dapat mengambil hak suara pemain lainnya sehingga role ini dapat memberikan vote sebanyak 2 kali pada hari yang sama. *Berpihak pada Manusia*
7. **Werewolf** (W)
    > Role ini merupakan antagonis utama dalam permainan. Tugas mereka adalah menyembunyikan identitas asli mereka agar tidak terungkap oleh pemain lainnya. Pada siang hari, mereka dapat berpartisipasi dalam diskusi dan memiliki hak suara seperti pemain lain. Namun, pada malam hari, mereka akan bangun secara diam-diam dan memilih satu manusia untuk dibunuh. *Berpihak pada Werewolf*
8. **Black Wolf** (W)
    > Role ini memiliki kesamaan dengan Werewolf pada umumnya, tetapi dengan kemampuan khusus. Satu kali pada malam tertentu, role ini dapat memilih satu manusia untuk diubah menjadi Werewolf, menambah jumlah sekutu mereka dalam permainan. *Berpihak pada Werewolf*
9. **Shapeshifter** (W)
    > Role ini memiliki kemampuan untuk berubah menjadi pemain lain yang mereka pilih untuk satu hari, sehingga mereka akan menjalani peran dan tugas pemain tersebut. Mereka juga dapat menggunakan fitur chat dengan identitas pemain tersebut. Namun, kemampuan ini terbatas dan hanya bisa digunakan beberapa kali selama permainan. Role ini tidak dapat berpartisipasi dalam memilih pemain yang akan dibunuh pada malam hari karena peran utamanya adalah membantu *Werewolf* dalam permainan. *Berpihak pada Werewolf*
