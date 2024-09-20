import { useState } from "react";
import { connectionsNavPage } from "../assets/Constant";
import SearchIcon from "../assets/searchIcon.svg";
import SortIcon from "../assets/sortIcon.svg";

const initialUsers = [
  {
    _id: "001",
    name: "John Doe",
    status: "pending",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    title: "Final Year Project",
    document: "https://example.com/docs/final_year_project.pdf",
  },
  {
    _id: "002",
    name: "Jane Smith",
    status: "pending request",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    title: "Thesis Paper",
    document: "https://example.com/docs/thesis_paper.pdf",
  },
  {
    _id: "003",
    name: "Mark Johnson",
    status: "connections",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    title: "Research Proposal",
    document: "https://example.com/docs/research_proposal.pdf",
  },
  {
    _id: "004",
    name: "Emily Davis",
    status: "pending",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    title: "Capstone Project",
    document: "https://example.com/docs/capstone_project.pdf",
  },
  {
    _id: "005",
    name: "Michael Brown",
    status: "pending request",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    title: "Internship Report",
    document: "https://example.com/docs/internship_report.pdf",
  },
];

const TabsSection = () => {
  const [tab, setTab] = useState("Connections");
  const [users, setUsers] = useState(initialUsers);

  const updateUserStatus = (userId, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const renderTable = () => {
    switch (tab) {
      case "Connections":
        return <Table users={users} status={tab.toLowerCase()} onApprove={updateUserStatus} />;
      case "Pending":
        return <Table users={users} status={tab.toLowerCase()} onApprove={updateUserStatus} />;
      default:
        return <Table users={users} status={tab.toLowerCase()} onApprove={updateUserStatus} />;
    }
  };

  const connectionsCount = users.filter(user => user.status === "connections").length;
  const pendingCount = users.filter(user => user.status === "pending").length + users.filter(user => user.status === "pending request").length;

  return (
    <div className="flex flex-col gap-5 h-full justify-between">
      <div className="flex h-[10%] max-w-screen-sm gap-5 items-center">
        {connectionsNavPage.map((nav, index) => {
          const count = nav.title === "Connections" ? connectionsCount : pendingCount;
          return (
            <div
              key={index}
              onClick={() => {
                setTab(nav.title);
              }}
              className={`cursor-pointer px-4 py-2 text-xl rounded-full ${
                tab === nav.title ? "bg-[#111E4B] text-white" : "bg-[#FFFFFF]"
              } border border-slate-600 hover:bg-[#111E4B] hover:text-white`}
            >
              {count > 0 && count} {nav.title}
            </div>
          );
        })}
      </div>
      <div className="h-[90%]">{renderTable()}</div>
    </div>
  );
};

const Table = ({ users, status, onApprove }) => {
  return (
    <div className="px-4 lg:px-10 border-2 border-black rounded-2xl h-full relative overflow-x-hidden overflow-y-auto">
      <FilterAndSearch />
      <div className="mt-20 max-h-[calc(100vh-150px)] lg:max-h-screen scrollbar-custom pr-2">
        {users.map((user, index) => (
          user.status === status && (
            <TableRow
              key={user._id}
              name={user.name}
              profilePic={user.profilePic}
              title={user.status}
              onApprove={() => onApprove(user._id, "connections")}
              onReject={() => console.log("Reject clicked")}
            />
          )
        ))}
      </div>
    </div>
  );
};

function FilterAndSearch() {
  return (
    <div className="flex items-center justify-start absolute top-0 w-full mt-5 space-x-2 px-2 lg:px-0">
      <div className="relative w-2/5 md:w-1/3">
        <input
          type="text"
          placeholder="Search.."
          className="w-full bg-white text-slate-400 text-sm py-2 pr-10 px-2 border-2 border-slate-700/30 shadow-md rounded-2xl focus:outline-none"
        />
        <img
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 p-1"
          src={SearchIcon}
          alt="searchIcon"
        />
      </div>
      <div className="gap-5 flex items-center justify-between font-medium shadow-md border-2 bg-white border-slate-700/30 text-sm py-1 px-2 rounded-2xl">
        <span>Sort & Filter</span>
        <img
          className="cursor-pointer w-6 h-6 md:w-8 md:h-8 p-1 bg-[#d1e6f3] rounded-lg hover:bg-[#c4e1f3]"
          src={SortIcon}
          alt="Sort Icon"
        />
      </div>
    </div>
  );
}

const TableRow = ({ name, profilePic, title, onApprove, onReject }) => {
  return (
    <div className="w-full border-2 border-slate-900 rounded-3xl flex justify-between items-center px-2 py-2 my-2">
      <div className="flex justify-items-start items-center gap-2">
        <img className="w-10 h-10 rounded-full" src={profilePic} alt="ppic" />
        <div className="flex items-baseline gap-2 text-md font-normal">{name}</div>
      </div>
      {title === "pending" || title === "pending request" ? ( // Update condition here
        <div className="flex gap-5 items-center">
          <div
            className="hover:border-orange-400 rounded-2xl border-2 bg-green-600 text-white px-4 py-2 font-medium cursor-pointer"
            onClick={onApprove} // Approve the user
          >
            Accept
          </div>
          <div
            className="rounded-2xl border-2 border-red-700 text-red-500 hover:bg-red-400 hover:text-white px-5 py-2 font-medium cursor-pointer"
            onClick={onReject} // Reject the user
          >
            Reject
          </div>
        </div>
      ) : null}
    </div>
  );
};


export default TabsSection;
