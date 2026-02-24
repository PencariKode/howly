# Contributing to Howly

Terima kasih sudah tertarik untuk berkontribusi di Howly! Dokumen ini berisi panduan singkat untuk membantu kamu memulai.

---

## Tech Stack

| Layer     | Teknologi                                 |
| --------- | ----------------------------------------- |
| Framework | Next.js 16 (App Router)                   |
| Runtime   | Bun                                       |
| Language  | TypeScript                                |
| Styling   | Tailwind CSS v4                           |
| Database  | PostgreSQL + Prisma ORM                   |
| Auth      | NextAuth v4 (Google, GitHub, Credentials) |
| State     | Zustand                                   |
| Icons     | FontAwesome Pro                           |
| Real-time | Server-Side Events (SSE)                  |
| Hosting   | Vercel (serverless)                       |

---

## Persyaratan

Pastikan kamu sudah menginstal:

- **Bun** (v1.0+) — [bun.sh](https://bun.sh)
- **Node.js** (v18+) — diperlukan oleh beberapa tooling
- **PostgreSQL** — database lokal atau remote
- **Git**

---

## Setup Lokal

### 1. Fork dan clone repository

```bash
git clone https://github.com/<username-kamu>/howly.git
cd howly
```

### 2. Install dependencies

```bash
bun install
```

### 3. Setup environment variables

Salin file `.env.example` (atau buat `.env.local`) dan isi variabel yang diperlukan:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/howly"

# NextAuth
NEXTAUTH_SECRET="random-secret-string"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

### 4. Setup database

```bash
bunx prisma db push
# atau jika sudah ada migration:
bunx prisma migrate dev
```

### 5. Jalankan dev server

```bash
bun run dev
```

Buka `http://localhost:3000` di browser.

---

## Struktur Projek

```
howly/
├── src/
│   ├── app/              # Next.js App Router (halaman & API routes)
│   │   ├── page.tsx       # Homepage
│   │   ├── docs/          # Halaman dokumentasi/about
│   │   ├── create/        # Buat room baru
│   │   ├── join/          # Join room
│   │   ├── login/         # Halaman login
│   │   ├── register/      # Halaman register
│   │   ├── profile/       # Halaman profil
│   │   └── api/           # API routes
│   ├── components/        # Komponen React reusable
│   ├── lib/               # Utility functions & Prisma client
│   ├── stores/            # Zustand stores (state management)
│   ├── types/             # TypeScript type definitions
│   └── fonts.ts           # Font configuration
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets
├── auth.ts                # NextAuth configuration
├── next.config.ts         # Next.js config
└── tsconfig.json          # TypeScript config (ada path aliases)
```

### Path Aliases

Projek ini menggunakan path alias yang didefinisikan di `tsconfig.json`:

| Alias | Path             |
| ----- | ---------------- |
| `@c`  | `src/components` |
| `@l`  | `src/lib`        |
| `@t`  | `src/types`      |
| `@/`  | `src/`           |

Contoh:

```tsx
import MainContainer from "@c/MainContainer";
import { prisma } from "@l/prisma";
```

---

## Konvensi Kode

### Umum

- Gunakan **TypeScript** untuk semua file baru
- Komponen React menggunakan **function component** (bukan class)
- State management menggunakan **Zustand** — hindari prop drilling yang terlalu dalam
- Styling menggunakan **Tailwind CSS** — hindari inline CSS kecuali untuk nilai dinamis (e.g. rgba, gradient)

### Penamaan File

- Komponen: `PascalCase.tsx` (e.g. `MainContainer.tsx`)
- Halaman: `page.tsx` di dalam folder route
- Utility: `camelCase.ts` (e.g. `prisma.ts`)
- Types: `camelCase.ts` di folder `types/`

### Design System

Projek ini menggunakan theme dark glassmorphism. Beberapa hal yang perlu diperhatikan:

- Background utama: `bg-hl-bg` (`#09090c`)
- Text utama: `text-hl-text` (`#ededed`)
- Card/panel: Gunakan style `auth-card` atau `rgba(25, 25, 35, 0.85)` dengan border `rgba(41, 41, 56, 0.6)`
- Aksen utama: `rose-400` / `rose-500`
- Transisi: Selalu gunakan `transition-all duration-200` atau `duration-300`

---

## Cara Berkontribusi

### 1. Cari atau buat Issue

Sebelum mulai ngoding, cek dulu apakah sudah ada issue terkait di GitHub. Kalau belum ada, buat issue baru dan jelaskan apa yang ingin kamu kerjakan.

### 2. Buat branch baru

```bash
git checkout -b feat/nama-fitur
# atau
git checkout -b fix/nama-bug
```

Gunakan prefix:

- `feat/` — fitur baru
- `fix/` — perbaikan bug
- `refactor/` — refactoring tanpa perubahan fungsional
- `docs/` — perubahan dokumentasi
- `style/` — perubahan tampilan/CSS

### 3. Kerjakan perubahanmu

- Pastikan kode bisa di-build tanpa error: `bun run build`
- Pastikan lint bersih: `bun run lint`
- Test secara lokal di browser

### 4. Commit

Gunakan format [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: tambah fitur chat notifikasi
fix: perbaiki layout FAQ di mobile
refactor: pindahkan logic auth ke helper
docs: update README bagian setup
style: sesuaikan spacing section role
```

### 5. Push dan buat Pull Request

```bash
git push origin feat/nama-fitur
```

Lalu buat Pull Request di GitHub. Jelaskan:

- Apa yang berubah
- Kenapa perubahan ini diperlukan
- Screenshot (kalau ada perubahan UI)

---

## Area yang Butuh Kontribusi

Berikut beberapa area yang terbuka untuk kontribusi:

- **Game Logic** — Implementasi mekanisme permainan (diskusi, voting, eliminasi, fase malam)
- **Real-time Features** — SSE untuk chat dan notifikasi dalam game
- **Role Abilities** — Implementasi kemampuan khusus setiap role (Peramal, Penyihir, dll.)
- **UI/UX** — Perbaikan tampilan, responsivitas, animasi
- **Testing** — Unit test dan integration test
- **Dokumentasi** — Perbaikan dan penambahan dokumentasi
- **Bug Fixes** — Cek tab Issues di GitHub

---

## Catatan Penting

- **FontAwesome Pro**: Projek ini menggunakan FontAwesome Pro. Kamu perlu punya lisensi sendiri atau gunakan icon free sebagai alternatif saat develop.
- **Environment Variables**: Jangan pernah commit file `.env` atau `.env.local`. Gunakan `.env.example` sebagai referensi.
- **Database**: Jangan modifikasi schema Prisma tanpa diskusi terlebih dahulu di issue.
- **SSE, bukan WebSocket**: Karena deploy di Vercel (serverless), kita menggunakan SSE untuk server-to-client dan AJAX untuk client-to-server. Jangan gunakan WebSocket.

---

## Pertanyaan?

Kalau ada pertanyaan atau butuh bantuan, silakan:

- Buka issue baru di GitHub
- Hubungi via email: pencaricode@gmail.com
- Atau lewat LinkedIn: [panjidepari](https://www.linkedin.com/in/panjidepari)

Terima kasih sudah berkontribusi!
