'use client';

import { signIn, useSession } from "next-auth/react";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { isEmail, isStrongPassword } from "validator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function RegisterPage() {
    return (
        <Suspense fallback={ <div className="flex min-h-screen items-center justify-center bg-hl-bg"><div className="auth-spinner" /></div> }>
            <RegisterContent />
        </Suspense>
    );
}

function RegisterContent() {
    const { status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [errForm, setErrForm] = useState<{ type: string; message: string }>({
        type: "",
        message: "",
    });

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/");
        }
    }, [status, router]);

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        setErrForm({ type: "", message: "" });

        if (name.length < 3) {
            setErrForm({
                type: "name",
                message: "Nama harus terdiri dari minimal 3 karakter",
            });
            return;
        }

        if (!isEmail(email)) {
            setErrForm({ type: "email", message: "Email tidak valid" });
            return;
        }

        if (password.length < 1) {
            setErrForm({ type: "password", message: "Password tidak boleh kosong" });
            return;
        }

        if (passwordConfirm.length < 1) {
            setErrForm({
                type: "passwordConfirm",
                message: "Konfirmasi password tidak boleh kosong",
            });
            return;
        }

        if (password !== passwordConfirm) {
            setErrForm({
                type: "passwordConfirm",
                message: "Password tidak cocok",
            });
            setPassword("");
            setPasswordConfirm("");
            return;
        }

        const isStrongPw = isStrongPassword(password, {
            minLength: 6,
            minSymbols: 1,
            minNumbers: 1,
            minLowercase: 0,
            minUppercase: 0,
        });

        if (!isStrongPw) {
            setErrForm({
                type: "password",
                message: "Password harus terdiri dari minimal 6 karakter, 1 simbol, dan 1 angka",
            });
            return;
        }

        setLoading(true);

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
            name,
            callbackUrl,
            isRegister: "true"
        });

        if (res?.error) {
            setErrForm({ message: res.error, type: "passwordConfirm" });
            setPassword("");
            setPasswordConfirm("");
        } else {
            router.push(callbackUrl);
        }
        setLoading(false);
    };

    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-hl-bg">
                <div className="auth-spinner" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-hl-bg px-4 py-12">
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute -top-32 -right-32 h-[14rem] w-[14rem] sm:h-[28rem] sm:w-[28rem] rounded-full bg-[#6b1525] opacity-40 blur-[100px] sm:blur-[150px]" />
                <div className="absolute -bottom-32 -left-32 h-[12rem] w-[12rem] sm:h-[26rem] sm:w-[26rem] rounded-full bg-[#8b2030] opacity-30 blur-[90px] sm:blur-[140px]" />
                <div className="absolute top-1/3 -left-16 h-[10rem] w-[10rem] sm:h-[20rem] sm:w-[20rem] rounded-full bg-[#a63445] opacity-25 blur-[80px] sm:blur-[120px]" />
                <div className="absolute -top-16 right-1/4 h-[9rem] w-[9rem] sm:h-[18rem] sm:w-[18rem] rounded-full bg-[#6b1525] opacity-30 blur-[80px] sm:blur-[120px]" />
            </div>

            <div className="auth-card relative z-10 w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Buat Akun Baru
                    </h1>
                    <p className="mt-1 text-sm text-zinc-400">
                        Daftar untuk memulai!
                    </p>
                </div>

                <p className="mb-3 text-center text-xs font-light text-zinc-500 select-none">
                    Daftar dengan akun:
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={ () => signIn("google", { callbackUrl }) }
                        className="auth-oauth-btn group flex-1"
                        title="Daftar dengan akun Google"
                    >
                        <FontAwesomeIcon icon={ faGoogle } size="xl" />
                        <span className="font-semibold">Google</span>
                    </button>
                    <button
                        onClick={ () => signIn("github", { callbackUrl }) }
                        className="auth-oauth-btn group flex-1"
                        title="Daftar dengan akun GitHub"
                    >
                        <FontAwesomeIcon icon={ faGithub } size="xl" />
                        <span className="font-semibold">GitHub</span>
                    </button>
                </div>

                <div className="my-6 flex items-center gap-3">
                    <hr className="flex-1 border-zinc-700/60" />
                    <span className="text-xs text-zinc-500 select-none">
                        atau gunakan email
                    </span>
                    <hr className="flex-1 border-zinc-700/60" />
                </div>

                <form onSubmit={ handleRegister } className="flex flex-col gap-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-1.5 block text-sm font-medium text-zinc-300"
                        >
                            Nama Lengkap
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={ name }
                            onChange={ (e) => setName(e.target.value) }
                            placeholder="Howly Molly"
                            className={ `auth-input ${errForm.type === "name" ? "ring-red-500/60" : ""}` }
                        />
                        { errForm.type === "name" && (
                            <p className="mt-1 text-xs text-red-400">{ errForm.message }</p>
                        ) }
                    </div>

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
                            className={ `auth-input ${errForm.type === "email" ? "ring-red-500/60" : ""}` }
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
                            className={ `auth-input ${errForm.type === "password" ? "ring-red-500/60" : ""}` }
                        />
                        { errForm.type === "password" && (
                            <p className="mt-1 text-xs text-red-400">{ errForm.message }</p>
                        ) }
                    </div>

                    <div>
                        <label
                            htmlFor="passwordConfirm"
                            className="mb-1.5 block text-sm font-medium text-zinc-300"
                        >
                            Konfirmasi Password
                        </label>
                        <input
                            id="passwordConfirm"
                            type="password"
                            value={ passwordConfirm }
                            onChange={ (e) => setPasswordConfirm(e.target.value) }
                            placeholder="Ulangi password"
                            className={ `auth-input ${errForm.type === "passwordConfirm" ? "ring-red-500/60" : ""}` }
                        />
                        { errForm.type === "passwordConfirm" && (
                            <p className="mt-1 text-xs text-red-400">{ errForm.message }</p>
                        ) }
                    </div>

                    <button
                        type="submit"
                        disabled={ loading }
                        className="auth-submit-btn mt-1"
                    >
                        { loading ? <span className="auth-spinner-sm" /> : "Daftar" }
                    </button>
                </form>

                <div className="mt-6 flex flex-col items-center gap-3">
                    <span className="text-sm text-zinc-400">
                        Sudah punya akun?{ " " }
                        <Link
                            className="font-semibold text-[#c9586a] transition-colors hover:text-[#d87a89]"
                            href="/login"
                        >
                            Masuk sekarang
                        </Link>
                    </span>
                    <span className="text-center text-[0.65rem] text-zinc-500">
                        Dengan mengklik <em className="font-semibold">daftar</em>, Anda
                        menyetujui{ " " }
                        <Link className="underline-offset-2 hover:underline" href="/tos">
                            Persyaratan Layanan
                        </Link>{ " " }
                        dan{ " " }
                        <Link
                            className="underline-offset-2 hover:underline"
                            href="/privacy"
                        >
                            Kebijakan Privasi
                        </Link>{ " " }
                        kami.
                    </span>
                </div>
            </div>
        </div>
    );
}
