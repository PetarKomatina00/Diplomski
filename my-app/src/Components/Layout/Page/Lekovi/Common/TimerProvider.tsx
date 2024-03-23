import { createContext, useContext, useEffect, useState } from "react";

const TimerContext= createContext<{
    timeInSeconds : number,
    setTimeInSeconds : (time : number) => void
}>({
    timeInSeconds : 0, 
    setTimeInSeconds: () => {}
});

export const TimerProvider = ({children} : any) => {
    const [timeInSeconds, setTimeInSeconds] = useState<number>(0)
    useEffect(() => {
        const timer = setTimeout(() => {
            //console.log(timeInSeconds)
            setTimeInSeconds((time) => time + 1);
        }, 1000)
        return () => clearTimeout(timer);
    }, [timeInSeconds])
    return (
        <TimerContext.Provider value = {{timeInSeconds, setTimeInSeconds}}>
            {children}
        </TimerContext.Provider>
    )
}
export const useTimer = () => useContext(TimerContext);