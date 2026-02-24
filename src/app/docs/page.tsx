'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPawClaws,
    faComments,
    faBoxBallot,
    faBookSparkles,
    faGears,
    faCrown,
    faBellOn,
    faRocketLaunch,
    faChevronDown,
    faMailboxOpenLetter,
    faMessageQuestion,
    faUserGear,
    faMicrochip,
    faCircleStar,
    faGamepadAlt,
    faSunAlt,
    faCircleMoon,
    faBullseyeArrow,
    faUserCrown,
    faUserAlt,
    faCrystalBall,
    faFlaskRoundPotion,
    faBookSkull,
    faBadgeSheriff,
    faMasksTheater,
    faCircle,
} from "@fortawesome/pro-solid-svg-icons";
import {
    faReact,
    faNodeJs,
    faGithub,
    faLinkedinIn,
    faInstagram,
    faWolfPackBattalion,
} from "@fortawesome/free-brands-svg-icons";
import {
    faCode,
    faPaintbrushPencil,
    faSatelliteDish,
    faServer,
    faEnvelope,
} from "@fortawesome/pro-light-svg-icons";
import Link from "next/link";
import MainContainer from "@c/MainContainer";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const features = [
    { icon: faComments, name: 'Real-Time Chat', desc: 'Fitur chat bawaan untuk memudahkan pemain dengan peran tertentu berkomunikasi secara efektif.' },
    { icon: faBoxBallot, name: 'In-game Voting', desc: 'Fitur voting bawaan sehingga pemain tidak perlu melakukan voting manual secara luring.' },
    { icon: faBookSparkles, name: 'Built-in Rules & Roles', desc: 'Otomatis menentukan tugas dan kewajiban setiap pemain saat permainan dimulai.' },
    { icon: faGears, name: 'Customizable Rules', desc: 'Ubah durasi diskusi, waktu voting, batasan jumlah peran, dan lainnya sesuai kebutuhan.' },
    { icon: faCrown, name: 'Gamemaster', desc: 'Fitur khusus untuk moderator agar alur permainan lebih lancar dan terorganisir.' },
    { icon: faBellOn, name: 'Gamemaster Notifier', desc: 'Notifikasi otomatis untuk Gamemaster mengenai langkah-langkah yang harus dilakukan.' },
    { icon: faRocketLaunch, name: 'Dan Lainnya...', desc: 'Berbagai fitur lain yang sedang dikembangkan untuk meningkatkan pengalaman bermain.' },
];

const techStack = [
    { icon: faReact, name: 'React & Next.js', desc: 'Performa cepat & pengembangan efisien' },
    { icon: faPaintbrushPencil, name: 'TailwindCSS', desc: 'Antarmuka responsif & konsisten' },
    { icon: faSatelliteDish, name: 'Server-Side Events', desc: 'Real-time chat tanpa polling intensif' },
    { icon: faNodeJs, name: 'Node.js', desc: 'Lingkungan server-side utama' },
    { icon: faServer, name: 'Vercel', desc: 'Deployment serverless' },
    { icon: faCode, name: 'API-first', desc: 'Komunikasi client-server yang efisien' },
];

const rolesDataFa = {
    netral: [
        { icon: faBadgeSheriff, name: 'Gamemaster', desc: 'Moderator yang mengatur jalannya permainan. Bersifat netral dan tidak berpihak. Role ini tidak bermain.' },
    ],
    manusia: [
        { icon: faUserAlt, name: 'Warga', desc: 'Role dasar tanpa kemampuan khusus. Berpartisipasi dalam voting siang hari untuk mengeliminasi pemain.' },
        { icon: faCrystalBall, name: 'Peramal', desc: 'Setiap malam dapat melihat role pemain lain. Tugasnya menemukan Werewolf dan menyampaikan info secara strategis.' },
        { icon: faFlaskRoundPotion, name: 'Penyihir', desc: 'Setiap malam dapat memberikan ramuan — membunuh Werewolf, atau menghidupkan kembali manusia yang terbunuh.' },
        { icon: faBookSkull, name: 'Dukun', desc: 'Dapat berkomunikasi dengan pemain yang sudah mati pada malam hari untuk mengungkap identitas Werewolf.' },
        { icon: faUserCrown, name: 'Raja', desc: 'Setiap 2 hari sekali dapat mengambil hak suara pemain lain dan memberikan vote 2× pada hari yang sama.' },
    ],
    werewolf: [
        { icon: faPawClaws, name: 'Werewolf', desc: 'Antagonis utama. Menyembunyikan identitas di siang hari, dan memilih satu manusia untuk dibunuh pada malam hari.' },
        { icon: faWolfPackBattalion, name: 'Black Wolf', desc: 'Seperti Werewolf, tetapi satu kali dapat mengubah seorang manusia menjadi Werewolf.' },
        { icon: faMasksTheater, name: 'Shapeshifter', desc: 'Dapat berubah menjadi pemain lain selama satu hari, menjalani peran & chat sebagai pemain tersebut.' },
    ],
};

const faqItems = [
    {
        question: 'Kenapa membuat aplikasi web ini?',
        answer: 'Saat pertama kali diterima di Universitas, para senior mengadakan acara temu ramah dan kami bermain Werewolf secara langsung. Beberapa teman mengalami kesulitan menjalankan peran mereka — misalnya, Werewolf kesulitan berkomunikasi karena terbatas oleh jarak dan aturan permainan. Dari pengalaman itu, aplikasi web ini dikembangkan untuk mempermudah jalannya permainan Werewolf ketika dimainkan secara luring.',
    },
    {
        question: 'Apa kelebihan dari aplikasi ini?',
        answer: 'Real-time Chat untuk komunikasi langsung, Random-pick Role untuk pembagian peran secara acak dan adil, serta berbasis Web sehingga bisa diakses dari berbagai perangkat tanpa instalasi tambahan.',
    },
    {
        question: 'Kenapa harus web?',
        answer: 'Dengan berbasis web, aplikasi ini dapat diakses dari berbagai perangkat tanpa perlu instalasi tambahan. Penggunaan web juga dipilih untuk menjaga kesederhanaan aplikasi, sehingga mudah digunakan oleh siapa saja.',
    },
    {
        question: 'Kenapa harus SSE (Server-Side Events)?',
        answer: 'Karena keterbatasan dana untuk hosting, digunakan Vercel (platform hosting gratis dengan layanan serverless). Vercel tidak mendukung komunikasi dua arah seperti WebSocket, sehingga SSE digunakan untuk server-to-client dan AJAX untuk client-to-server.',
    },
];


function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [open, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    const updateHeight = useCallback(() => {
        if (contentRef.current) setHeight(contentRef.current.scrollHeight);
    }, []);

    useEffect(() => {
        updateHeight();
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, [updateHeight]);

    return (
        <div
            className="rounded-lg overflow-hidden transition-all duration-300 bg-glass/85 border border-glass-border/60"
        >
            <button
                onClick={ () => setOpen(!open) }
                className="w-full flex items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4 text-left cursor-pointer transition-colors duration-200 hover:bg-white/[0.03]"
            >
                <span className="font-medium text-zinc-200 text-[.85rem] sm:text-[.95rem] pr-4">{ question }</span>
                <FontAwesomeIcon
                    icon={ faChevronDown }
                    className={ `text-zinc-500 text-[.65rem] shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}` }
                />
            </button>
            <div
                ref={ contentRef }
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={ { maxHeight: open ? `${height}px` : '0px', opacity: open ? 1 : 0 } }
            >
                <p className="px-4 pb-4 sm:px-5 sm:pb-5 text-[.8rem] sm:text-sm text-zinc-400 leading-relaxed">{ answer }</p>
            </div>
        </div>
    );
}


function RoleCardFa({ icon, name, desc, borderColor }: { icon: IconProp; name: string; desc: string; borderColor: string }) {
    return (
        <div
            className="rounded-lg px-4 py-3 flex gap-3 items-start transition-all duration-200 hover:bg-white/[0.02] bg-glass/70 border"
            style={ { borderColor: borderColor } }
        >
            <span className="text-lg sm:text-xl mt-0.5 shrink-0"><FontAwesomeIcon icon={ icon } /></span>
            <div className="min-w-0">
                <p className="font-semibold text-zinc-100 text-[.85rem] sm:text-sm">{ name }</p>
                <p className="text-[.75rem] sm:text-xs text-zinc-400 leading-relaxed mt-0.5">{ desc }</p>
            </div>
        </div>
    );
}

export default function AboutPage() {
    return (
        <MainContainer>
            <div className="flex flex-col items-center w-full max-w-3xl mx-auto gap-y-8 sm:gap-y-12 pt-8 sm:pt-16">

                <section className="flex flex-col items-center text-center gap-3 px-2" id="about">
                    <div className="flex items-center gap-2.5 text-3xl sm:text-4xl font-extrabold">
                        <FontAwesomeIcon icon={ faPawClaws } className="text-2xl sm:text-3xl text-rose-500 flicker" />
                        <h1>Howly</h1>
                    </div>
                    <p className="text-zinc-400 text-sm sm:text-base max-w-sm leading-relaxed">
                        Permainan <span className="text-rose-400 font-semibold">Werewolf</span> klasik berbasis web — mainkan langsung dari browser!
                    </p>
                    <div className="flex gap-2.5 mt-3">
                        <Link
                            href="/create"
                            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px active:translate-y-0 bg-gradient-to-br from-[#6B1525] to-[#A63445] border border-rose-accent/40"
                        >
                            Mulai Bermain
                        </Link>
                        <a
                            href="https://github.com/PencariKode/howly"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-zinc-300 transition-all duration-200 hover:-translate-y-px hover:text-white active:translate-y-0 flex items-center gap-2 bg-glass-border/60 border border-zinc-700/50"
                        >
                            <FontAwesomeIcon icon={ faGithub } /> GitHub
                        </a>
                    </div>
                </section>


                <section
                    className="w-full rounded-xl p-5 sm:p-7 flex flex-col gap-4 bg-glass/85 border border-glass-border/60 shadow-[0_8px_32px_-8px] shadow-black/30"
                >
                    <h2 className="text-lg sm:text-xl font-bold text-white"><FontAwesomeIcon icon={ faGamepadAlt } /> Apa itu Howly?</h2>
                    <p className="text-[.82rem] sm:text-sm text-zinc-300 leading-relaxed">
                        <strong className="text-zinc-100">Howly</strong> adalah permainan <em className="text-rose-400 not-italic font-medium">Werewolf</em> klasik di mana para warga bekerja sama untuk menebak dan menyingkirkan semua Werewolf yang bersembunyi di antara mereka.
                        Tantangannya? Para warga tidak tahu siapa di antara mereka yang sebenarnya adalah Werewolf!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                        <div className="flex-1 flex gap-3 items-start rounded-lg px-3.5 py-3 bg-[#EAB3080D] border border-[#EAB3081F]">
                            <span className="text-xl mt-px shrink-0 text-amber-300"><FontAwesomeIcon icon={ faSunAlt } /></span>
                            <div>
                                <p className="font-semibold text-amber-300 text-[.82rem]">Siang Hari</p>
                                <p className="text-[.75rem] text-zinc-400 mt-0.5 leading-relaxed">Warga melakukan diskusi dan voting untuk menentukan siapa yang akan dieliminasi.</p>
                            </div>
                        </div>
                        <div className="flex-1 flex gap-3 items-start rounded-lg px-3.5 py-3 bg-[#6366F10D] border border-[#6366F11F]">
                            <span className="text-xl mt-px shrink-0 text-indigo-300"><FontAwesomeIcon icon={ faCircleMoon } /></span>
                            <div>
                                <p className="font-semibold text-indigo-300 text-[.82rem]">Malam Hari</p>
                                <p className="text-[.75rem] text-zinc-400 mt-0.5 leading-relaxed">Warga harus &quot;tertidur&quot;, memberikan kesempatan bagi Werewolf untuk membunuh salah satu warga.</p>
                            </div>
                        </div>
                    </div>
                </section>


                <section
                    className="w-full rounded-xl p-5 sm:p-7 flex flex-col gap-3 bg-glass/85 border border-glass-border/60 shadow-[0_8px_32px_-8px] shadow-black/30"
                >
                    <h2 className="text-lg sm:text-xl font-bold text-white"><FontAwesomeIcon icon={ faBullseyeArrow } className="text-rose-500" /> Tujuan</h2>
                    <p className="text-[.82rem] sm:text-sm text-zinc-300 leading-relaxed">
                        Aplikasi ini dibuat untuk <strong className="text-zinc-100">mempermudah</strong> orang-orang dalam memainkan permainan klasik Werewolf secara <strong className="text-zinc-100">luring (tatap muka)</strong>, sehingga semua pemain — termasuk yang memiliki peran tertentu — dapat menjalankan tugasnya tanpa kesulitan.
                    </p>
                </section>


                <section className="w-full flex flex-col gap-4">
                    <h2 className="text-lg sm:text-xl font-bold text-white text-center"><FontAwesomeIcon icon={ faCircleStar } /> Fitur Dalam Game</h2>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2.5">
                        { features.map((f, i) => (
                            <div
                                key={ i }
                                className="w-full sm:w-[calc(50%-5px)] rounded-lg px-4 py-3.5 flex gap-3 items-start transition-all duration-200 hover:bg-white/[0.02] bg-glass/70 border border-glass-border/50"
                            >
                                <FontAwesomeIcon icon={ f.icon } className="text-rose-400 text-base mt-0.5 min-w-4 shrink-0" />
                                <div className="min-w-0">
                                    <p className="font-semibold text-zinc-100 text-[.82rem] sm:text-sm">{ f.name }</p>
                                    <p className="text-[.75rem] sm:text-xs text-zinc-400 mt-0.5 leading-relaxed">{ f.desc }</p>
                                </div>
                            </div>
                        )) }
                    </div>
                </section>


                <section className="w-full flex flex-col gap-4">
                    <h2 className="text-lg sm:text-xl font-bold text-white text-center"><FontAwesomeIcon icon={ faMicrochip } /> Tech Stack</h2>
                    <div className="flex flex-wrap gap-2.5">
                        { techStack.map((t, i) => (
                            <div
                                key={ i }
                                className="w-[calc(50%-5px)] sm:w-[calc(33.333%-7px)] rounded-lg px-3 py-4 flex flex-col items-center text-center gap-1.5 transition-all duration-200 hover:bg-white/[0.02] bg-glass/70 border border-glass-border/50"
                            >
                                <FontAwesomeIcon icon={ t.icon } className="text-rose-400 text-xl" />
                                <p className="font-semibold text-zinc-100 text-[.75rem] sm:text-[.82rem]">{ t.name }</p>
                                <p className="text-[.65rem] sm:text-xs text-zinc-500 leading-snug">{ t.desc }</p>
                            </div>
                        )) }
                    </div>
                </section>


                <section className="w-full flex flex-col gap-5">
                    <h2 className="text-lg sm:text-xl font-bold text-white text-center"><FontAwesomeIcon icon={ faUserGear } /> Daftar Role</h2>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-xs font-bold text-yellow-400/80 uppercase tracking-widest px-0.5"><FontAwesomeIcon icon={ faCircle } /> Netral</h3>
                        { rolesDataFa.netral.map((r, i) => (
                            <RoleCardFa key={ i } { ...r } borderColor="#EAB3081F" />
                        )) }
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-xs font-bold text-cyan-400/80 uppercase tracking-widest px-0.5"><FontAwesomeIcon icon={ faCircle } /> Tim Manusia</h3>
                        { rolesDataFa.manusia.map((r, i) => (
                            <RoleCardFa key={ i } { ...r } borderColor="#0891B21F" />
                        )) }
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-xs font-bold text-red-400/80 uppercase tracking-widest px-0.5"><FontAwesomeIcon icon={ faCircle } /> Tim Werewolf</h3>
                        { rolesDataFa.werewolf.map((r, i) => (
                            <RoleCardFa key={ i } { ...r } borderColor="#A634451F" />
                        )) }
                    </div>
                </section>


                <section className="w-full flex flex-col gap-3" id="faq">
                    <h2 className="text-lg sm:text-xl font-bold text-white text-center mb-1"><FontAwesomeIcon icon={ faMessageQuestion } /> FAQ</h2>
                    { faqItems.map((item, i) => (
                        <FAQItem key={ i } question={ item.question } answer={ item.answer } />
                    )) }
                </section>


                <section className="w-full flex flex-col gap-4" id="contact">
                    <h2 className="text-lg sm:text-xl font-bold text-white text-center"><FontAwesomeIcon icon={ faMailboxOpenLetter } /> Kontak</h2>
                    <p className="text-[.8rem] sm:text-sm text-zinc-400 text-center leading-relaxed">
                        Punya pertanyaan, saran, atau ingin berkolaborasi? Hubungi kami melalui salah satu platform di bawah ini.
                    </p>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2.5">
                        <a
                            href="https://www.linkedin.com/in/panjidepari"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-[calc(50%-5px)] rounded-lg px-4 py-3.5 flex gap-3 items-center transition-all duration-200 hover:bg-white/[0.03] hover:-translate-y-px group bg-glass/70 border border-glass-border/50"
                        >
                            <FontAwesomeIcon icon={ faLinkedinIn } className="text-[#0A66C2] text-lg min-w-5 shrink-0" />
                            <div className="min-w-0">
                                <p className="font-semibold text-zinc-100 text-[.82rem] sm:text-sm group-hover:text-[#0A66C2] transition-colors">LinkedIn</p>
                                <p className="text-[.72rem] sm:text-xs text-zinc-500">PanjiDepari</p>
                            </div>
                        </a>
                        <a
                            href="mailto:pencaricode@gmail.com"
                            className="w-full sm:w-[calc(50%-5px)] rounded-lg px-4 py-3.5 flex gap-3 items-center transition-all duration-200 hover:bg-white/[0.03] hover:-translate-y-px group bg-glass/70 border border-glass-border/50"
                        >
                            <FontAwesomeIcon icon={ faEnvelope } className="text-rose-400 text-lg min-w-5 shrink-0" />
                            <div className="min-w-0">
                                <p className="font-semibold text-zinc-100 text-[.82rem] sm:text-sm group-hover:text-rose-400 transition-colors">Email</p>
                                <p className="text-[.72rem] sm:text-xs text-zinc-500">pencaricode@gmail.com</p>
                            </div>
                        </a>
                        <a
                            href="https://github.com/PencariKode"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-[calc(50%-5px)] rounded-lg px-4 py-3.5 flex gap-3 items-center transition-all duration-200 hover:bg-white/[0.03] hover:-translate-y-px group bg-glass/70 border border-glass-border/50"
                        >
                            <FontAwesomeIcon icon={ faGithub } className="text-zinc-200 text-lg min-w-5 shrink-0" />
                            <div className="min-w-0">
                                <p className="font-semibold text-zinc-100 text-[.82rem] sm:text-sm group-hover:text-white transition-colors">GitHub</p>
                                <p className="text-[.72rem] sm:text-xs text-zinc-500">PencariKode</p>
                            </div>
                        </a>
                        <a
                            href="https://github.com/BriantPanji"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-[calc(50%-5px)] rounded-lg px-4 py-3.5 flex gap-3 items-center transition-all duration-200 hover:bg-white/[0.03] hover:-translate-y-px group bg-glass/70 border border-glass-border/50"
                        >
                            <FontAwesomeIcon icon={ faGithub } className="text-zinc-200 text-lg min-w-5 shrink-0" />
                            <div className="min-w-0">
                                <p className="font-semibold text-zinc-100 text-[.82rem] sm:text-sm group-hover:text-white transition-colors">GitHub</p>
                                <p className="text-[.72rem] sm:text-xs text-zinc-500">BriantPanji</p>
                            </div>
                        </a>
                        <a
                            href="https://instagram.com/panjidepari"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full rounded-lg px-4 py-3.5 flex gap-3 items-center transition-all duration-200 hover:bg-white/[0.03] hover:-translate-y-px group bg-glass/70 border border-glass-border/50"
                        >
                            <FontAwesomeIcon icon={ faInstagram } className="text-[#E4405F] text-lg min-w-5 shrink-0" />
                            <div className="min-w-0">
                                <p className="font-semibold text-zinc-100 text-[.82rem] sm:text-sm group-hover:text-[#E4405F] transition-colors">Instagram</p>
                                <p className="text-[.72rem] sm:text-xs text-zinc-500">@panjidepari</p>
                            </div>
                        </a>
                    </div>
                </section>

            </div>
        </MainContainer>
    );
}
