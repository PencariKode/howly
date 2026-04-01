import useGameConfigStore from "@/stores/gameConfigStore";
import type { RoleConfig } from "@/types/roleconfig";

function RoleSetButton({ roleConfig }: { roleConfig: RoleConfig }) {
    const {
        roleCombi, setRoleCombi,
        isRoleCombiLocked, setRoleConfig
    } = useGameConfigStore((state) => state);

    function setRoleConfigAndCombiToDefault() {
        setRoleConfig(roleConfig);
        setRoleCombi("default");
    }

    return (
        <span className="w-full flex items-center py-2 justify-around gap-2 min-h-10 h-fit px-2 rounded-md bg-hl-primary/60 border border-zinc-700/40">
            <button
                className={ `rounded-md cursor-pointer hover:scale-102 disabled:opacity-45 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all duration-200 ${roleCombi === "default" ? 'primary-btn !px-3 !py-1.5 text-sm' : 'text-zinc-400 hover:text-zinc-200 bg-glass/60 border border-zinc-700/50 px-3 py-1.5 text-sm'} ` }
                onClick={ setRoleConfigAndCombiToDefault }
                type="button"
                disabled={ isRoleCombiLocked }
                title="Default Role configuration"
            >
                Default
            </button>
            <button
                className={ `rounded-md cursor-pointer hover:scale-102 disabled:opacity-45 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all duration-200 ${roleCombi === "custom" ? 'primary-btn !px-3 !py-1.5 text-sm' : 'text-zinc-400 hover:text-zinc-200 bg-glass/60 border border-zinc-700/50 px-3 py-1.5 text-sm'} ` }
                onClick={ () => setRoleCombi("custom") }
                type="button"
                disabled={ isRoleCombiLocked }
                title="Custom Role configuration"
            >
                Custom
            </button>
            <input type="hidden" name="roleSet" value={ roleCombi } />
        </span>
    )
}

export default RoleSetButton
