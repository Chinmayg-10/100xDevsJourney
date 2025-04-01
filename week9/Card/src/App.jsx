// function App(){
//   return <div style={{display:"flex"}}>
//     {/* insert inside card just like html */}
//     <Card>hi there</Card>
//     <Card><div style={{color:"green"}}>What do you want to post <br/><input type="text" /></div></Card>
//   </div>
// }
// function Card({children}){
//   return <div style={{backgroundColor:"black",borderRadius:10,color:"white",padding:10,margin:10}}>
//   {children}
//   </div>
// }
// export default App;

/////////////CODE2////////////
// import React from 'react';

// function Card({children}){
//     return (
//         <div style={{
//             border: '1px solid #ccc',
//             borderRadius: '5px',
//             padding: '20px',
//             margin: '10px',
//             boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
//         }}>
//             {children}
//         </div>
//     );
// };

//  function App(){
//     return (
//         <div>
//             <Card>
//                 <h2>Card Title</h2>
//                 <p>This is some content inside the card.</p>
//             </Card>
//             <Card>
//                 <h2>Another Card</h2>
//                 <input type="text" />
//                 <p>This card has different content!</p>
//             </Card>
//         </div>
//     );
// };
// export default App;

///////////////////code 3/////////////////////
// function App(){
//     const todos=[{
//         title:"Go to gym",
//         done:true
//     },{
//         title:"Eat food",
//         done:false
//     }];
//     const todosComponents=todos.map(todo=><Todo title={todo.title} done={todo.done}/>)

//     return(
//         <div>
//             <Todo key={2} title={"Go to gym"} done={true}/>
//             <Todo key={1} title={"Eat food"} done={false}/>
//         </div>
//     )
// };
// function Todo({title,done}){
//     return <div>
//         {title}-{done?"Done!":"Not Done!"}
//     </div>
// }
// export default App;


////////////////////////////error boundary///////////////////////////
// import React from 'react';

// function Card1(){
//     // throw new Error("Error while rendering")
//     return <div style={{background:"red",borderRadius:20,padding:20}}>
//         hi there
//     </div>
// }
// function Card2(){
//     return <div style={{background:"red",borderRadius:20,padding:20,margin:20}}>
//         hello
//     </div>
// }
// class ErrorBoundary extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { hasError: false };
//     }

//     static getDerivedStateFromError(error) {
//         return { hasError: true };
//     }

//     componentDidCatch(error, info) {
//         console.error("Error caught:", error, info);
//     }

//     render() {
//         if (this.state.hasError) {
//             return <h1>Something went wrong.</h1>;
//         }

//         return this.props.children; 
//     }
//  }

// const App = () => {
//     return (
//         <div>
//             <ErrorBoundary>
//             <Card1/>
//         </ErrorBoundary>
//         <ErrorBoundary>
//             <Card2/>
//         </ErrorBoundary>
            
//         </div>
//     );
// };
// export default App;


/////////////////////////////////FRAGMENTS IN REACT/////////////////////////////////////
function App(){
    return(
        <>
            <div>hi there</div>
            <div>hello</div>
        </>
    )
}
export default App;