import { useEffect, useState } from "react"

export const useDebounce = (value : string, delay = 500) => {
    const [debounce, setDebounce] = useState<string>(value);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounce(value);
        }, delay)

        return () => clearTimeout(timeout);
    }, [value, delay])
    return debounce;
}