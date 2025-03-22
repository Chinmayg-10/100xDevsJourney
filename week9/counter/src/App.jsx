// import { useState, useEffect, useActionState } from 'react';
// // import './App.css';

import { useEffect } from "react";
import { useState } from "react";

function Chinmay() {
    return <h2>Chinmay Component</h2>;
}
//conditional rendering
function App(){
  const [counterVisible,setcounterVisible]=useState(true);
  useEffect(()=>{
    setInterval(()=>{
      setcounterVisible(c =>!c)
    },5000);
  },[])

  return(
    <div>
      hi
      {counterVisible ? <Counter></Counter> : null}
      hello
    </div>
  ) 

}

// function Counter() {
//   const [count, setCount] = useState(0);
//   console.log("counter")

//   //gaurd our setInterval from re-renders
//   useEffect(() => {
//     //mounting
//     const interval = setInterval(() => {
//       console.log("mounted")
//       setCount((count) => count + 1);
//     }, 1000);
    
//     // Cleanup function to prevent multiple intervals
//     //unmounting
//     return () => clearInterval(interval);
//   }, []); //dependency array,Cleanup , fetch inside UseEffect

//   function increasecnt() {
//     setCount((count) => count + 1);
//   }

//   return <button onClick={increasecnt}>Counter {count}</button>;
// }

// export default App;

///////////////////////////////////////////////////////////CODE 2///////////////////////////////////
// import { useState, useEffect } from "react";
// function App() {
//     const [count1, setCount1] = useState(0);
//     const [count2, setCount2] = useState(0);
//     function increaseCount() {
//         setCount1(count1 + 1);
//     }
//     function decreaseCount() {
//         setCount2(count2 - 1);
//     }
//     return (
//         <div>
//             <button onClick={increaseCount}>Increase {count1}</button>
//             <button onClick={decreaseCount}>Decrease {count2}</button>
//         </div>
//     );
// }

///////////////////////////////////////////CODE 3///////////////////////////////////////////////////
// function App(){
//     const [count,setCount]=useState(0);
//     //hooking into the lifecycle events of react
//     useEffect(function(){
//         setInterval(function(){
//             setCount(count => count+1)
//         },1000);
//     },[]) //dependency array, cleanup,fetch inside useffect
//     return(
//         <h1>Counter :{count}</h1>
//     )
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////
// Create a functional component called Counter to display the count values passed as props
function Counter(props) {
    // Log message to indicate when the Counter component is re-rendered
    console.log("Counter Component is Rendered");

    // useEffect hook to handle side effects when the component is mounted and unmounted
    useEffect(function () {
        // Log message when the component is mounted
        console.log("Counter Component is mounted");

        // Return a cleanup function that logs when the component is unmounted
        return function () {
            console.log("Counter Component is unmounted");
        };
    }, []); // Empty dependency array ensures this effect runs only once (on mount and unmount)

    // useEffect hook to handle side effects when 'props.count1' changes
    useEffect(
        function () {
            // Log message whenever 'props.count1' changes
            console.log("Count has changed");

            // Return a cleanup function that logs after 'props.count1' changes
            return function () {
                console.log("Cleanup inside second useEffect");
            };
        },
        [props.count1 , props.count2]
    ); // Dependency array makes this effect run only when 'props.count1' changes

    // Render the JSX to display the counter values
    return (
        <div>
            {/* Display the value of 'count1' passed from the parent component */}
            <h2>Counter1: {props.count1}</h2>

            {/* Display the value of 'count2' passed from the parent component */}
            <h2>Counter2: {props.count2}</h2>
        </div>
    );
}

// Export the App component as the default export so it can be imported and used elsewhere
export default App;