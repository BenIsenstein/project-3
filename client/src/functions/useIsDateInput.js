import { useMemo } from 'react'

const useIsDateInput = () => {
    const dateInputNames = useMemo(() => ['date', 'start', 'end', 'next recurring date', 'dateCompleted', 'dateSignedUp', "possessionDateByOwner"], [])
    const isDateInput = useMemo(() => (name) => dateInputNames.includes(name), [dateInputNames])

    return isDateInput
}

export { useIsDateInput }
