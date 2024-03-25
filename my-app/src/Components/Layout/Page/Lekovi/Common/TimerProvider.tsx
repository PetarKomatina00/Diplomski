import { createContext, useContext, useEffect, useState } from "react";

const TimerContext= createContext<{
    timeInSeconds : number,
    setTimeInSeconds : (time : number) => void
}>({
    timeInSeconds : 0, 
    setTimeInSeconds: () => {}
});

export const TimerProvider = ({children} : any) => {

    const time : string | null = (localStorage.getItem("time"))
    let timeInSec = 0;
    if(time !== null){
        timeInSec = parseInt(time);
    }
    const [timeInSeconds, setTimeInSeconds] = useState<number>(timeInSec)
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeInSeconds((time) => time - 1);
        }, 1000)
        return () => clearInterval(timer);
    }, [timeInSeconds])
    return (
        <TimerContext.Provider value = {{timeInSeconds, setTimeInSeconds}}>
            {children}
        </TimerContext.Provider>
    )
}
export const useTimer = () => useContext(TimerContext);