import { useEffect, useRef } from "react";

export function usePrev(value){
    const ref=useRef();//1

    useEffect(()=>{
        ref.current=value;//3
    },[value])

    return(
        ref.current //it returns first then ,effect gets call later //2
    )
}