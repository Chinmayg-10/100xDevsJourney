function App(){
  return <div style={{display:"flex"}}>
    {/* insert inside card just like html */}
    <Card>hi there</Card>
    <Card><div style={{color:"green"}}>What do you want to post <br/><input type="text" /></div></Card>
  </div>
}
function Card({children}){
  return <div style={{backgroundColor:"black",borderRadius:10,color:"white",padding:10,margin:10}}>
  {children}
  </div>
}
export default App