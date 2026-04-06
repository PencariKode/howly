'use client';

import HowlProgress from "@c/Form/HowlProgress";
import HowlRangeVal from "@c/Form/HowlRangeVal";
import RoleBalance from "@/lib/roleConfig";
import useGameConfigStore from "@/stores/gameConfigStore";
import type { RoleConfig } from "@/types/roleconfig";
import { useEffect, useMemo, useRef, useCallback, useState, FormEvent } from "react";
import RoleSetButton from "@c/Form/RoleSetButton";
import PrimaryButton from "@c/Buttons/Primary";
import OutlineButton from "@c/Buttons/Outline";
import { createRoomAction } from "./actions";


function elToNumber(el: FormEvent<HTMLInputElement>): number {
    return Number((el.target as HTMLInputElement).value);
}

interface RoleInputItemProps {
    roleId: keyof RoleConfig;
    roleName: string;
    isRed?: boolean;
    rawConfig: ReturnType<RoleBalance["getRoleConfiguration"]>;
    isAllRangeDisabled: boolean;
    getDefaultRoleAmount: (role: keyof RoleConfig) => number;
    addRoleByAmount: (role: keyof RoleConfig, amount: number) => void;
}

const RoleInputItem = ({
    roleId,
    roleName,
    isRed = false,
    rawConfig,
    isAllRangeDisabled,
    getDefaultRoleAmount,
    addRoleByAmount
}: RoleInputItemProps) => {
    const borderColorClass = isRed ? "border-red-700/35" : "border-cyan-400/25";
    const textColorClass = isRed ? "text-red-400" : "text-cyan-400";

    return (
        <div className={ `w-full flex flex-col items-start justify-center gap-1 px-2 py-1.5 rounded-md bg-hl-primary/50 border ${borderColorClass}` }>
            <div className="w-full flex items-center justify-between">
                <label htmlFor={ roleId } className={ `text-[.9rem] font-normal w-full ${textColorClass}` }>{ roleName }:</label>
                <span className="text-xs text-zinc-500 select-none text-right w-full *:inline cursor-default">
                    <p title="Jumlah Minimal"> { rawConfig.min[roleId] } </p> s/d <p title="Jumlah Maximal">{ rawConfig.max[roleId] }</p> | <p title="Jumlah Rekomendasi">{ "{" }{ rawConfig.recom[roleId] }{ "}" }</p>
                </span>
            </div>
            <HowlRangeVal
                disabled={ isAllRangeDisabled }
                max={ rawConfig.max[roleId] }
                min={ rawConfig.min[roleId] }
                defaultValue={ getDefaultRoleAmount(roleId) }
                id={ roleId }
                name={ roleId }
                eventChange={ e => addRoleByAmount(roleId, elToNumber(e)) }
            />
        </div>
    );
};

const roomErrors = {
    roleCountNotMatch: "Jumlah role yang dikonfigurasi tidak sesuai dengan jumlah pemain",
    nameNotSet: "Nama Room tidak boleh kosong",
    nameLengthNotEnough: "Nama Room minimal 3 karakter",
    nameLengthNotExceed: "Nama Room maksimal 20 karakter",
}

function ErrorModal({ message, onClose }: { message: string | null, onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="glass-card w-full max-w-sm border-red-700/40">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-1">
                        <i className="fas fa-exclamation-triangle text-2xl text-red-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Error</h3>
                    <p className="text-sm text-zinc-400">
                        { message }
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                        <PrimaryButton
                            onClick={ onClose }
                            className="flex-1 justify-center"
                            fullWidth
                        >
                            Tutup
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CreateRoomForm() {
    const [errorMess, setErrorMess] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        gameTitle, setGameTitle,
        playerCount, setPlayerCount,
        roleConfig, setRoleConfig,
        setRoleCount, addRoleByAmount,
        roleCombi, getTotalRoleAmount, reset,
        isRoleCombiLocked, setRoleCombiLocked
    } = useGameConfigStore((state) => state);

    const [totalAmount, setTotalAmount] = useState<number>(0);

    const { gameConf, rawConfig } = useMemo(() => {
        const gameConf = new RoleBalance(playerCount, roleConfig, setRoleConfig);
        const rawConfig = gameConf.getRoleConfiguration();
        return { gameConf, rawConfig };
    }, [playerCount]);

    useEffect(() => {
        console.log("wikd", rawConfig)
    }, [rawConfig]);

    useEffect(() => {
        const newTotal = getTotalRoleAmount();
        setTotalAmount(newTotal);
    }, [roleConfig, getTotalRoleAmount]);

    const isAllRangeDisabled = (isRoleCombiLocked || roleCombi === 'default');

    function getDefaultRoleAmount(role: keyof RoleConfig) {
        if (roleCombi === 'default') return rawConfig.recom[role];
        return Math.max(roleConfig[role], rawConfig.min[role]);
    }

    function handleRoomName(e: FormEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        if (value.length > 20) {
            e.currentTarget.value = value.slice(0, 20);
        }
        setGameTitle(e.currentTarget.value);
    }

    const handleCreateRoom = async () => {
        if (isSubmitting) return;
        if (totalAmount !== playerCount) {
            setErrorMess(roomErrors.roleCountNotMatch);
            setShowErrorModal(true);
            return;
        }
        if (gameTitle.length === 0) {
            setErrorMess(roomErrors.nameNotSet);
            setShowErrorModal(true);
            return;
        }
        if (gameTitle.length < 3) {
            setErrorMess(roomErrors.nameLengthNotEnough);
            setShowErrorModal(true);
            return;
        }
        if (gameTitle.length > 20) {
            setErrorMess(roomErrors.nameLengthNotExceed);
            setShowErrorModal(true);
            return;
        }
        try {
            setIsSubmitting(true);
            await createRoomAction({
                roomName: gameTitle,
                playerCount,
                roleConfig,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form action={ handleCreateRoom } className="flex flex-col lg:flex-row items-stretch justify-between gap-5 py-2 w-full">
                {/* Kolom Kiri */ }
                <div className="flex flex-col w-full lg:flex-[2] gap-4">
                    <section className="flex flex-col items-start justify-center w-full gap-1.5 px-4 py-4 rounded-lg bg-glass-border/40 border border-zinc-700/30">
                        <label htmlFor="roomname" className="text-sm font-medium text-zinc-300">Nama Room:</label>
                        <input type="text" placeholder="Masukkan nama room" id="roomname" name="roomname" autoComplete="roomname"
                            className="base-input" onChange={ handleRoomName } defaultValue={ gameTitle } />
                    </section>

                    <section className="flex flex-col items-start justify-center w-full gap-1.5 px-4 py-4 rounded-lg bg-glass-border/40 border border-zinc-700/30">
                        <label htmlFor="jlhpemain" className="text-sm font-medium text-zinc-300">Jumlah Pemain:</label>
                        <HowlRangeVal disabled={ isRoleCombiLocked } eventChange={ e => setPlayerCount(elToNumber(e)) } min={ 7 } max={ 59 } defaultValue={ playerCount } id={ 'jlhpemain' } name={ 'jlhpemain' } />
                    </section>

                    <section className="flex flex-col items-start justify-center w-full gap-1.5 px-4 py-4 rounded-lg bg-glass-border/40 border border-zinc-700/30">
                        <div className="flex justify-between w-full items-center mb-2">
                            <label className="text-sm font-medium text-zinc-300">Role Set:</label>
                            <button
                                type="button"
                                className="w-fit h-fit cursor-pointer mr-1 text-zinc-400 hover:text-zinc-200 transition-colors"
                                onClick={ () => setRoleCombiLocked(!isRoleCombiLocked) }
                                title={ `Klik untuk ${isRoleCombiLocked ? 'membuka' : 'mengunci'} pilihan` }
                            >
                                <i className={ `${isRoleCombiLocked ? 'fal fa-lock' : 'fal fa-lock-open'} h-fit w-fit` } />
                            </button>
                        </div>
                        <RoleSetButton roleConfig={ rawConfig.recom } />
                    </section>

                    <section className="flex flex-col items-start justify-center w-full gap-1.5 px-4 py-4 rounded-lg bg-glass-border/40 border border-zinc-700/30">
                        <HowlProgress
                            min={ 0 }
                            max={ 100 }
                            value={ gameConf.getWerewolfPercentage(roleCombi === 'default' ? rawConfig.recom : roleConfig) }
                            label="Persentase Kekuatan"
                        />
                        <span className="italic text-[0.6rem] leading-3 pl-0.5 pt-1 text-yellow-500/70 cursor-default">Note:
                            <ul className="list-disc list-inside space-y-1 mt-1">
                                <li>Persentase ini tidak sepenuhnya akurat karna beberapa masalah teknis, terutama jika jumlah pemain kurang dari 20 orang. </li>
                                <li>Persentase ini hanya untuk menunjukkan rata-rata kekuatan dasar semua role, bukan menunjukkan persentase kemungkinan kemenangan.</li>
                            </ul>
                        </span>
                    </section>
                </div>

                {/* Kolom Kanan */ }
                <div className="flex flex-col w-full lg:flex-[3] gap-4">
                    <section className={ `flex flex-col items-start justify-center w-full gap-2 px-4 py-4 rounded-lg flex-grow ${isAllRangeDisabled ? 'opacity-55' : 'opacity-100'} bg-glass-border/40 border border-zinc-700/30` }>
                        <div className="flex flex-col w-full mb-2">
                            <label className="font-bold text-zinc-200">Kombinasi konfigurasi role</label>
                            <span className="text-xs text-zinc-500">Total terkonfigurasi: { totalAmount }/{ playerCount }</span>
                        </div>

                        <div className="flex flex-col w-full gap-4 mt-1">
                            <div className="w-full flex flex-col items-start justify-start gap-1">
                                <span className="text-sm font-semibold mb-1 ml-0.5 text-zinc-300">Role Utama:</span>
                                <div className="flex flex-col items-start justify-between gap-2.5 w-full">
                                    <RoleInputItem roleId="warga" roleName="Warga" rawConfig={ rawConfig } isAllRangeDisabled={ isAllRangeDisabled } getDefaultRoleAmount={ getDefaultRoleAmount } addRoleByAmount={ addRoleByAmount } />
                                    <RoleInputItem roleId="werewolf" roleName="Werewolf" isRed rawConfig={ rawConfig } isAllRangeDisabled={ isAllRangeDisabled } getDefaultRoleAmount={ getDefaultRoleAmount } addRoleByAmount={ addRoleByAmount } />
                                </div>
                            </div>

                            <hr className="w-full border-zinc-700/50 my-2" />

                            <div className="w-full flex flex-col items-start justify-start gap-1">
                                <span className="text-sm font-semibold mb-1 ml-0.5 text-zinc-300">Role Pelengkap:</span>
                                <div className="flex flex-col items-start justify-between gap-2.5 w-full">
                                    <RoleInputItem roleId="peramal" roleName="Peramal" rawConfig={ rawConfig } isAllRangeDisabled={ isAllRangeDisabled } getDefaultRoleAmount={ getDefaultRoleAmount } addRoleByAmount={ addRoleByAmount } />
                                    <RoleInputItem roleId="penyihir" roleName="Penyihir" rawConfig={ rawConfig } isAllRangeDisabled={ isAllRangeDisabled } getDefaultRoleAmount={ getDefaultRoleAmount } addRoleByAmount={ addRoleByAmount } />
                                    <RoleInputItem roleId="pemburu" roleName="Pemburu" rawConfig={ rawConfig } isAllRangeDisabled={ isAllRangeDisabled } getDefaultRoleAmount={ getDefaultRoleAmount } addRoleByAmount={ addRoleByAmount } />
                                    <RoleInputItem roleId="dukun" roleName="Dukun" rawConfig={ rawConfig } isAllRangeDisabled={ isAllRangeDisabled } getDefaultRoleAmount={ getDefaultRoleAmount } addRoleByAmount={ addRoleByAmount } />
                                    <RoleInputItem roleId="raja" roleName="Raja" rawConfig={ rawConfig } isAllRangeDisabled={ isAllRangeDisabled } getDefaultRoleAmount={ getDefaultRoleAmount } addRoleByAmount={ addRoleByAmount } />
                                    <RoleInputItem roleId="blackwolf" roleName="Blackwolf" isRed rawConfig={ rawConfig } isAllRangeDisabled={ isAllRangeDisabled } getDefaultRoleAmount={ getDefaultRoleAmount } addRoleByAmount={ addRoleByAmount } />
                                    <RoleInputItem roleId="shapeshifter" roleName="Shapeshifter" isRed rawConfig={ rawConfig } isAllRangeDisabled={ isAllRangeDisabled } getDefaultRoleAmount={ getDefaultRoleAmount } addRoleByAmount={ addRoleByAmount } />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="flex items-center justify-center w-full gap-4 pt-1">
                        <OutlineButton
                            onClick={ () => reset() }
                            disabled={ isRoleCombiLocked }
                            title={ isRoleCombiLocked ? "Tombol dikunci, buka diatas!" : "Tombol ini akan mereset kombinasi set role" }
                            className="flex-1 !py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-45"
                        >
                            Reset
                        </OutlineButton>
                        <PrimaryButton
                            className="flex-[2] !py-3 text-base"
                            type="submit"
                            fullWidth
                            disabled={ isSubmitting }
                            title={ isSubmitting ? "Sedang membuat room..." : "" }
                        >
                            { isSubmitting ? "Membuat..." : "Buat Room" }
                        </PrimaryButton>
                    </section>
                </div>
            </form>

            { showErrorModal && (
                <ErrorModal
                    message={ errorMess }
                    onClose={ () => setShowErrorModal(false) }
                />
            ) }

        </>
    )
}

export default CreateRoomForm


