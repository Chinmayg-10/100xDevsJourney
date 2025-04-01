import {BrowserRouter,Routes,Route,Link,useNavigate, Outlet} from "react-router-dom"
function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
          <Route path="/neet/online-coaching-class-11" element={<Class11Program/>}/>
          <Route path="/neet/online-coaching-class-12" element={<Class12Program/>}/>
          <Route path="/" element={<Landing/>}/>
          <Route path="*" element={<ErrorPage/>}/>
          </Route>
        </Routes>
        </BrowserRouter>
        Footer || contact
      </div>
    </> 
  )
}
function Layout(){
  return(
    <div style={{height:"100vh"}}>
      {/* //HEADER//// */}
      <Link to="/">Allen  </Link>
      <Link to="/neet/online-coaching-class-11">class 11  </Link>
      <Link to="/neet/online-coaching-class-12">class 12</Link>
      <div style={{height:"90vh"}}>
        <Outlet/>
      </div>
      Footer
    </div>
    
  )
}
function ErrorPage(){
  return(
    <div>
      Sorry page not found!
    </div>
  )
}
function Class11Program(){
  return(
    <div>
    NEET programs for class 11
  </div>
  )
  
}
function Class12Program(){
  const navigate=useNavigate();
  function redirectUser(){
    navigate("/")
  }
  return(
    <div>
    NEET programs for class 12
    <button onClick={redirectUser}>Go to landing page</button>
    </div>
  )
  
}
function Landing(){
  return(
    <div>
      Allen home page
    </div>
  )
}

export default App
