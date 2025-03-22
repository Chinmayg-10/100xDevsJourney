import React, { useState } from 'react';
function App(){
  return(
    <div style={{background:"#EDE8DC",height:"100vh"}}>
      <div><Togglemessage/></div>
      <div style={{display:"flex",justifyContent:"center"}}>
        <div>
        <div><PostComponent/></div>
        <br />
      <div><PostComponent/></div>
      <br />
      <div><PostComponent/></div>
        </div>
      
      </div>
      

      
    </div>
  )
}

const style={width:200,backgroundColor:"white",borderRadius:10,borderColor:"gray",borderWidth:1}
function PostComponent(){
  return(
    <div style={style}>
      <div style={{display:"flex"}}>
        <img src={"https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg"} style={{width:30,height:30,borderRadius:20}} /> 
        <div style={{fontSize:10,marginLeft:10}}>
          <b>
            100XDevs
          </b>
          <div>23788 followers</div>
          {/* this div has to be conditionally rendered */}
          <div style={{display:"flex"}}>
          <div>6m</div>
          <img src={"https://media.istockphoto.com/id/1267200399/vector/clock-vector-icon-isolated-on-white-background-outline-thin-line-clock-icon-for-website.jpg?s=2048x2048&w=is&k=20&c=tjJXaX90ttDm6VO5JlOHIqrIzmObUt0tfcvFav64Z6c="} width={12} height={12}/>
          </div>
          
        </div>
      </div>
      <div style={{fontSize:12}}>what to know how to win big? check the story in the bio</div>
    </div>
  )
}
function Togglemessage() {
  const [isVisible, setIsVisible] = useState(false);

  return (
      <div>
          <button onClick={() => setIsVisible(!isVisible)}>
              Toggle Message
          </button>
          {isVisible && <p>This message is conditionally rendered!</p>}
      </div>
  );
};
export default App
