import { useState } from "react";

function App() {
  const [todos,setTodos]=useState([
    {
      title:"Go to Gym",
      description:"Hit the gym regularly",
      done:false
    },
  ])
  function AddTodo(){
    let newArray=[...todos];
    newArray.push({
      title:document.getElementById("title").value, 
      description:document.getElementById("description").value,
      done: false,
    })
    setTodos(newArray);
  }
  return (
    <div>
      <input id="title" type="text" placeholder="Title"></input>
      <input id="description" type="text" placeholder="Description"></input>
      <button onClick={AddTodo}>Add Todo</button>
    {JSON.stringify(todos)}
    </div>
    
  );
}

export default App;
