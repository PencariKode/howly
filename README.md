<div align="center">

# 🐺 Howly — The Werewolf Game

![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Permainan Werewolf klasik berbasis web — mainkan langsung dari browser!**

</div>

---

> [!NOTE]
> 🔄 Branch ini adalah **remake** dari branch original [`kuno`](https://github.com/PencariKode/howly/tree/kuno) karena adanya pergantian tech stack. Untuk melihat versi sebelumnya, silakan kunjungi branch [`kuno`](https://github.com/PencariKode/howly/tree/kuno).

---

## 📖 Tentang Proyek

Proyek ini adalah sebuah inisiatif sederhana yang bertujuan untuk melatih dan meningkatkan keterampilan saya dalam **JavaScript**, **HTML**, **CSS**, serta teknologi web modern seperti [Next.js](https://nextjs.org/), [React.js](https://react.dev/), dan [TailwindCSS](https://tailwindcss.com/).

## 🎮 Apa itu Howly?

**Howly** adalah permainan **Werewolf** klasik di mana para _warga_ bekerja sama untuk menebak dan menyingkirkan semua _Werewolf_ yang bersembunyi di antara mereka. Tantangannya? Para warga tidak tahu siapa di antara mereka yang sebenarnya adalah Werewolf!

> 🌞 **Siang Hari** — Warga melakukan diskusi dan voting untuk menentukan siapa yang akan dieliminasi.
>
> 🌙 **Malam Hari** — Warga harus _"tertidur"_, memberikan kesempatan bagi Werewolf untuk diam-diam memilih dan membunuh salah satu warga.

## 🎯 Tujuan

Aplikasi ini dibuat untuk **mempermudah** orang-orang dalam memainkan permainan klasik Werewolf secara **luring (tatap muka)**, sehingga semua pemain — termasuk yang memiliki peran tertentu — dapat menjalankan tugasnya tanpa kesulitan.

---

## 🏗️ Struktur Proyek

### ⚛️ Front-End

- Dibangun menggunakan **React.js** dan **Next.js** untuk performa yang cepat dan pengembangan yang efisien
- Styling dikelola dengan **TailwindCSS** untuk antarmuka yang responsif dan konsisten

### ⚙️ Back-End

- **Server-Side Events (SSE)** untuk mendukung fitur real-time chat tanpa polling yang intensif
- Pendekatan **API-first** untuk komunikasi client-server yang efisien

### 🔧 Teknologi Tambahan

- **Node.js** sebagai lingkungan server-side utama
- **Vercel** untuk deployment front-end berbasis Next.js _(opsional)_

---

## ✨ Fitur Dalam Game

|  #  | Fitur                      | Deskripsi                                                                                    |
| :-: | :------------------------- | :------------------------------------------------------------------------------------------- |
| 💬  | **Real-Time Chat**         | Fitur chat bawaan untuk memudahkan pemain dengan peran tertentu berkomunikasi secara efektif |
| 🗳️  | **In-game Voting**         | Fitur voting bawaan sehingga pemain tidak perlu melakukan voting manual secara luring        |
| 📜  | **Built-in Rules & Roles** | Otomatis menentukan tugas dan kewajiban setiap pemain saat permainan dimulai                 |
| ⚙️  | **Customizable Rules**     | Ubah durasi diskusi, waktu voting, batasan jumlah peran, dan lainnya sesuai kebutuhan        |
| 👑  | **Gamemaster**             | Fitur khusus untuk moderator agar alur permainan lebih lancar dan terorganisir               |
| 🔔  | **Gamemaster Notifier**    | Notifikasi otomatis untuk Gamemaster mengenai langkah-langkah yang harus dilakukan           |
| 🚀  | **Dan Lainnya**            | Berbagai fitur lain yang sedang dikembangkan untuk meningkatkan pengalaman bermain           |

---

## 🐺 Daftar Role

### 🟡 Netral

| Role              | Deskripsi                                                                                                 |
| :---------------- | :-------------------------------------------------------------------------------------------------------- |
| 👑 **Gamemaster** | Moderator yang mengatur jalannya permainan. Bersifat netral dan tidak berpihak. _Role ini tidak bermain._ |

### 🔵 Tim Manusia

| Role            | Deskripsi                                                                                                                       |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| 🧑‍🌾 **Warga**    | Role dasar tanpa kemampuan khusus. Berpartisipasi dalam voting siang hari untuk mengeliminasi pemain.                           |
| 🔮 **Peramal**  | Setiap malam dapat melihat role pemain lain. Tugasnya menemukan Werewolf dan menyampaikan info secara strategis tanpa ketahuan. |
| 🧪 **Penyihir** | Setiap malam dapat memberikan ramuan — membunuh Werewolf, atau menghidupkan kembali manusia yang terbunuh pada malam itu.       |
| 👻 **Dukun**    | Dapat berkomunikasi dengan pemain yang sudah mati pada malam hari untuk mengungkap identitas Werewolf.                          |
| 🤴 **Raja**     | Setiap 2 hari sekali dapat mengambil hak suara pemain lain dan memberikan vote 2× pada hari yang sama.                          |

### 🔴 Tim Werewolf

| Role                 | Deskripsi                                                                                                                                 |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| 🐺 **Werewolf**      | Antagonis utama. Menyembunyikan identitas di siang hari, dan memilih satu manusia untuk dibunuh pada malam hari.                          |
| 🐺‍⬛ **Black Wolf** | Seperti Werewolf, tetapi satu kali dapat mengubah seorang manusia menjadi Werewolf.                                                       |
| 🎭 **Shapeshifter**  | Dapat berubah menjadi pemain lain selama satu hari, menjalani peran & chat sebagai pemain tersebut. Tidak ikut memilih korban malam hari. |

---

## ❓ FAQ

<details>
<summary><b>Kenapa saya membuat aplikasi web ini?</b></summary>

Saat pertama kali diterima di Universitas, para senior mengadakan acara temu ramah dan kami bermain Werewolf secara langsung. Saya menyadari bahwa beberapa teman mengalami kesulitan menjalankan peran mereka — misalnya, Werewolf kesulitan berkomunikasi satu sama lain karena terbatas oleh jarak dan aturan permainan.

Dari pengalaman itu, saya mengembangkan aplikasi web ini untuk **mempermudah jalannya permainan Werewolf** ketika dimainkan secara luring.

</details>

<details>
<summary><b>Apa kelebihan dari aplikasi ini?</b></summary>

- 💬 **Real-time Chat** — Komunikasi langsung antar pemain selama permainan
- 🎲 **Random-pick Role** — Pembagian peran secara acak dan adil tanpa intervensi manual
- 🌐 **Berbasis Web** — Akses dari komputer, tablet, maupun ponsel tanpa instalasi tambahan

Fitur-fitur ini menjadikan permainan lebih lancar, efisien, dan fleksibel!

</details>

<details>
<summary><b>Kenapa harus web?</b></summary>

Dengan berbasis web, aplikasi ini dapat diakses dari **berbagai perangkat** tanpa perlu instalasi tambahan. Penggunaan web juga dipilih untuk menjaga **kesederhanaan** aplikasi, sehingga mudah digunakan oleh siapa saja.

</details>

<details>
<summary><b>Kenapa harus SSE (Server-Side Events)?</b></summary>

Karena keterbatasan dana untuk hosting, saya memanfaatkan **Vercel** (platform hosting gratis dengan layanan serverless). Namun, Vercel tidak mendukung komunikasi dua arah seperti **WebSocket**.

Solusinya:

- ⬇️ **Server → Client**: menggunakan **SSE** untuk update real-time
- ⬆️ **Client → Server**: menggunakan **AJAX**

Kombinasi ini memungkinkan aplikasi berjalan dengan baik meskipun menggunakan hosting gratis!

</details>

---

<div align="center">

**Made with ❤️ by [PencariKode](https://github.com/PencariKode)**

</div>
