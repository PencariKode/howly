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
        <span className="w-full flex items-center py-2 justify-around gap-2 min-h-10 h-fit px-2 rounded-md" style={ { background: 'rgba(20, 20, 28, 0.6)', border: '1px solid rgba(63, 63, 70, 0.4)' } }>
            <button
                className={ ` rounded-md cursor-pointer px-3 py-1.5 text-sm hover:scale-102 disabled:opacity-45 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all duration-200 ${roleCombi === "default" ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'} ` }
                style={ roleCombi === "default" ? { background: 'linear-gradient(135deg, #6b1525, #a63445)', border: '1px solid rgba(166, 52, 69, 0.6)' } : { background: 'rgba(41, 41, 56, 0.6)', border: '1px solid rgba(63, 63, 70, 0.5)' } }
                onClick={ setRoleConfigAndCombiToDefault }
                type="button"
                disabled={ isRoleCombiLocked }
                title="Default Role configuration"
            >
                Default
            </button>
            <button
                className={ ` rounded-md cursor-pointer px-3 py-1.5 text-sm hover:scale-102 disabled:opacity-45 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all duration-200 ${roleCombi === "custom" ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'} ` }
                style={ roleCombi === "custom" ? { background: 'linear-gradient(135deg, #6b1525, #a63445)', border: '1px solid rgba(166, 52, 69, 0.6)' } : { background: 'rgba(41, 41, 56, 0.6)', border: '1px solid rgba(63, 63, 70, 0.5)' } }
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
