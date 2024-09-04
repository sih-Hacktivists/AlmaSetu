import { Route, Router, Routes } from "react-router-dom"
import { MultiStepForm } from "./pages/MultiStepForm"
import { Home } from "./pages/Home"
import "./App.css"

function App() {

  return (
    
      <Routes>
        {/* <Route path="/" element={}/> */}
        <Route path="/register" element={<MultiStepForm/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
      
  )
}

export default App
