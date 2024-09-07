import { useState } from "react";
import { AdminApprovalsTab } from "../assets/Constant";
import Tab from "../components/Tab";
import Table from "../components/Table";

const Approvals = () => {
  const [selectedTab, setSelectedTab] = useState("Pending Approval"); // Track selected tab
  const [users, setUsers] = useState([
    // Initial users list, assuming these users are fetched from a backend or constant
    { id: 1, name: "John Doe", role: "student", profilePic: "path/to/pic1.jpg", approve: false },
    { id: 2, name: "Jane Smith", role: "alumni", profilePic: "path/to/pic2.jpg", approve: false },
    { id: 3, name: "Rahul Das", role: "student", profilePic: "path/to/pic3.jpg", approve: false },
    // More user objects...
  ]);

  // Function to handle approving a user
  const handleApprove = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? { ...user, approve: true }
          : user
      )
    );
  };

  // Function to handle rejecting a user
  const handleReject = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== userId)
    );
  };

  // Function to filter users based on the selected tab
  const getFilteredUsers = () => {
    if (selectedTab === "Pending Approval") {
      return users.filter((user) => !user.approve);
    }
    return users.filter((user) => user.approve && user.role === selectedTab.toLowerCase());
  };

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
        <Table title={selectedTab} users={getFilteredUsers()} onApprove={handleApprove} onReject={handleReject} />
      </div>
    </div>
  );
};

export default Approvals;
