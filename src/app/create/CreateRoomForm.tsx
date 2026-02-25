'use client';

import HowlProgress from "@c/Form/HowlProgress";
import HowlRangeVal from "@c/Form/HowlRangeVal";
import RoleBalance from "@/lib/roleConfig";
import useGameConfigStore from "@/stores/gameConfigStore";
import type { RoleConfig } from "@/types/roleconfig";
import { useEffect, useMemo, useRef, useCallback, useState, FormEvent } from "react";
import useThrottle from "@/lib/useThrottle";
import RoleSetButton from "@c/Form/RoleSetButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/pro-light-svg-icons";

function elToNumber(el: FormEvent<HTMLInputElement>): number {
    return Number((el.target as HTMLInputElement).value);
}

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

    return (
        <form className="flex flex-col items-center justify-center gap-4 py-2 w-full">
            <section
                className="flex flex-col items-start justify-center w-full gap-1.5 px-3 py-3 rounded-lg bg-glass-border/40 border border-zinc-700/30">
                <label htmlFor="roomname" className="text-sm font-medium text-zinc-300">Nama Room:</label>
                <input type="text" placeholder="Masukkan nama room" id="roomname" name="roomname" autoComplete="roomname"
                    className="auth-input" onChange={handleRoomName} defaultValue={gameTitle} />
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
                        <FontAwesomeIcon icon={ isRoleCombiLocked ? faLock : faLockOpen } className="h-fit w-fit" />
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
                        <div
                            className="w-full flex flex-col items-start justify-center gap-1 px-2 py-1.5 rounded-md bg-hl-primary/50 border border-cyan-400/25">
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor={ 'warga' } className="text-[.9rem] font-normal w-full text-cyan-400">Warga:</label>
                                <span className="text-xs text-zinc-500 select-none text-right w-full *:inline cursor-default">
                                    <p title="Jumlah Minimal"> { rawConfig.min.warga } </p> s/d <p title="Jumlah Maximal">{ rawConfig.max.warga }</p> | <p title="Jumlah Rekomendasi">{ "{" }{ rawConfig.recom.warga }{ "}" }</p>
                                </span>
                            </div>
                            <HowlRangeVal disabled={ isAllRangeDisabled } max={ rawConfig.max.warga } min={ rawConfig.min.warga } defaultValue={ getDefaultRoleAmount('warga') } id="warga" name="warga" eventChange={ e => addRoleByAmount("warga", elToNumber(e)) } />
                        </div>
                        <div
                            className="w-full flex flex-col items-start justify-center gap-1 px-2 py-1.5 rounded-md bg-hl-primary/50 border border-red-700/35">
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor={ 'werewolf' }
                                    className="text-[.9rem] font-normal w-full text-red-400">Werewolf:</label>
                                <span className="text-xs text-zinc-500 select-none text-right w-full *:inline cursor-default">
                                    <p title="Jumlah Minimal"> { rawConfig.min.werewolf } </p> s/d <p title="Jumlah Maximal">{ rawConfig.max.werewolf }</p> | <p title="Jumlah Rekomendasi">{ "{" }{ rawConfig.recom.werewolf }{ "}" }</p>
                                </span>
                            </div>
                            <HowlRangeVal disabled={ isAllRangeDisabled } eventChange={ e => addRoleByAmount("werewolf", elToNumber(e)) } max={ rawConfig.max.werewolf } min={ rawConfig.min.werewolf } defaultValue={ getDefaultRoleAmount('werewolf') } id="werewolf" name="werewolf" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-0.5 py-2">
                    <span className="text-sm ml-0.5 text-zinc-300">Role Pelengkap:</span>
                    <div className="flex flex-col items-start sm:items-center justify-between gap-2 w-full">
                        <div
                            className="w-full flex flex-col items-start justify-center gap-1 px-2 py-1.5 rounded-md bg-hl-primary/50 border border-cyan-400/25">
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor={ 'peramal' }
                                    className="text-[.9rem] font-normal w-full text-cyan-400">Peramal:</label>
                                <span className="text-xs text-zinc-500 select-none text-right w-full *:inline cursor-default">
                                    <p title="Jumlah Minimal"> { rawConfig.min.peramal } </p> s/d <p title="Jumlah Maximal">{ rawConfig.max.peramal }</p> | <p title="Jumlah Rekomendasi">{ "{" }{ rawConfig.recom.peramal }{ "}" }</p>
                                </span>
                            </div>
                            <HowlRangeVal disabled={ isAllRangeDisabled } eventChange={ e => addRoleByAmount("peramal", elToNumber(e)) } max={ rawConfig.max.peramal } min={ rawConfig.min.peramal } defaultValue={ getDefaultRoleAmount('peramal') } id="peramal" name="peramal" />
                        </div>
                        <div
                            className="w-full flex flex-col items-start justify-center gap-1 px-2 py-1.5 rounded-md bg-hl-primary/50 border border-cyan-400/25">
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor={ 'penyihir' }
                                    className="text-[.9rem] font-normal w-full text-cyan-400">Penyihir:</label>
                                <span className="text-xs text-zinc-500 select-none text-right w-full *:inline cursor-default">
                                    <p title="Jumlah Minimal"> { rawConfig.min.penyihir } </p> s/d <p title="Jumlah Maximal">{ rawConfig.max.penyihir }</p> | <p title="Jumlah Rekomendasi">{ "{" }{ rawConfig.recom.penyihir }{ "}" }</p>
                                </span>
                            </div>
                            <HowlRangeVal disabled={ isAllRangeDisabled } eventChange={ e => addRoleByAmount("penyihir", elToNumber(e)) } max={ rawConfig.max.penyihir } min={ rawConfig.min.penyihir } defaultValue={ getDefaultRoleAmount('penyihir') } id="penyihir" name="penyihir" />
                        </div>
                        <div
                            className="w-full flex flex-col items-start justify-center gap-1 px-2 py-1.5 rounded-md bg-hl-primary/50 border border-cyan-400/25">
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor={ 'pemburu' }
                                    className="text-[.9rem] font-normal w-full text-cyan-400">Pemburu:</label>
                                <span className="text-xs text-zinc-500 select-none text-right w-full *:inline cursor-default">
                                    <p title="Jumlah Minimal"> { rawConfig.min.pemburu } </p> s/d <p title="Jumlah Maximal">{ rawConfig.max.pemburu }</p> | <p title="Jumlah Rekomendasi">{ "{" }{ rawConfig.recom.pemburu }{ "}" }</p>
                                </span>
                            </div>
                            <HowlRangeVal disabled={ isAllRangeDisabled } eventChange={ e => addRoleByAmount("pemburu", elToNumber(e)) } max={ rawConfig.max.pemburu } min={ rawConfig.min.pemburu } defaultValue={ getDefaultRoleAmount('pemburu') } id="pemburu" name="pemburu" />
                        </div>
                        <div
                            className="w-full flex flex-col items-start justify-center gap-1 px-2 py-1.5 rounded-md bg-hl-primary/50 border border-cyan-400/25">
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor={ 'dukun' }
                                    className="text-[.9rem] font-normal w-full text-cyan-400">Dukun:</label>
                                <span className="text-xs text-zinc-500 select-none text-right w-full *:inline cursor-default">
                                    <p title="Jumlah Minimal"> { rawConfig.min.dukun } </p> s/d <p title="Jumlah Maximal">{ rawConfig.max.dukun }</p> | <p title="Jumlah Rekomendasi">{ "{" }{ rawConfig.recom.dukun }{ "}" }</p>
                                </span>
                            </div>
                            <HowlRangeVal disabled={ isAllRangeDisabled } eventChange={ e => addRoleByAmount("dukun", elToNumber(e)) } max={ rawConfig.max.dukun } min={ rawConfig.min.dukun } defaultValue={ getDefaultRoleAmount('dukun') } id="dukun" name="dukun" />
                        </div>
                        <div
                            className="w-full flex flex-col items-start justify-center gap-1 px-2 py-1.5 rounded-md bg-hl-primary/50 border border-cyan-400/25">
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor={ 'raja' }
                                    className="text-[.9rem] font-normal w-full text-cyan-400">Raja:</label>
                                <span className="text-xs text-zinc-500 select-none text-right w-full *:inline cursor-default">
                                    <p title="Jumlah Minimal"> { rawConfig.min.raja } </p> s/d <p title="Jumlah Maximal">{ rawConfig.max.raja }</p> | <p title="Jumlah Rekomendasi">{ "{" }{ rawConfig.recom.raja }{ "}" }</p>
                                </span>
                            </div>
                            <HowlRangeVal disabled={ isAllRangeDisabled } eventChange={ e => addRoleByAmount("raja", elToNumber(e)) } max={ rawConfig.max.raja } min={ rawConfig.min.raja } defaultValue={ getDefaultRoleAmount('raja') } id="raja" name="raja" />
                        </div>
                        <div
                            className="w-full flex flex-col items-start justify-center gap-1 px-2 py-1.5 rounded-md bg-hl-primary/50 border border-red-700/35">
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor={ 'blackwolf' }
                                    className="text-[.9rem] font-normal w-full text-red-400">Blackwolf:</label>
                                <span className="text-xs text-zinc-500 select-none text-right w-full *:inline cursor-default">
                                    <p title="Jumlah Minimal"> { rawConfig.min.blackwolf } </p> s/d <p title="Jumlah Maximal">{ rawConfig.max.blackwolf }</p> | <p title="Jumlah Rekomendasi">{ "{" }{ rawConfig.recom.blackwolf }{ "}" }</p>
                                </span>
                            </div>
                            <HowlRangeVal disabled={ isAllRangeDisabled } eventChange={ e => addRoleByAmount("blackwolf", elToNumber(e)) } max={ rawConfig.max.blackwolf } min={ rawConfig.min.blackwolf } defaultValue={ getDefaultRoleAmount('blackwolf') } id="blackwolf"
                                name="blackwolf" />
                        </div>
                        <div
                            className="w-full flex flex-col items-start justify-center gap-1 px-2 py-1.5 rounded-md bg-hl-primary/50 border border-red-700/35">
                            <div className="w-full flex items-center justify-between">
                                <label htmlFor={ 'shapeshifter' }
                                    className="text-[.9rem] font-normal w-full text-red-400">Shapeshifter:</label>
                                <span className="text-xs text-zinc-500 select-none text-right w-full *:inline cursor-default">
                                    <p title="Jumlah Minimal"> { rawConfig.min.shapeshifter } </p> s/d <p title="Jumlah Maximal">{ rawConfig.max.shapeshifter }</p> | <p title="Jumlah Rekomendasi">{ "{" }{ rawConfig.recom.shapeshifter }{ "}" }</p>
                                </span>
                            </div>
                            <HowlRangeVal disabled={ isAllRangeDisabled } eventChange={ e => addRoleByAmount("shapeshifter", elToNumber(e)) } max={ rawConfig.max.shapeshifter } min={ rawConfig.min.shapeshifter } defaultValue={ getDefaultRoleAmount('shapeshifter') } id="shapeshifter"
                                name="shapeshifter" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex items-center justify-center w-full gap-4 px-1 pt-2">
                <button
                    onClick={ () => reset() }
                    disabled={ isRoleCombiLocked }
                    title={ isRoleCombiLocked ? "Tombol dikunci, buka diatas!" : "Tombol ini akan mereset kombinasi set role" }
                    className="auth-oauth-btn flex-1 !py-2.5 font-semibold disabled:cursor-not-allowed disabled:opacity-45"
                    type="button">Reset
                </button>
                <button
                    className="auth-submit-btn flex-1"
                    type="submit">Buat Room
                </button>
            </section>


        </form>
    )
}

export default CreateRoomForm


