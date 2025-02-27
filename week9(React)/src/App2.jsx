import { useState } from "react";
import "./App2.css";
export default function App(){
    // function increase_cnt(){
    //     const currentVal=document.getElementById("btn").innerHTML;
    //     const currentCounter=currentVal.split(" ")[1];
    //     const newValue=parseInt(currentCounter)+1;
    //     document.getElementById("btn").innerHTML="counter "+newValue;
    // }
    const [count,setCount]=useState(0);
    function increase_cnt(){
        setCount(count+1);
    }
    return(
        <div>
            <button id="btn" onClick={increase_cnt}>Counter {count}</button>
        </div>
        
    );

}