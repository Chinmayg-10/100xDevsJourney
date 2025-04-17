import { createContext, useContext, useState ,useEffect,memo} from "react";
import React from "react";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { CounterAtom, evenSelector } from "./store/atom/Counter";
// const CountContext=createContext();
// function CountContextProvider({children}){
//   const[count,setCount]=useState(0);
//   return<CountContext.Provider value={{count,setCount}}>
//     {children}
//   </CountContext.Provider>
// }
// function App(){
//   return<>
//     <Parent/>
//   </>
// }
// function Parent() {
//   return (
//     <CountContextProvider>
//       <Increase />
//       <Decrease />
//       <Value />
//     </CountContextProvider>
//   );
// }
// function Increase(){
//   const {setCount}=useContext(CountContext);
//   function increase(){
//     setCount(c=>c+1)
//   }
//   return(
//     <button onClick={increase}>Increase</button>
//   )
// }
// function Decrease(){
//   const {setCount}=useContext(CountContext);
//   function decrease(){
//     setCount(c=>c-1)
//   }
//   return(
//     <button onClick={decrease}>Decrease</button>
//   )
// }
// function Value(){
//   const{count}=useContext(CountContext);
//   return(
//     <p>Count: {count}</p>
//   )
// }

//Recoil
// function App() {
//   return (
//     <RecoilRoot>
//       <Counter/>
//     </RecoilRoot>
//   );
// }

// function Counter() {
//   return (
//     <div>
//       <h1>Counter App</h1>
//       <CurrentCount />
//       <Increase />
//       <Decrease />
//     </div>
//   );
// }

// function CurrentCount() {
//   const count = useRecoilValue(CounterAtom);
//   return <p>Count: {count}</p>;
// }


// function Increase() {
//   const setCount = useSetRecoilState(CounterAtom);
//   return <button onClick={() => setCount((c) => c + 1)}>Increase</button>;
// }

// function Decrease() {
//   const setCount = useSetRecoilState(CounterAtom);
//   return <button onClick={() => setCount((c) => c - 1)}>Decrease</button>;
// }


//MEMO
// function App() {
//   return (
//       <Counter />
//   );
// }

// function Counter() {
//   const[count,setCount]=useState(1);
//   useEffect(()=>{
//     setInterval(()=>{
//       setCount(c=>c+1)
//     },3000)
//   },[])
//   return (
//     <div>
//       <CurrentCount />
//       <Increase />
//       <Decrease />
//     </div>
//   );
// }

// const CurrentCount=memo(()=> {
//   return <p>{1}</p>;
// })


// const Increase=memo(()=> {
  
//   function increase(){

//   }
//   return <button onClick={increase}>Increase</button>;
// })

// const Decrease=memo(()=> {
//   function decrease(){

//   }
//   return <button onClick={decrease}>Decrease</button>;
// })

//Selector
function App(){
  return(
    <RecoilRoot>
      <Buttons/>
      <Counter/>
      <IsEven/>
    </RecoilRoot>   
  )
}
function Buttons(){
  const setCount=useSetRecoilState(CounterAtom);
  function increase(){
    setCount(c=>c+2);
  }
  function decrease(){
    setCount(c=>c-1)
  }
  return <div>
    <button onClick={increase}>Increase</button>
    <button onClick={decrease}>Decrease</button>
  </div>
  
}
function Counter(){
  const count=useRecoilValue(CounterAtom);
  return(
    <p>{count}</p>
  )
}
function IsEven(){
  const even=useRecoilValue(evenSelector);
  return<>
  {even?"Even":"Odd"}
  </>
}
export default App;

