import { Route, Routes, useNavigate } from "react-router-dom";
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
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./utils/api";

function AdminLayout() {
  const [loggedInAdmin, setLoggedInAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API}/admin/current`);
        setLoggedInAdmin(response.data.data);
      } catch (error) {
        navigate("/admin/login");
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex bg-[#ECF7FE] relative">
        <SideBar />
        <div className=" w-full p-2 px-10  ">
          <SearchBar
            showProfile={true}
            showSearch={false}
            dropDown={false}
            loggedInAdmin={loggedInAdmin}
          />
          <div className="py-10">
            <Routes>
              <Route
                path="/dashboard"
                element={<AdminDashboard loggedInAdmin={loggedInAdmin} />}
              />
              {/* <Route path="/events" element={<AdminDashboard />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

function UserLayout() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API}/users/current`);
        setLoggedInUser(response.data.data);
      } catch (error) {
        navigate("/login");
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <div className="bg-[#ECF7FE] fixed w-full scrollbar-custom">
        <SideBar user={true} />
        <Routes>
          <Route path="/home" element={<Home loggedInUser={loggedInUser} />} />
          <Route
            path="/:userId/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          {/* <Route path="/admin/*" element={<NotFound/>}/> */}
          <Route
            path="/:userId/verify-email/:token"
            element={<VerificationPage />}
          />
          <Route
            path="/events"
            element={<Events loggedInUser={loggedInUser} />}
          />
          <Route
            path="/events/:eventid"
            element={<EventDetails loggedInUser={loggedInUser} />}
          />
          <Route
            path="/profile"
            element={<Profile loggedInUser={loggedInUser} />}
          />
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
