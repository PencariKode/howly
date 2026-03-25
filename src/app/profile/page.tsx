'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import Image from "next/image";
import DangerButton from "@c/Buttons/Danger";
import Spinner from "@c/Spinner";
import PrimaryButton from "@c/Buttons/Primary";
import OutlineButton from "@c/Buttons/Outline";

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirmText, setDeleteConfirmText] = useState("");
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
        }
    }, [status, router]);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setImage(session.user.image || "");
        }
    }, [session]);

    if (status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-hl-bg">
                <Spinner />
            </div>
        );
    }

    if (!session) return null;

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setSaving(true);

        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, image }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage({ type: "error", text: data.error });
            } else {
                await update(); // refresh session
                setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
            }
        } catch (error) {
            console.error("Error saving profile:", error);
            setMessage({ type: "error", text: "Terjadi kesalahan" });
        }

        setSaving(false);
    };

    const handleDelete = async () => {
        if (deleteConfirmText !== "HAPUS AKUN") return;
        setDeleting(true);

        try {
            const res = await fetch("/api/profile", { method: "DELETE" });

            if (res.ok) {
                await signOut({ callbackUrl: "/login" });
            } else {
                const data = await res.json();
                setMessage({ type: "error", text: data.error });
                setDeleting(false);
            }
        } catch (error) {
            console.error("Error deleting profile:", error);
            setMessage({ type: "error", text: "Gagal menghapus akun" });
            setDeleting(false);
        }
    };

    const user = session.user;
    const joinDate = new Date(user.createdAt || Date.now()).toLocaleDateString("id-ID", {
        day: "numeric", month: "long", year: "numeric"
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-hl-bg px-4 py-12">
            <div className="pointer-events-none fixed inset-0 z-0"
                style={ {
                    background: `
                        radial-gradient(ellipse 40% 50% at 0% 0%, #6B152566 0%, transparent 70%),
                        radial-gradient(ellipse 40% 50% at 100% 100%, #8B20304D 0%, transparent 70%),
                        radial-gradient(ellipse 30% 40% at 100% 50%, #A6344540 0%, transparent 70%),
                        radial-gradient(ellipse 25% 30% at 25% 100%, #6B15254D 0%, transparent 70%)
                    `
                } }
            />

            <div className="relative z-10 w-full max-w-lg flex flex-col gap-5">
                <div className="glass-card rounded-md!">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            { user.image ? (
                                <Image
                                    src={ user.image }
                                    alt="Profile"
                                    width={ 96 }
                                    height={ 96 }
                                    className="w-24 h-24 rounded-full object-cover border-3 border-[#A6344580]"
                                />
                            ) : (
                                <div
                                    className="w-24 h-24 rounded-full flex items-center justify-center text-zinc-400 bg-[#29293899] border-3 border-zinc-border">
                                    <i className="fal fa-user text-3xl" />
                                </div>
                            ) }
                        </div>

                        <div className="text-center">
                            <h1 className="text-2xl font-bold tracking-tight text-white">{ user.name || "Pengguna" }</h1>
                            <p className="text-sm text-zinc-400 mt-0.5">{ user.email }</p>
                        </div>

                        <div className="flex gap-2">
                            <span className="text-xs px-2.5 py-1 rounded-full text-zinc-300 font-medium bg-[#29293899] border border-zinc-border">
                                { user.role || "USER" }
                            </span>
                            <span className="text-xs px-2.5 py-1 rounded-full text-zinc-400 bg-glass-border/40 border border-glass-border/30">
                                Bergabung { joinDate }
                            </span>
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-md!">
                    <h2 className="text-lg font-bold text-white mb-4">Edit Profil</h2>

                    { message && (
                        <div className={ `mb-4 px-3 py-2 rounded-md text-sm ${message.type === "success" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-red-500/15 text-red-400 border border-red-500/30"}` }>
                            { message.text }
                        </div>
                    ) }

                    <form onSubmit={ handleSave } className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-zinc-300">
                                Nama
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={ name }
                                onChange={ (e) => setName(e.target.value) }
                                placeholder="Nama lengkap"
                                className="base-input"
                                minLength={ 3 }
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="mb-1.5 block text-sm font-medium text-zinc-300">
                                URL Foto Profil
                            </label>
                            <input
                                id="image"
                                type="url"
                                value={ image }
                                onChange={ (e) => setImage(e.target.value) }
                                placeholder="https://example.com/avatar.jpg"
                                className="base-input"
                            />
                            <p className="mt-1 text-xs text-zinc-600">Kosongkan untuk menghapus foto profil</p>
                        </div>

                        { image && (
                            <div className="flex justify-center">
                                <Image
                                    src={ image }
                                    alt="Preview"
                                    width={ 64 }
                                    height={ 64 }
                                    className="w-16 h-16 rounded-full object-cover border-2 border-zinc-border"
                                    onError={ (e) => { (e.target as HTMLImageElement).style.display = 'none'; } }
                                />
                            </div>
                        ) }

                        <PrimaryButton
                            type="submit"
                            disabled={ saving }
                            className="rounded-md! mt-1 flex items-center justify-center gap-2"
                        >
                            { saving ? (
                                <Spinner size="sm" />
                            ) : (
                                <>
                                    <i className="fal fa-floppy-disk text-sm" />
                                    Simpan Perubahan
                                </>
                            ) }
                        </PrimaryButton>
                    </form>
                </div>

                <div className="glass-card border-red-700/30  rounded-md!">
                    <h2 className="text-lg font-bold text-red-400 mb-2">Zona Berbahaya</h2>
                    <p className="text-sm text-zinc-500 mb-4">
                        Menghapus akun bersifat permanen. Semua data termasuk sesi dan akun terhubung akan ikut terhapus.
                    </p>
                    <button
                        type="button"
                        onClick={ () => setShowDeleteModal(true) }
                        className="w-full flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-200 text-red-400 hover:text-red-300 hover:-translate-y-px bg-red-900/20 border border-red-700/40"
                    >
                        <i className="fal fa-trash-can" />
                        Hapus Akun Saya
                    </button>
                </div>
            </div>

            { showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                    <div className="glass-card w-full max-w-sm border-red-700/40">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <i className="fal fa-triangle-exclamation text-4xl text-red-400" />
                            <h3 className="text-lg font-bold text-white">Hapus Akun?</h3>
                            <p className="text-sm text-zinc-400">
                                Tindakan ini tidak dapat dibatalkan. Ketik <strong className="text-red-400">HAPUS AKUN</strong> untuk konfirmasi.
                            </p>
                            <input
                                type="text"
                                value={ deleteConfirmText }
                                onChange={ (e) => setDeleteConfirmText(e.target.value) }
                                placeholder="Ketik HAPUS AKUN"
                                className="base-input text-center"
                            />
                            <div className="flex gap-3 w-full">
                                <OutlineButton
                                    onClick={ () => { setShowDeleteModal(false); setDeleteConfirmText(""); } }
                                    className="flex-1 justify-center"
                                >
                                    Batal
                                </OutlineButton>
                                <DangerButton
                                    onClick={ handleDelete }
                                    disabled={ deleteConfirmText !== "HAPUS AKUN" || deleting }
                                    className="flex-1"
                                >
                                    { deleting ? <Spinner size="sm" /> : "Hapus" }
                                </DangerButton>
                            </div>
                        </div>
                    </div>
                </div>
            ) }
        </div>
    );
}
