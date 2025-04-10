import { useEffect, useRef, useState } from 'react'

//custom Hook
// function useCounter(){
//   const [count, setCount] = useState(0);
//   function increaseCount(){
//     setCount(c=>c+1);
//   }
//   return{
//     count:count,
//     increaseCount:increaseCount
//   }
// }

// function App() {
//   const {count, increaseCount} = useCounter()

//   return (
//     <>
//       <button onClick={increaseCount}>Counter {count}</button>
//     </>
//   )
// }


//Json object fetch
import { UsepostTitle } from './Usepost'
import { useFetch } from './Usepost'
import { usePrev } from './use-prev';
// function App(){
//   const postTitle=UsepostTitle();
//   return<>
//   {postTitle}
//   </>
// }
// function App(){
//   const[currentPost,setCurrentpost]=useState(1);
//   const {FinalData,Loading}=useFetch("https://jsonplaceholder.typicode.com/posts/"+currentPost);
//   return(<>
//   <button onClick={()=>{setCurrentpost(1)}}>1</button>
//   <button onClick={()=>{setCurrentpost(2)}}>2</button>
//   <button onClick={()=>{setCurrentpost(3)}}>3</button>
//   {Loading?"Loading....":JSON.stringify(FinalData)}</>)
// }


//use-Prev custom hook
// function App(){
//   const[state,Setstate]=useState(0);
//   const prev=usePrev(state)
//   function increaseCnt(){
//     Setstate(c=>c+1);
//   }
//   return(
//     <div>
//       <p>{state}</p>
//       <button onClick={increaseCnt}>Click me</button>
//       <p>the previous value was {prev}</p>
//     </div>
//   )
// }


//UseDebounced HOOK
function useDebounce(originalFn){
  const currentClock=useRef();

  const fn=()=>{
    clearTimeout(currentClock.current);
    currentClock.current=setTimeout(originalFn,200);
  }
  return fn;
} 
function App(){
  async function sendDatatoBackend(){
    await fetch("api.amazon.com/search/");
  }
  const debouncedFn=useDebounce(sendDatatoBackend);

  return(
    <>
    <input type="text" onChange={debouncedFn}/></>
  )
}
export default App
