import { useRef, useState } from "react";


// function App() {
//   const inputRef=useRef();
//   function Onfocus(){
//     // document.getElementById("name").focus();
//     inputRef.current.focus();
//   }

//   return (
//     <>
//     Signup
//       <input ref={inputRef} id="name" type="text" />
//       <input type="text" />
//       <button onClick={Onfocus}>Submit</button>
//     </>
//   )
// }

//Clock with Start and Stop Functionality(With the help of useSate)

// function App(){
//   const[currentCount,SetcurrentCount]=useState(0);
//   const[timer,SetTimer]=useState(0);
//   function StartClock(){
//     let value=setInterval(()=>{
//       SetcurrentCount(c=>c+1)
//     },1000)
//     SetTimer(value);
//   }

//   function StopClock(){
//     clearInterval(timer);
//   }

//   return(
//     <>
//       {currentCount}
//       <br />
//       <button onClick={StartClock}>Start</button>
//       <button onClick={StopClock}>Stop</button>
//     </>
//   )
// }

//Start Stop Clock with the help of UseRef
function App(){
  const[currentCount,SetcurrentCount]=useState(0);
  const timer=useRef();
  function StartClock(){
    let value=setInterval(()=>{
      SetcurrentCount(c=>c+1)
    },1000)
    timer.current=value;
  }
  
  function StopClock(){
    clearInterval(timer.current);
  }

  return(
    <>
      {currentCount}
      <br />
      <button onClick={StartClock}>Start</button>
      <button onClick={StopClock}>Stop</button>
    </>
  )
}
export default App
