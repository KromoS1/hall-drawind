import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";

type AppDispatchType = ThunkDispatch<RootState, void, AnyAction>

export const useAppSelector = () => {
    return useSelector<RootState, RootState>(state => state);
}
export const useAppDispatch = () => useDispatch<AppDispatchType>();

interface UseBooleanOutput {
    value: boolean
    setValue: Dispatch<SetStateAction<boolean>>
    setTrue: () => void
    setFalse: () => void
    toggle: () => void
}

export function useBoolean(defaultValue?: boolean): UseBooleanOutput {
    const [value, setValue] = useState(!!defaultValue)

    const setTrue = useCallback(() => setValue(true), [])
    const setFalse = useCallback(() => setValue(false), [])
    const toggle = useCallback(() => setValue(x => !x), [])

    return { value, setValue, setTrue, setFalse, toggle }
}

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}