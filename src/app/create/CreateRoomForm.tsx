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
        <div className={`w-full flex flex-col items-start justify-center gap-1 px-2 py-1.5 rounded-md bg-hl-primary/50 border ${borderColorClass}`}>
            <div className="w-full flex items-center justify-between">
                <label htmlFor={roleId} className={`text-[.9rem] font-normal w-full ${textColorClass}`}>{roleName}:</label>
                <span className="text-xs text-zinc-500 select-none text-right w-full *:inline cursor-default">
                    <p title="Jumlah Minimal"> { rawConfig.min[roleId] } </p> s/d <p title="Jumlah Maximal">{ rawConfig.max[roleId] }</p> | <p title="Jumlah Rekomendasi">{ "{" }{ rawConfig.recom[roleId] }{ "}" }</p>
                </span>
            </div>
            <HowlRangeVal 
                disabled={ isAllRangeDisabled } 
                max={ rawConfig.max[roleId] } 
                min={ rawConfig.min[roleId] } 
                defaultValue={ getDefaultRoleAmount(roleId) } 
                id={roleId} 
                name={roleId} 
                eventChange={ e => addRoleByAmount(roleId, elToNumber(e)) } 
            />
        </div>
    );
};

import { createRoomAction } from "./actions";

function CreateRoomForm() {


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

    const handleCreateRoom = async (formData: FormData) => {
        await createRoomAction({
            roomName: gameTitle,
            playerCount,
            roleConfig,
        });
    };

    return (
        <form action={handleCreateRoom} className="flex flex-col items-center justify-center gap-4 py-2 w-full">
            <section
                className="flex flex-col items-start justify-center w-full gap-1.5 px-3 py-3 rounded-lg bg-glass-border/40 border border-zinc-700/30">
                <label htmlFor="roomname" className="text-sm font-medium text-zinc-300">Nama Room:</label>
                <input type="text" placeholder="Masukkan nama room" id="roomname" name="roomname" autoComplete="roomname"
                    className="base-input" onChange={ handleRoomName } defaultValue={ gameTitle } />
            </section>
            <section
                className="flex flex-col items-start justify-center w-full gap-1.5 px-3 py-3 rounded-lg bg-glass-border/40 border border-zinc-700/30">
                <label htmlFor="jlhpemain" className="text-sm font-medium text-zinc-300">Jumlah Pemain:</label>
                <HowlRangeVal disabled={ isRoleCombiLocked } eventChange={ e => setPlayerCount(elToNumber(e)) } min={ 7 } max={ 59 } defaultValue={ playerCount } id={ 'jlhpemain' } name={ 'jlhpemain' } />
            </section>

            <section
                className="flex flex-col items-start justify-center w-full gap-1.5 px-3 py-3 rounded-lg bg-glass-border/40 border border-zinc-700/30">
                <div className="flex justify-between w-full items-center">
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

            <section
                className="flex flex-col items-start justify-center w-full gap-1.5 px-3 py-3 rounded-lg bg-glass-border/40 border border-zinc-700/30">
                <HowlProgress
                    min={ 0 }
                    max={ 100 }
                    value={ gameConf.getWerewolfPercentage(roleCombi === 'default' ? rawConfig.recom : roleConfig) }
                    label="Persentase Kekuatan"
                />
                <span className="italic text-[0.6rem] leading-3 pl-0.5 pt-1 -mb-0.5 text-yellow-500/70 cursor-default">Note:
                    <ul className="list-disc list-inside space-y-1">
                        <li>Persentase ini tidak sepenuhnya akurat karna beberapa masalah teknis, terutama jika jumlah pemain kurang dari 30 orang. </li>
                        <li>Persentase ini hanya untuk menunjukkan rata-rata kekuatan dasar semua role, bukan menunjukkan persentase kemungkinan kemenangan.</li>
                    </ul>
                </span>
            </section>

            <section
                className={ `flex flex-col items-start justify-center w-full gap-1.5 px-3 py-3 rounded-lg ${isAllRangeDisabled ? 'opacity-55' : 'opacity-100'} bg-glass-border/40 border border-zinc-700/30` }>
                <div className="flex flex-col w-full">
                    <label className="font-bold text-zinc-200">Kombinasi konfigurasi role</label>
                    <span className="text-xs text-zinc-500">Total terkonfigurasi: { totalAmount }/{ playerCount }</span>
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-0.5 py-2">
                    <span className="text-sm ml-0.5 text-zinc-300">Role Utama:</span>
                    <div className="flex flex-col items-start sm:items-center justify-between gap-2 w-full">
                        <RoleInputItem roleId="warga" roleName="Warga" rawConfig={rawConfig} isAllRangeDisabled={isAllRangeDisabled} getDefaultRoleAmount={getDefaultRoleAmount} addRoleByAmount={addRoleByAmount} />
                        <RoleInputItem roleId="werewolf" roleName="Werewolf" isRed rawConfig={rawConfig} isAllRangeDisabled={isAllRangeDisabled} getDefaultRoleAmount={getDefaultRoleAmount} addRoleByAmount={addRoleByAmount} />
                    </div>
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-0.5 py-2">
                    <span className="text-sm ml-0.5 text-zinc-300">Role Pelengkap:</span>
                    <div className="flex flex-col items-start sm:items-center justify-between gap-2 w-full">
                        <RoleInputItem roleId="peramal" roleName="Peramal" rawConfig={rawConfig} isAllRangeDisabled={isAllRangeDisabled} getDefaultRoleAmount={getDefaultRoleAmount} addRoleByAmount={addRoleByAmount} />
                        <RoleInputItem roleId="penyihir" roleName="Penyihir" rawConfig={rawConfig} isAllRangeDisabled={isAllRangeDisabled} getDefaultRoleAmount={getDefaultRoleAmount} addRoleByAmount={addRoleByAmount} />
                        <RoleInputItem roleId="pemburu" roleName="Pemburu" rawConfig={rawConfig} isAllRangeDisabled={isAllRangeDisabled} getDefaultRoleAmount={getDefaultRoleAmount} addRoleByAmount={addRoleByAmount} />
                        <RoleInputItem roleId="dukun" roleName="Dukun" rawConfig={rawConfig} isAllRangeDisabled={isAllRangeDisabled} getDefaultRoleAmount={getDefaultRoleAmount} addRoleByAmount={addRoleByAmount} />
                        <RoleInputItem roleId="raja" roleName="Raja" rawConfig={rawConfig} isAllRangeDisabled={isAllRangeDisabled} getDefaultRoleAmount={getDefaultRoleAmount} addRoleByAmount={addRoleByAmount} />
                        <RoleInputItem roleId="blackwolf" roleName="Blackwolf" isRed rawConfig={rawConfig} isAllRangeDisabled={isAllRangeDisabled} getDefaultRoleAmount={getDefaultRoleAmount} addRoleByAmount={addRoleByAmount} />
                        <RoleInputItem roleId="shapeshifter" roleName="Shapeshifter" isRed rawConfig={rawConfig} isAllRangeDisabled={isAllRangeDisabled} getDefaultRoleAmount={getDefaultRoleAmount} addRoleByAmount={addRoleByAmount} />
                    </div>
                </div>
            </section>

            <section className="flex items-center justify-center w-full gap-4 px-1 pt-2">
                <OutlineButton
                    onClick={ () => reset() }
                    disabled={ isRoleCombiLocked }
                    title={ isRoleCombiLocked ? "Tombol dikunci, buka diatas!" : "Tombol ini akan mereset kombinasi set role" }
                    className="flex-1 !py-2.5 font-semibold disabled:cursor-not-allowed disabled:opacity-45"
                >
                    Reset
                </OutlineButton>
                <PrimaryButton className="flex-1" type="submit">Buat Room</PrimaryButton>
            </section>


        </form>
    )
}

export default CreateRoomForm


