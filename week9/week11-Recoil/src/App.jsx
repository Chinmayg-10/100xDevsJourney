import { createContext, useContext, useState } from "react";

const CountContext=createContext();
function CountContextProvider({children}){
  const[count,setCount]=useState(0);
  return<CountContext.Provider value={{count,setCount}}>
    {children}
  </CountContext.Provider>
}
function App(){
  return<>
    <Parent/>
  </>
}
function Parent() {
  return (
    <CountContextProvider>
      <Increase />
      <Decrease />
      <Value />
    </CountContextProvider>
  );
}
function Increase(){
  const {setCount}=useContext(CountContext);
  function increase(){
    setCount(c=>c+1)
  }
  return(
    <button onClick={increase}>Increase</button>
  )
}
function Decrease(){
  const {setCount}=useContext(CountContext);
  function decrease(){
    setCount(c=>c-1)
  }
  return(
    <button onClick={decrease}>Decrease</button>
  )
}
function Value(){
  const{count}=useContext(CountContext);
  return(
    <p>Count: {count}</p>
  )
}
export default App;
