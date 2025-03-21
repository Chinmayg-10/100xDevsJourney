import { useState } from "react"

function App() {
    const [count,setCount]=useState(0);

    function OnClickHandler(){
      setCount(count+1);
    }
    return(
      <div>
          <button id="btn" onClick={OnClickHandler}>
          Counter {count}</button>
        </div>
    )
         
  }

export default App
