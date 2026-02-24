import DocLayout from "@c/DocLayout";

export default function ContributingPage() {
    return (
        <DocLayout
            title="Contributing to Howly"
            subtitle="Panduan untuk berkontribusi dalam pengembangan Howly"
            updated="24 Februari 2026"
        >
            <section className="flex flex-col gap-3">
                <p>
                    Terima kasih sudah tertarik untuk berkontribusi di Howly! Dokumen ini berisi panduan singkat untuk
                    membantu kamu memulai.
                </p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>Tech Stack</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Layer</th>
                            <th>Teknologi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>Framework</td><td>Next.js 16 (App Router)</td></tr>
                        <tr><td>Runtime</td><td>Bun</td></tr>
                        <tr><td>Language</td><td>TypeScript</td></tr>
                        <tr><td>Styling</td><td>Tailwind CSS v4</td></tr>
                        <tr><td>Database</td><td>PostgreSQL + Prisma ORM</td></tr>
                        <tr><td>Auth</td><td>NextAuth v4 (Google, GitHub, Credentials)</td></tr>
                        <tr><td>State</td><td>Zustand</td></tr>
                        <tr><td>Icons</td><td>FontAwesome Pro</td></tr>
                        <tr><td>Real-time</td><td>Server-Side Events (SSE)</td></tr>
                        <tr><td>Hosting</td><td>Vercel (serverless)</td></tr>
                    </tbody>
                </table>
            </section>

            <section className="flex flex-col gap-3">
                <h2>Persyaratan</h2>
                <p>Pastikan kamu sudah menginstal:</p>
                <ul>
                    <li><strong>Bun</strong> (v1.0+) — <a href="https://bun.sh" target="_blank" rel="noopener noreferrer">bun.sh</a></li>
                    <li><strong>Node.js</strong> (v18+) — diperlukan oleh beberapa tooling</li>
                    <li><strong>PostgreSQL</strong> — database lokal atau remote</li>
                    <li><strong>Git</strong></li>
                </ul>
            </section>

            <section className="flex flex-col gap-3">
                <h2>Setup Lokal</h2>

                <h3>1. Fork dan clone repository</h3>
                <pre><code>git clone https://github.com/&lt;username-kamu&gt;/howly.git{ '\n' }cd howly</code></pre>

                <h3>2. Install dependencies</h3>
                <pre><code>bun install</code></pre>

                <h3>3. Setup environment variables</h3>
                <p>Salin file <code>.env.example</code> lalu isi variabel yang diperlukan:</p>
                <pre><code>{ `# Database
DATABASE_URL="postgresql://user:password@localhost:5432/howly"

# NextAuth
NEXTAUTH_SECRET="random-secret-string"
NEXTAUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""`}</code></pre>

                <h3>4. Setup database</h3>
                <pre><code>{ `bunx prisma db push
# atau jika sudah ada migration:
bunx prisma migrate dev`}</code></pre>

                <h3>5. Jalankan dev server</h3>
                <pre><code>bun run dev</code></pre>
                <p>Buka <code>http://localhost:3000</code> di browser.</p>
            </section>

            <section className="flex flex-col gap-3">
                <h2>Struktur Projek</h2>
                <pre><code>{ `howly/
├── src/
│   ├── app/              # Next.js App Router (halaman & API routes)
│   ├── components/       # Komponen React reusable
│   ├── lib/              # Utility functions & Prisma client
│   ├── stores/           # Zustand stores (state management)
│   ├── types/            # TypeScript type definitions
│   └── fonts.ts          # Font configuration
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
├── auth.ts               # NextAuth configuration
├── next.config.ts        # Next.js config
└── tsconfig.json         # TypeScript config (path aliases)`}</code></pre>

                <h3>Path Aliases</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Alias</th>
                            <th>Path</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td><code>@c</code></td><td><code>src/components</code></td></tr>
                        <tr><td><code>@l</code></td><td><code>src/lib</code></td></tr>
                        <tr><td><code>@t</code></td><td><code>src/types</code></td></tr>
                        <tr><td><code>@/</code></td><td><code>src/</code></td></tr>
                    </tbody>
                </table>
            </section>

            <section className="flex flex-col gap-3">
                <h2>Konvensi Kode</h2>

                <h3>Umum</h3>
                <ul>
                    <li>Gunakan <strong>TypeScript</strong> untuk semua file baru</li>
                    <li>Komponen React menggunakan <strong>function component</strong> (bukan class)</li>
                    <li>State management menggunakan <strong>Zustand</strong> — hindari prop drilling yang terlalu dalam</li>
                    <li>Styling menggunakan <strong>Tailwind CSS</strong> — hindari inline CSS kecuali untuk nilai dinamis</li>
                </ul>

                <h3>Penamaan File</h3>
                <ul>
                    <li>Komponen: <code>PascalCase.tsx</code> (e.g. <code>MainContainer.tsx</code>)</li>
                    <li>Halaman: <code>page.tsx</code> di dalam folder route</li>
                    <li>Utility: <code>camelCase.ts</code> (e.g. <code>prisma.ts</code>)</li>
                    <li>Types: <code>camelCase.ts</code> di folder <code>types/</code></li>
                </ul>

                <h3>Design System</h3>
                <ul>
                    <li>Background utama: <code>bg-hl-bg</code> (<code>#09090c</code>)</li>
                    <li>Text utama: <code>text-hl-text</code> (<code>#ededed</code>)</li>
                    <li>Card/panel: <code>bg-glass/85</code> (<code>#191923D9</code>) dengan border <code>border-glass-border/60</code> (<code>#29293899</code>)</li>
                    <li>Aksen utama: <code>rose-400</code> / <code>rose-500</code></li>
                    <li>Transisi: <code>transition-all duration-200</code> atau <code>duration-300</code></li>
                </ul>
            </section>

            <section className="flex flex-col gap-3">
                <h2>Cara Berkontribusi</h2>

                <h3>1. Cari atau buat Issue</h3>
                <p>
                    Sebelum mulai ngoding, cek dulu apakah sudah ada issue terkait di GitHub. Kalau belum ada,
                    buat issue baru dan jelaskan apa yang ingin kamu kerjakan.
                </p>

                <h3>2. Buat branch baru</h3>
                <pre><code>{ `git checkout -b feat/nama-fitur
# atau
git checkout -b fix/nama-bug`}</code></pre>
                <p>Gunakan prefix:</p>
                <ul>
                    <li><code>feat/</code> — fitur baru</li>
                    <li><code>fix/</code> — perbaikan bug</li>
                    <li><code>refactor/</code> — refactoring tanpa perubahan fungsional</li>
                    <li><code>docs/</code> — perubahan dokumentasi</li>
                    <li><code>style/</code> — perubahan tampilan/CSS</li>
                </ul>

                <h3>3. Kerjakan perubahanmu</h3>
                <ul>
                    <li>Pastikan kode bisa di-build tanpa error: <code>bun run build</code></li>
                    <li>Pastikan lint bersih: <code>bun run lint</code></li>
                    <li>Test secara lokal di browser</li>
                </ul>

                <h3>4. Commit</h3>
                <p>Gunakan format <a href="https://www.conventionalcommits.org/" target="_blank" rel="noopener noreferrer">Conventional Commits</a>:</p>
                <pre><code>{ `feat: tambah fitur chat notifikasi
fix: perbaiki layout FAQ di mobile
refactor: pindahkan logic auth ke helper
docs: update README bagian setup
style: sesuaikan spacing section role`}</code></pre>

                <h3>5. Push dan buat Pull Request</h3>
                <pre><code>git push origin feat/nama-fitur</code></pre>
                <p>Lalu buat Pull Request di GitHub. Jelaskan:</p>
                <ul>
                    <li>Apa yang berubah</li>
                    <li>Kenapa perubahan ini diperlukan</li>
                    <li>Screenshot (kalau ada perubahan UI)</li>
                </ul>
            </section>

            <section className="flex flex-col gap-3">
                <h2>Area yang Butuh Kontribusi</h2>
                <ul>
                    <li><strong>Game Logic</strong> — Implementasi mekanisme permainan (diskusi, voting, eliminasi, fase malam)</li>
                    <li><strong>Real-time Features</strong> — SSE untuk chat dan notifikasi dalam game</li>
                    <li><strong>Role Abilities</strong> — Implementasi kemampuan khusus setiap role</li>
                    <li><strong>UI/UX</strong> — Perbaikan tampilan, responsivitas, animasi</li>
                    <li><strong>Testing</strong> — Unit test dan integration test</li>
                    <li><strong>Dokumentasi</strong> — Perbaikan dan penambahan dokumentasi</li>
                    <li><strong>Bug Fixes</strong> — Cek tab Issues di GitHub</li>
                </ul>
            </section>

            <section className="flex flex-col gap-3">
                <h2>Catatan Penting</h2>
                <ul>
                    <li><strong>FontAwesome Pro</strong>: Kamu perlu punya lisensi sendiri atau gunakan icon free sebagai alternatif saat develop.</li>
                    <li><strong>Environment Variables</strong>: Jangan pernah commit file <code>.env</code> atau <code>.env.local</code>. Gunakan <code>.env.example</code> sebagai referensi.</li>
                    <li><strong>Database</strong>: Jangan modifikasi schema Prisma tanpa diskusi terlebih dahulu di issue.</li>
                    <li><strong>SSE, bukan WebSocket</strong>: Karena deploy di Vercel (serverless), kita menggunakan SSE untuk server-to-client dan AJAX untuk client-to-server.</li>
                </ul>
            </section>

            <section className="flex flex-col gap-3">
                <h2>Pertanyaan?</h2>
                <p>Kalau ada pertanyaan atau butuh bantuan, silakan:</p>
                <ul>
                    <li>Buka issue baru di <a href="https://github.com/PencariKode/howly" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                    <li>Hubungi via email: <a href="mailto:pencaricode@gmail.com">pencaricode@gmail.com</a></li>
                    <li>Atau lewat LinkedIn: <a href="https://www.linkedin.com/in/panjidepari" target="_blank" rel="noopener noreferrer">panjidepari</a></li>
                </ul>
                <p>Terima kasih sudah berkontribusi!</p>
            </section>
        </DocLayout>
    );
}
