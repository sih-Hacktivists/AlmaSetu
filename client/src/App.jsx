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
import EventDetails from "./pages/EventDetails";
import SuperAdmin from "./pages/SuperAdmin";
import Profile from "./pages/Profile";
import AdminRegister from "./pages/AdminRegister";
import PanelDiscussion from "./components/Authentication/PanelDiscussion";

function AdminLayout() {
  return (
    <>
      <div className="flex bg-[#ECF7FE] w-full h-screen ">
        <SideBar />
        <div className=" w-full p-2 px-10  ">
          <SearchBar showProfile={true} showSearch={false} dropDown={false} />
      
            <Routes>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/panel" element={<PanelDiscussion/>} />
            </Routes>
        </div>
      </div>
    </>
  );
}

function UserLayout() {
  return (
    <>
      <div className="bg-[#ECF7FE] fixed w-full scrollbar-custom">
        <SideBar user={true} />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route
            path="/:userId/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          {/* <Route path="/admin/*" element={<NotFound/>}/> */}
          <Route
            path="/:userId/verify-email/:token"
            element={<VerificationPage />}
          />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventid" element={<EventDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        ;
      </div>
    </>
  );
}
function App() {
  return (
    <Routes>
      <Route path="/users/*" element={<UserLayout />} />

      <Route path="/register" element={<MultiStepForm />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/*" element={<NotFound />} />

      <Route path="/superadmin/dashboard" element={<SuperAdmin />} />
    </Routes>
  );
}

export default App;
