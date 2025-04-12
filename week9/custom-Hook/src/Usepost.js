import { useState,useEffect } from "react";
export function UsepostTitle(){
    const[post,Setpost]=useState({});

  async function getposts(){
    const response=await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const json=await response.json();
    Setpost(json);
  }
  //we cannot make function inside useEffect to be async 
  useEffect(()=>{
    getposts()
  },[]);
  return post.title;
}
export function useFetch(url){
    const [FinalData,setFinalData]=useState({});
    const [Loading,setLoading]=useState(true);
    
    async function getFinal(){
        setLoading(true)
        const response=await fetch(url);
        const json=await response.json();
        setFinalData(json);
        setLoading(false)

    }
    useEffect(()=>{
        getFinal();
    },[url])

    //Refetching
    useEffect(()=>{
        setInterval(getFinal,5*1000);//cleanup
    },[])
    return(
        {FinalData,Loading}
    )
}