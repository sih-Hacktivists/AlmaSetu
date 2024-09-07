import { Route, Routes } from "react-router-dom";
import { MultiStepForm } from "./pages/MultiStepForm";
import { Home } from "./pages/Home";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPassword";
import AdminApprovals from "./pages/AdminApprovals";
import { SearchBar } from "./components/SearchBar";
import SideBar from "./components/SideBar";
import NotFound from "./components/NotFound";
import ResetPasswordPage from "./pages/ResetPassword";
import VerificationPage from "./pages/VerifiedPage";

function AdminLayout() {
  return (
    <>
      <div className="flex bg-[#ECF7FE]">
        <SideBar />
        <div className=" w-full p-2 px-10  ">
          <SearchBar showProfile={true} />
          <div className="py-10">
            <Routes>
              <Route path="/approvals" element={<AdminApprovals />} />
              <Route path="/events" element={<AdminApprovals />} />
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
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/users/:userId/reset-password/:token"
        element={<ResetPasswordPage />}
      />
      {/* <Route path="/admin/*" element={<NotFound/>}/> */}
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route
        path="/users/:userId/verify-email/:token"
        element={<VerificationPage />}
      />
    </Routes>
  );
}

export default App;
