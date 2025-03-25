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
// export default App

/////////////CODE2////////////
import React from 'react';

const Card = ({ children }) => {
    return (
        <div style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '20px',
            margin: '10px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
        }}>
            {children}
        </div>
    );
};

const App = () => {
    return (
        <div>
            <Card>
                <h2>Card Title</h2>
                <p>This is some content inside the card.</p>
            </Card>
            <Card>
                <h2>Another Card</h2>
                <input type="text" />
                <p>This card has different content!</p>
            </Card>
        </div>
    );
};

export default App;
