'use client';

import {signIn, useSession} from "next-auth/react";
import {FormEvent, useEffect, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import MainContainer from "@c/MainContainer";
import Image from "next/image";
import SimpleFormInput from "@c/Form/SimpleFormInput";
import SimpleFormButton from "@c/Form/SimpleFormButton";
import Link from "next/link";
import {isEmail} from "validator";

export default function LoginPage() {
    const {status} = useSession();

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/"; // tujuan setelah login

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errForm, setErrForm] = useState<{ type: "email" | "password" | "", message: string }>({
        type: "",
        message: ""
    });

    const [delay, setDelay] = useState(0);

    useEffect(() => {
        if (status === "authenticated") {
            router.replace("/");
        }
    }, [status, router]);

    useEffect(() => {


        const interval = setInterval(() => {
            setDelay(Math.random() * 2);
        }, 5000);

        return () => {
            clearInterval(interval);
        }

    }, [])

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        if (password.length < 1) {
            setErrForm({type: "password", message: "Password tidak boleh kosong"});
            setPassword("");
            return;
        }

        if (!isEmail(email)) {
            setErrForm({type: "email", message: "Email tidak valid"});
            setPassword("");
            return;
        }


        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl,
        });

        if (res?.error) {
            setErrForm({message: "Email atau password salah", type: "password"});
            setPassword("");
        } else {
            router.push(callbackUrl);
        }
    };

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
                        <p className={`text-center text-sm text-hl-text/85 mt-2 font-extralight select-none`}>Masuk
                            dengan
                            akun:</p>
                        <div className={`minMaxWidth flex justify-around md:justify-center items-center gap-4`}>
                            <button onClick={() => signIn("google", {callbackUrl})}
                                    className={`w-full max-w-30 h-12 md:h-10 bg-hl-tertiary hover:bg-hl-tertiary/60 hover:text-hl-text/85 rounded-sm cursor-pointer group`}
                                    title={`Masuk dengan akun Google`}>
                                <i className={`fa-brands fa-google`}></i>
                                <span className={`ml-2 font-bold`}>Google</span>
                            </button>
                            <button onClick={() => signIn("github", {callbackUrl})}
                                    className={`w-full max-w-30 h-12 md:h-10 bg-hl-tertiary hover:bg-hl-tertiary/60 hover:text-hl-text/85 rounded-sm cursor-pointer group`}
                                    title={`Masuk dengan akun GitHub`}>
                                <i className={`fa-brands fa-github`}></i>
                                <span className={`ml-2 font-bold`}>Github</span>
                            </button>
                        </div>
                        <p className={`text-center text-sm text-hl-text/85 mt-1 font-extralight select-none`}>atau
                            gunakan
                            email:</p>
                        <form onSubmit={handleLogin}
                              className={`minMaxWidth flex flex-col justify-center items-center gap-4`}>
                            <SimpleFormInput label={`Email:`} htmlFor={`email`} type={`email`} value={email}
                                             eventChange={e => setEmail(e.target.value)}
                                             placeholder={`email@example.com`}
                                             error={errForm}/>
                            <SimpleFormInput label={`Password:`} htmlFor={`password`} type={`password`} value={password}
                                             eventChange={e => setPassword(e.target.value)}
                                             placeholder={`Masukkan password`} error={errForm}/>
                            <SimpleFormButton type={`submit`} text={'Masuk'}/>
                            <Link
                                className={`minMaxWidth text-xs -mt-2 mr-0.5 md:mr-1 italic text-teal-700 hover:underline text-right`}
                                href="/auth/forgot">Lupa password?</Link>
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
                            Belum punya akun? <Link
                                className={`text-cyan-700 hover:text-cyan-600 group-hover:underline font-semibold`}
                                href={`/auth/register`}>Daftar sekarang</Link>
                        </span>
                            <span className={`minMaxWidth text-center text-[.65rem] text-hl-text/85 font-extralight`}>
                            Dengan mengklik <i className={`font-semibold`}>masuk</i>, Anda menyetujui <Link
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



