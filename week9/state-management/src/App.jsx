import { createContext, useContext, useState } from 'react'

// function App() {
//   return <div>
//     <LightBulb />
//   </div>
// }

// function LightBulb() {
//   const [bulbOn, setBulbOn] = useState(true)

//   return <div>
//     <BulbState bulbOn={bulbOn} />
//     <ToggleBulbState setBulbOn={setBulbOn} />
//   </div>
// }

// //bulbOn is a prop to BulbState component
// function BulbState({bulbOn}) {
//   return <div>
//     {bulbOn ? "Bulb on" : "Bulb off"}
//   </div>
// }

// function ToggleBulbState({setBulbOn}) {

//   function toggle() {
//     setBulbOn(c=>!c)
//   }

//   return <div>
//     <button onClick={toggle}>Toggle the bulb</button>
//   </div>
// }

// prop drilling
// function App() {
//   const [bulbOn, setBulbOn] = useState(true)
//   return <div>
//     <LightBulb bulbOn={bulbOn} setBulbOn={setBulbOn} />
//   </div>
// }

// function LightBulb({bulbOn,setBulbOn}) {
//   return <div>
//     <BulbState bulbOn={bulbOn} />
//     <ToggleBulbState setBulbOn={setBulbOn} />
//   </div>
// }

// //bulbOn is a prop to BulbState component
// function BulbState({bulbOn}) {
//   return <div>
//     {bulbOn ? "Bulb on" : "Bulb off"}
//   </div>
// }

// function ToggleBulbState({setBulbOn}) {

//   function toggle() {
//     setBulbOn(c=>!c)
//   }

//   return <div>
//     <button onClick={toggle}>Toggle the bulb</button>
//   </div>
// }

//CONTEXT API
const BulbContext=createContext();

function BulbProvider({children}){
  const [bulbOn, setBulbOn] = useState(true)
  return <BulbContext.Provider value={{bulbOn:bulbOn, setBulbOn:setBulbOn}}>
    {children}
  </BulbContext.Provider>
}
function App() {
  return <div>
    <BulbProvider>
    <LightBulb/>
    </BulbProvider>
  </div>
}

function LightBulb() {
  return <div>
    <BulbState />
    <ToggleBulbState/>
  </div>
}

//bulbOn is a prop to BulbState component
function BulbState() {
  const {bulbOn}=useContext(BulbContext);
  return <div>
    {bulbOn ? "Bulb on" : "Bulb off"}
  </div>
}

function ToggleBulbState() {
  const {setBulbOn}=useContext(BulbContext);
  function toggle() {
    setBulbOn(c=>!c)
  }

  return <div>
    <button onClick={toggle}>Toggle the bulb</button>
  </div>
}
export default App
