import useGameConfigStore from "@/stores/gameConfigStore";
import type { RoleConfig } from "@/types/roleconfig";

function RoleSetButton({roleConfig}:{roleConfig: RoleConfig}) {
    const { 
        roleCombi, setRoleCombi,
        isRoleCombiLocked, setRoleConfig
    } = useGameConfigStore((state) => state);

    function setRoleConfigAndCombiToDefault() {
        setRoleConfig(roleConfig);
        setRoleCombi("default");
    }

    return (
        <span className="minMaxWidth flex items-center py-2 justify-around gap-2 bg-hl-secondary min-h-10 h-fit px-2 rounded-md">
            <button
                className={ ` rounded-sm cursor-pointer border-2 px-3 py-1.5 text-sm hover:scale-102 disabled:opacity-45 disabled:hover:scale-100 disabled:cursor-not-allowed ${roleCombi === "default" ? 'activeRoleSetBtn' : 'inactiveRoleSetBtn'} ` }
                onClick={ setRoleConfigAndCombiToDefault }
                type="button"
                disabled={isRoleCombiLocked}
                title="Default Role configuration"
            >
                Default
            </button>
            <button
                className={ ` rounded-sm cursor-pointer border-2 px-3 py-1.5 text-sm hover:scale-102 disabled:opacity-45 disabled:hover:scale-100 disabled:cursor-not-allowed ${roleCombi === "custom" ? 'activeRoleSetBtn' : 'inactiveRoleSetBtn'} ` }
                onClick={ () => setRoleCombi("custom") }
                type="button"
                disabled={isRoleCombiLocked}
                title="Custom Role configuration"
            >
                Custom
            </button>
            <input type="hidden" name="roleSet" value={ roleCombi } />
        </span>
    )
}

export default RoleSetButton
