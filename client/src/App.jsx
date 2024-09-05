import { Route, Router, Routes } from "react-router-dom";
import { MultiStepForm } from "./pages/MultiStepForm";
import { Home } from "./pages/Home";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPassword";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={}/> */}
      <Route path="/register" element={<MultiStepForm />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-pass" element={<ForgotPasswordPage />} />
    </Routes>
  );
}

export default App;
