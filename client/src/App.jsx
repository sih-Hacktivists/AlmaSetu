import { Route, Routes } from "react-router-dom";
import { MultiStepForm } from "./pages/MultiStepForm";
import { Home } from "./pages/Home";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import { SearchBar } from "./components/SearchBar";
import SideBar from "./components/SideBar";
import NotFound from "./components/NotFound";
import ResetPasswordPage from "./pages/ResetPassword";
import VerificationPage from "./pages/VerifiedPage";
import AdminLogin from "./pages/AdminLogin";
import Events from "./pages/Events";

function AdminLayout() {
  return (
    <>
    
      <div className="flex bg-[#ECF7FE] relative" >
        <SideBar />
        <div className=" w-full p-2 px-10  ">
          <SearchBar showProfile={true} />
          <div className="py-10">
            <Routes>
              <Route path="/dashboard" element={<AdminDashboard />} />
              {/* <Route path="/events" element={<AdminDashboard />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={}/> */}
      <Route path="/register" element={<MultiStepForm />} />
      <Route path="/users/home" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/users/:userId/reset-password/:token"
        element={<ResetPasswordPage />}
      />
      {/* <Route path="/admin/*" element={<NotFound/>}/> */}
      <Route
        path="/users/:userId/verify-email/:token"
        element={<VerificationPage />}
      />
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/users/events" element={<Events />} />
      <Route path="/*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
