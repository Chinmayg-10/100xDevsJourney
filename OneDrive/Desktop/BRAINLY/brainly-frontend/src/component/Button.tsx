import type { ReactElement } from "react";

interface ButtonProps{
    varient:"primary"|"secondary";
    size:"sm"|"md"|"lg";
    text:string;
    startIcon?:ReactElement;
    endIcon?:ReactElement;
    onClick?:()=>void;
}
const sizeStyle={
    "sm":"py-1 px-2",
    "md":"py-2 px-4",
    "lg":"py-4 px-6"
}
const varientStyles={
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-300 text-purple-600" 
}
export const Button=(props:ButtonProps)=>{
    return <button onClick={props.onClick} className={`${varientStyles[props.varient]} ${sizeStyle[props.size]} rounded-md flex items-center`}>{props.startIcon}{props.text}{props.endIcon}</button>
} 