'use client';

import { useState, useEffect, useRef, RefObject } from "react";
import checkRoom from "./checkRoom";
import { formatRoomCode } from "@/utils";
import DangerButton from "@c/Buttons/Danger";
import PrimaryButton from "@c/Buttons/Primary";
import Spinner from "@c/Spinner";

const errorMessages = {
    codeLength: "Panjang kode room hanya boleh 6 karakter",
    codeChar: "Kode room hanya boleh mengandung huruf, angka, dan tanda strip (-)",
    codeInvalid: "Kode room tidak valid",
    codeEmpty: "Kode room tidak boleh kosong",
    codeNotFound: "Kode room tidak ditemukan",
    codeError: "Terjadi kesalahan saat mencari kode room",
    offline: "Pastikan koneksi internet Anda aktif untuk bisa masuk ke dalam room"
};

export default function JoinRoomForm() {
    const {
        roomCode, error, isLoading, showLongLoadingMessage,
        isMounted, handleRoomCode, handleJoin, checkCodeError,
        showErrorPopup, setShowErrorPopup, closeBtnRef
    } = useJoinRoom();

    return (
        <>
            <div className="w-full flex items-center justify-center">
                <div className="w-4/5 md:w-2/3 flex flex-col gap-1 items-center">
                    <input
                        type="text"
                        tabIndex={ 1 }
                        name="roomCode"
                        autoComplete="off"
                        id="roomCode"
                        className={ `base-input text-center disabled:opacity-50 disabled:cursor-wait ${error.length > 0 ? '!border-2 !border-orange-600 !outline-none !ring-0 !focus:border-orange-600 !focus:ring-0 !focus:outline-none' : ''}` }
                        value={ roomCode }
                        placeholder="AB1-C23"
                        onChange={ (e) => handleRoomCode(e.target.value) }
                        onKeyDown={ (e) => {
                            if (e.key === 'Enter') handleJoin();
                        } }
                        onBlur={ checkCodeError }
                        disabled={ !isMounted || isLoading }
                    />

                    { (error.length > 0) && (
                        <span className="text-xs text-orange-500 font-semibold italic ml-1 mb-1 text-center">
                            { error }
                        </span>
                    ) }

                    <PrimaryButton
                        onClick={ handleJoin }
                        disabled={ !isMounted || isLoading }
                    >
                        { isLoading ? <Spinner size="sm" /> : "Masuk Room" }
                    </PrimaryButton>

                    { showLongLoadingMessage && (
                        <span className="text-xs text-blue-400 font-medium animate-pulse mt-1 text-center">
                            Harap tunggu sebentar, sedang memproses...
                        </span>
                    ) }
                </div>
            </div>

            <RoomNotFoundPopup
                isOpen={ showErrorPopup }
                onClose={ () => setShowErrorPopup(false) }
                closeBtnRef={ closeBtnRef }
            />
        </>
    );
}

interface RoomNotFoundPopupProps {
    isOpen: boolean;
    onClose: () => void;
    closeBtnRef: RefObject<HTMLButtonElement | null>;
}

function RoomNotFoundPopup({ isOpen, onClose, closeBtnRef }: RoomNotFoundPopupProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
            onClick={ onClose }
        >
            <div
                className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-6 mx-4 max-w-sm w-full flex flex-col items-center gap-4 animate-[scaleIn_0.2s_ease-out]"
                onClick={ (e) => e.stopPropagation() }
            >
                <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center">
                    <i className="fa-regular fa-triangle-exclamation text-red-500 text-2xl"></i>
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-1">Room Tidak Ditemukan</h3>
                    <p className="text-xs text-zinc-400">Kode yang anda masukkan tidak ditemukan. Kemungkinan Anda salah memasukkan kode atau room sudah dihapus.</p>
                </div>
                <DangerButton
                    ref={ closeBtnRef }
                    className="w-full mt-1"
                    onClick={ onClose }
                >
                    Tutup
                </DangerButton>
            </div>
        </div>
    );
}


function useJoinRoom() {
    const [roomCode, setRoomCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showLongLoadingMessage, setShowLongLoadingMessage] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        document.body.style.overflow = showErrorPopup ? 'hidden' : '';

        if (showErrorPopup && closeBtnRef.current) {
            closeBtnRef.current.focus();
        }

        return () => { document.body.style.overflow = ''; };
    }, [showErrorPopup]);

    function handleRoomCode(value: string) {
        const formattedValue = formatRoomCode(value);
        setRoomCode(() => formattedValue);

        switch (error) {
            case errorMessages.codeEmpty:
                if (roomCode.length > 0) setError('');
                break;
            case errorMessages.codeLength:
                if (checkCodeLength(formattedValue)) setError('');
                break;
            case errorMessages.codeChar:
                if (/^[A-F0-9\-]+$/.test(formattedValue)) setError('');
                break;
            case errorMessages.offline:
                setError('');
                break;
            default:
                break;
        }
    }

    async function handleJoin() {
        if (isLoading) return;

        if (!navigator.onLine) {
            setError(errorMessages.offline);
            return;
        }

        handleRoomCode(roomCode);
        if (checkCodeError()) return;

        setIsLoading(true);
        setShowLongLoadingMessage(false);

        const timeoutId = setTimeout(() => {
            setShowLongLoadingMessage(true);
        }, 1000);

        try {
            const room = await checkRoom(roomCode);
            if (!room) {
                setError(errorMessages.codeNotFound);
                setShowErrorPopup(true);
            }
        } catch (error) {
            console.error(error);
            setError(errorMessages.codeError);
        } finally {
            clearTimeout(timeoutId);
            setIsLoading(false);
            setShowLongLoadingMessage(false);
        }
    }

    function checkCodeError() {
        let hasError = false;
        if (roomCode.length === 0) {
            setError(errorMessages.codeEmpty);
            hasError = true;
        } else if (!checkCodeLength(roomCode)) {
            setError(errorMessages.codeLength);
            hasError = true;
        } else if (!/^[A-F0-9\-]+$/.test(roomCode)) {
            setError(errorMessages.codeChar);
            hasError = true;
        } else {
            setError('');
        }

        return hasError;
    }

    return {
        roomCode, error, isLoading, showLongLoadingMessage,
        isMounted, handleRoomCode, handleJoin, checkCodeError,
        showErrorPopup, setShowErrorPopup, closeBtnRef
    };
}


function checkCodeLength(code: string) {
    return code.includes("-") ? code.length === 7 : code.length === 6;
}
