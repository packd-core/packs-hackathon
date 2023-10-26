import {useCallback} from "react";
import {PackState} from "@/app/components/dashboard/Dashboard";
import {ToggleButton} from "@/app/components/button/ToggleButton";

export function PackTypeSelector({selectedTypes, setSelectedTypes}: { selectedTypes: PackState[], setSelectedTypes: (types: PackState[]) => void }) {
    const toggleType = useCallback((type: PackState) => {
        setSelectedTypes([type])
    }, [setSelectedTypes])
    const setAllTypes = useCallback(() => {
        setSelectedTypes([])
    }, [setSelectedTypes])
    const isSelected = useCallback((type: PackState | null) => {
        if (type === null) {
            return selectedTypes.length === 0
        } else {
            return selectedTypes.includes(type);
        }
    }, [selectedTypes])
    return <div className="flex md:gap-4 sm:gap-2 gap-1 flex-wrap">
        <ToggleButton selected={isSelected(null)} onClick={setAllTypes}>All</ToggleButton>
        <ToggleButton selected={isSelected(PackState.CREATED)}
                      onClick={() => toggleType(PackState.CREATED)}>Created</ToggleButton>
        <ToggleButton selected={isSelected(PackState.OPENED)}
                      onClick={() => toggleType(PackState.OPENED)}>Claimed</ToggleButton>
        {/*<ToggleButton selected={isSelected(PackState.REVOKED)}*/}
        {/*              onClick={() => toggleType(PackState.REVOKED)}>Revoked</ToggleButton>*/}
    </div>
}
