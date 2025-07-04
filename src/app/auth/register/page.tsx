'use client';

import {FormEvent, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {signIn, useSession} from "next-auth/react";
import MainContainer from "@c/MainContainer";
import Image from "next/image";
import SimpleFormInput from "@c/Form/SimpleFormInput";
import SimpleFormButton from "@c/Form/SimpleFormButton";
import Link from "next/link";
import {isEmail, isStrongPassword} from "validator";

export default function RegisterPage() {
    const {status} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/");
        }
    }, [status, router]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errForm, setErrForm] = useState<{ type: string, message: string }>({
        type: "",
        message: ""
    });


    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        if (name.length < 3) {
            setErrForm({type: "name", message: "Nama harus terdiri dari minimal 3 karakter"});
            setName("");
            return;
        }

        if (password.length < 1) {
            setErrForm({type: "password", message: "Password tidak boleh kosong"});
            setPassword("");
            setPasswordConfirm("");
            return;
        }
        if (passwordConfirm.length < 1) {
            setErrForm({type: "passwordConfirm", message: "Konfirmasi password tidak boleh kosong"});
            setPassword("");
            setPasswordConfirm("");
            return;
        }

        if (password !== passwordConfirm) {
            setErrForm({type: "passwordConfirm", message: "Password tidak cocok"});
            setPassword("");
            setPasswordConfirm("");
            return;
        }

        if (!isEmail(email)) {
            setErrForm({type: "email", message: "Email tidak valid"});
            setPassword("");
            return;
        }
        const isStrongPw = isStrongPassword(password, {
            minLength: 6,
            minSymbols: 1,
            minNumbers: 1,
        });
        if (!isStrongPw) return setErrForm({
            type: "password",
            message: "Password harus terdiri dari minimal 6 karakter, 1 simbol, dan 1 angka"
        });


        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, password})
        });

        const data = await res.json();
        if (!res.ok) {
            setErrForm({type: "password", message: data.message || "Gagal membuat akun"});
            return;
        }

        router.push("/auth/login");
    };


    const [delay, setDelay] = useState(0);
    useEffect(() => {

        const interval = setInterval(() => {
            setDelay(Math.random() * 2);
        }, 5000);

        return () => {
            clearInterval(interval);
        }

    }, [])


    return (
        <MainContainer>
            {status !== "loading" ? (
                <section
                    className={`minMaxWidth min-h-[95vh] lg:h-[110vh] flex items-center justify-center xs:px-10 sm:px-20 md:px-25 lg:px-40 xl:px-60 2xl:px-80`}>
                    <div
                        className={`minMaxWidth min-h-10 py-8 px-4 ring-hl-text/30 ring-[0.5px] bg-hl-secondary text-hl-text rounded-md flex flex-col gap-2 items-center justify-center`}>
                        <div className={`flex gap-2 minMaxWidth items-center flicker justify-center mb-4 *:select-none`}
                             style={{
                                 animationDelay: `${delay}s`,
                             }}>
                            <Image src={'/media/logo/logo_wolfman1.png'} alt={"Logo"} width={35} height={35}/>
                            <h1 className={`font-extrabold text-3xl `}>Howly</h1>
                        </div>
                        <p className={`text-center text-sm text-hl-text/85 mt-2 font-extralight select-none`}>Daftar
                            dengan
                            akun:</p>
                        <div className={`minMaxWidth flex justify-around md:justify-center items-center gap-4`}>
                            <button onClick={() => signIn("google")}
                                    className={`w-full max-w-30 h-12 md:h-10 bg-hl-tertiary hover:bg-hl-tertiary/60 hover:text-hl-text/85 rounded-sm cursor-pointer group`}
                                    title={`Masuk dengan akun Google`}>
                                <i className={`fa-brands fa-google`}></i>
                                <span className={`ml-2 font-bold`}>Google</span>
                            </button>
                            <button onClick={() => signIn("github")}
                                    className={`w-full max-w-30 h-12 md:h-10 bg-hl-tertiary hover:bg-hl-tertiary/60 hover:text-hl-text/85 rounded-sm cursor-pointer group`}
                                    title={`Masuk dengan akun GitHub`}>
                                <i className={`fa-brands fa-github`}></i>
                                <span className={`ml-2 font-bold`}>Github</span>
                            </button>
                        </div>
                        <p className={`text-center text-sm text-hl-text/85 mt-1 font-extralight select-none`}>atau
                            gunakan
                            email:</p>
                        <form onSubmit={handleRegister}
                              className={`minMaxWidth flex flex-col justify-center items-center gap-4`}>
                            <SimpleFormInput label={`Nama:`} htmlFor={`name`} type={`text`} value={name}
                                             eventChange={e => setName(e.target.value)} placeholder={`Howly molly`}
                                             error={errForm}/>
                            <SimpleFormInput label={`Email:`} htmlFor={`email`} type={`email`} value={email}
                                             eventChange={e => setEmail(e.target.value)}
                                             placeholder={`email@example.com`}
                                             error={errForm}/>
                            <SimpleFormInput label={`Password:`} htmlFor={`password`} type={`password`} value={password}
                                             eventChange={e => setPassword(e.target.value)}
                                             placeholder={`Masukkan password`} error={errForm}/>
                            <SimpleFormInput label={`Konfirmasi Password:`} htmlFor={`passwordConfirm`}
                                             type={`password`} value={passwordConfirm}
                                             eventChange={e => setPasswordConfirm(e.target.value)}
                                             placeholder={`Ulangi password`} error={errForm}/>
                            <SimpleFormButton type={`submit`} text={'Daftar'}/>
                        </form>
                        <div className={`minMaxWidth flex flex-col items-center justify-center mt-3 gap-5`}>
                            <div className={`minMaxWidth relative mb-2`}>
                                <hr className={`minmaxWidth border-hl-text/35 border-1`}/>
                                <span
                                    className={`minMaxWidth text-center flex justify-center items-center absolute top-[-600%] `}>
                                <b className={`bg-hl-secondary font-normal w-fit px-3 text-hl-text/70 select-none text-sm`}>atau</b>
                            </span>
                            </div>
                            <span className={`text-[.8rem] font-extralight group text-hl-text/85`}>
                            Sudah punya akun? <Link
                                className={`text-cyan-700 hover:text-cyan-600 group-hover:underline font-semibold`}
                                href={`/auth/login`}>Masuk sekarang</Link>
                        </span>
                            <span className={`minMaxWidth text-center text-[.65rem] text-hl-text/85 font-extralight`}>
                            Dengan mengklik <i className={`font-semibold`}>daftar</i>, Anda menyetujui <Link
                                className={`hover:underline`} href={'/tos'}>Persyaratan Layanan</Link> dan <Link
                                className={`hover:underline`} href={'/privacy'}>Kebijakan Privasi</Link> kami.
                        </span>
                        </div>
                    </div>
                </section>
            ) : (
                <section className={`minMaxWidth justify-center items-center flex h-[75vh]`}>
                    Loading...
                </section>
            )}
        </MainContainer>
    );
}
