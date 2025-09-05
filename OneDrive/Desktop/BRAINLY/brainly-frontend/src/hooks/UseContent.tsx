import { useEffect, useState } from "react";
import { backendUrl } from "../config";
import axios from "axios";
export function useContent(){
    const[contents,setContents]=useState([]);
    const token=localStorage.getItem("token");
    async function refresh(){
        await axios.get(`${backendUrl}/api/v1/content`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
            .then((response)=>{
                setContents(response.data.content)
            })
    }
    useEffect(()=>{
        refresh();
        let interval=setInterval(()=>{
            refresh();
        },10*1000)
        return ()=>{
            clearInterval(interval)
        }
    },[])
    return {contents,refresh};
}