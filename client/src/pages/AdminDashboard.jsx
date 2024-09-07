import { useEffect, useState } from "react";
import { AdminApprovalsTab } from "../assets/Constant";
import Tab from "../components/Tab";
import Table from "../components/Table";
import axios from "axios";
import { API } from "../utils/api";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Pending Approval"); // Track selected tab
  const [users, setUsers] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const [message, setMessage] = useState(""); // Track message to display to the user

  useEffect(() => {
    (async () => {
      // console.log("Fetching users");
      setUsers([]);
      setMessage("Loading...");
      if (selectedTab === "Students") {
        try {
          const response = await axios.get(`${API}/admin/verified-students`);
          setUsers(response.data.data);
          setMessage("");
        } catch (error) {
          console.log(error);
        }
      } else if (selectedTab === "Alumni") {
        try {
          const response = await axios.get(`${API}/admin/verified-alumni`);
          setUsers(response.data.data);
          setMessage("");
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.get(`${API}/admin/unverified-users`);
          setUsers(response.data.data);
          setMessage("");
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [selectedTab, isChanged]);

  // Function to handle approving a user
  const handleApprove = async (userId) => {
    try {
      await axios.put(`${API}/admin/approve-user/${userId}`);
      alert("User Approved");
      setIsChanged(!isChanged);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle rejecting a user
  const handleReject = async (userId) => {
    try {
      await axios.delete(`${API}/admin/reject-user/${userId}`);
      alert("User Removed");
      setIsChanged(!isChanged);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to filter users based on the selected tab
  // const getFilteredUsers = () => {
  //   if (selectedTab === "Pending Approval") {
  //     return users.filter((user) => !user.approve);
  //   }
  //   return users.filter(
  //     (user) => user.approve && user.role === selectedTab.toLowerCase()
  //   );
  // };

  return (
    <div className="w-full">
      <div className="flex justify-center gap-20 max-xl:gap-8">
        {/* Render Tab Buttons */}
        {AdminApprovalsTab.map((tabLabel, index) => (
          <div
            onClick={() => setSelectedTab(tabLabel)} // Set selected tab
            key={index}
          >
            <Tab label={tabLabel} isActive={selectedTab === tabLabel} />
          </div>
        ))}
      </div>
      {/* Display Table component based on selected tab */}
      <div className="max-h-screen">
        <Table
          title={selectedTab}
          users={users}
          onApprove={handleApprove}
          onReject={handleReject}
          message={message}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
