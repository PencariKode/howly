'use client';

import { signIn, useSession } from "next-auth/react";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { isEmail } from "validator";
import Spinner from "@c/Spinner";
import PrimaryButton from "@c/Buttons/Primary";
import OutlineButton from "@c/Buttons/Outline";
import Image from "next/image";

export default function LoginPage() {
    return (
        <Suspense fallback={ <div className="flex min-h-screen items-center justify-center bg-hl-bg"><Spinner /></div> }>
            <LoginContent />
        </Suspense>
    );
}

function LoginContent() {
    const { status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errForm, setErrForm] = useState<{
        type: "email" | "password" | "";
        message: string;
    }>({ type: "", message: "" });

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/");
        }
    }, [status, router]);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setErrForm({ type: "", message: "" });

        if (!isEmail(email)) {
            setErrForm({ type: "email", message: "Email tidak valid" });
            return;
        }

        if (password.length < 1) {
            setErrForm({ type: "password", message: "Password tidak boleh kosong" });
            return;
        }

        setLoading(true);
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl,
            isRegister: "false"
        });

        if (res?.error) {
            setErrForm({ message: res.error, type: "password" });
            setPassword("");
        } else {
            router.push(callbackUrl);
        }
        setLoading(false);
    };

    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-hl-bg">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-hl-bg px-4 py-12">
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute -top-32 -left-32 h-[14rem] w-[14rem] sm:h-[28rem] sm:w-[28rem] rounded-full bg-[#6b1525] opacity-40 blur-[100px] sm:blur-[150px]" />
                <div className="absolute -right-32 -bottom-32 h-[12rem] w-[12rem] sm:h-[26rem] sm:w-[26rem] rounded-full bg-[#8b2030] opacity-30 blur-[90px] sm:blur-[140px]" />
                <div className="absolute top-1/2 -right-16 h-[10rem] w-[10rem] sm:h-[20rem] sm:w-[20rem] rounded-full bg-[#a63445] opacity-25 blur-[80px] sm:blur-[120px]" />
                <div className="absolute -bottom-16 left-1/4 h-[9rem] w-[9rem] sm:h-[18rem] sm:w-[18rem] rounded-full bg-[#6b1525] opacity-30 blur-[80px] sm:blur-[120px]" />
            </div>

            <div className="glass-card relative z-10 w-full max-w-md lg:max-w-4xl p-6 lg:p-10 flex flex-col lg:flex-row lg:gap-14">

                {/* Kolom Kiri: Info & Social Login */ }
                <div className="flex-[4] flex flex-col justify-center">
                    <div className="flex justify-center lg:justify-start mb-6">
                        <Image src="/media/logo/logo_wolfman1_nobg.png" alt="Howly Logo" width={100} height={100} className="w-20 h-20 lg:w-34 lg:h-34 drop-shadow-[0_0_15px_rgba(166,52,69,0.5)]" />
                    </div>

                    <div className="mb-6 text-center lg:text-left">
                        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                            Masuk ke Akun
                        </h1>
                        <p className="mt-1 text-sm text-zinc-400">
                            Selamat datang kembali!
                        </p>
                    </div>

                    <p className="mb-3 text-center lg:text-left text-xs font-light text-zinc-500 select-none">
                        Masuk dengan akun:
                    </p>
                    <div className="flex gap-3">
                        <OutlineButton
                            onClick={ () => signIn("google", { callbackUrl }) }
                            className="group flex-1"
                            title="Masuk dengan akun Google"
                        >
                            <i className="fab fa-google text-xl" />
                            <span className="font-semibold">Google</span>
                        </OutlineButton>
                        <OutlineButton
                            onClick={ () => signIn("github", { callbackUrl }) }
                            className="group flex-1"
                            title="Masuk dengan akun GitHub"
                        >
                            <i className="fab fa-github text-xl" />
                            <span className="font-semibold">GitHub</span>
                        </OutlineButton>
                    </div>

                    <div className="hidden lg:flex flex-col items-start gap-3 mt-auto pt-8">
                        <span className="text-sm text-zinc-400">
                            Belum punya akun?{ " " }
                            <Link
                                className="font-semibold text-[#c9586a] transition-colors hover:text-[#d87a89]"
                                href="/register"
                            >
                                Daftar sekarang
                            </Link>
                        </span>
                    </div>
                </div>

                {/* Separator Panel */ }
                <div className="my-6 lg:my-0 flex items-center lg:hidden gap-3">
                    <hr className="flex-1 border-zinc-700/60" />
                    <span className="text-xs text-zinc-500 select-none">
                        atau gunakan email
                    </span>
                    <hr className="flex-1 border-zinc-700/60" />
                </div>
                <div className="hidden lg:flex items-center justify-center -mx-4">
                    <div className="w-px h-full bg-zinc-700/60 relative">
                        <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-hl-primary px-3 py-1 text-[0.65rem] font-bold text-zinc-500 whitespace-nowrap rounded-md border border-zinc-700/40 rotate-[-90deg]">
                            ATAU GUNAKAN EMAIL
                        </span>
                    </div>
                </div>

                {/* Kolom Kanan: Form Email */ }
                <div className="flex-[5] flex flex-col justify-center">
                    <form onSubmit={ handleLogin } className="flex flex-col gap-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-1.5 block text-sm font-medium text-zinc-300"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={ email }
                                onChange={ (e) => setEmail(e.target.value) }
                                placeholder="email@example.com"
                                className={ `base-input ${errForm.type === "email" ? "ring-red-500/60" : ""}` }
                            />
                            { errForm.type === "email" && (
                                <p className="mt-1 text-xs text-red-400">{ errForm.message }</p>
                            ) }
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-1.5 block text-sm font-medium text-zinc-300"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={ password }
                                onChange={ (e) => setPassword(e.target.value) }
                                placeholder="Masukkan password"
                                className={ `base-input ${errForm.type === "password" ? "ring-red-500/60" : ""}` }
                            />
                            { errForm.type === "password" && (
                                <p className="mt-1 text-xs text-red-400">{ errForm.message }</p>
                            ) }
                        </div>

                        <PrimaryButton
                            type="submit"
                            disabled={ loading }
                            className="mt-1"
                        >
                            { loading ? <Spinner size="sm" /> : "Masuk" }
                        </PrimaryButton>
                        <Link
                            className="text-xs -mt-1 italic text-[#c9586a] hover:underline text-right"
                            href="/auth/forgot"
                        >
                            Lupa password?
                        </Link>
                    </form>

                    <div className="mt-6 flex flex-col items-center lg:items-end gap-3 lg:hidden">
                        <span className="text-sm text-zinc-400">
                            Belum punya akun?{ " " }
                            <Link
                                className="font-semibold text-[#c9586a] transition-colors hover:text-[#d87a89]"
                                href="/register"
                            >
                                Daftar sekarang
                            </Link>
                        </span>
                    </div>

                    <div className="mt-6 lg:mt-8 text-center text-[0.65rem] text-zinc-500">
                        Dengan mengklik <em className="font-semibold">masuk</em>, Anda
                        menyetujui{ " " }
                        <Link className="underline-offset-2 hover:underline" href="/docs/tos">
                            Persyaratan Layanan
                        </Link>{ " " }
                        dan{ " " }
                        <Link
                            className="underline-offset-2 hover:underline"
                            href="/docs/privacy"
                        >
                            Kebijakan Privasi
                        </Link>{ " " }
                        kami.
                    </div>
                </div>
            </div>
        </div>
    );
}
