import {useCallback} from "react";
import {PackState} from "@/app/components/dashboard/Dashboard";
import {ToggleButton} from "@/app/components/button/ToggleButton";

export function PackTypeSelector({selectedTypes, setSelectedTypes}: { selectedTypes: PackState[], setSelectedTypes: (types: PackState[]) => void }) {
    const toggleType = useCallback((type: PackState) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter(t => t !== type))
        } else {
            const newValue = [...selectedTypes, type];
            if (newValue.length == Object.keys(PackState).length) {
                setSelectedTypes([])
            } else {
                setSelectedTypes(newValue)
            }
        }
    }, [selectedTypes])
    const setAllTypes = useCallback(() => {
        setSelectedTypes([])
    }, [])
    const isSelected = useCallback((type: PackState | null) => {
        if (type === null) {
            return selectedTypes.length === 0
        } else {
            return selectedTypes.includes(type);
        }
    }, [selectedTypes])
    return <div className="flex gap-4">
        <ToggleButton selected={isSelected(null)} onClick={setAllTypes}>All</ToggleButton>
        <ToggleButton selected={isSelected(PackState.CREATED)}
                      onClick={() => toggleType(PackState.CREATED)}>Created</ToggleButton>
        <ToggleButton selected={isSelected(PackState.OPENED)}
                      onClick={() => toggleType(PackState.OPENED)}>Claimed</ToggleButton>
        <ToggleButton selected={isSelected(PackState.REVOKED)}
                      onClick={() => toggleType(PackState.REVOKED)}>Revoked</ToggleButton>
    </div>
}
