import { users } from "../assets/Constant";
import TabsSection from "../components/TabsSection";
import GreaterIcon from "../assets/chevright.svg";
import SmallerIcon from "../assets/chevleft.svg";
import { useRef, useState } from "react";

const ConnectionsPage = () => {
  const scrollConatinerRef = useRef();
  const [showMore, setShowMore] = useState(false);

  // Array to track the connection status for each user (initialize all to false)
  const [connectedUsers, setConnectedUsers] = useState(Array(users.length).fill(false));

  function scrollInX() {
    if (scrollConatinerRef.current) {
      scrollConatinerRef.current.scrollBy({
        left: showMore ? -8 * 300 : 8 * 300,
        behavior: "smooth",
      });
    }

    setShowMore((prev) => !prev);
  }

  // Function to handle connect click for a specific user
  const handleConnectClick = (index) => {
    setConnectedUsers((prev) => {
      const updatedConnections = [...prev];
    console.log(updatedConnections);
    
      updatedConnections[index] = !updatedConnections[index]; // Toggle connection status for specific user
      return updatedConnections;
    });
  };

  return (
    <div className="fixed h-screen w-full">
      <div className="h-full w-full flex justify-center items-center">
        <div className="flex flex-col gap-5 h-[90%] w-[85%]">
          <div className="h-2/3 w-full rounded-2xl">
            <TabsSection />
          </div>
          <div className="h-1/3 w-full border rounded-2xl border-slate-700 px-4">
            <div className="flex flex-col justify-between h-full w-full">
              <p className="px-2 py-2 text-xl font-bold">Recommended Connections</p>
              <div className="relative h-[80%] flex items-center py-2">
                <div
                  ref={scrollConatinerRef}
                  className="w-full flex items-center gap-5 overflow-x-hidden"
                >
                  {users.slice(0, 10).map((user, index) => {
                    return (
                      <div
                        key={index}
                        className="flex-none w-[18%] h-full bg-white rounded-2xl border border-black py-2"
                      >
                        <div className="flex flex-col items-center gap-3 max-2xl:gap-0 justify-center h-full">
                          <img
                            className="object-cover rounded-full size-16 max-2xl:size-9"
                            src={user.profilePic}
                            alt=""
                          />
                          <p className="font-semibold text-2xl max-2xl:text-base">
                            {user.name}
                          </p>
                          <p className="text-sm max-2xl:text-[8px]">{user.role}</p>
                          <p className="text-[14px]">
                            {"University of engineering of management".slice(0, 10)}
                          </p>
                          <div
                            onClick={() => handleConnectClick(index)} // Call the handler with the current index
                            className="font-bold text-center flex items-center px-4 py-1 text-white rounded-full bg-[#111E4B] cursor-pointer"
                          >
                            {connectedUsers[index] ? "✔️ " : "+ "} connect
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <img
                  className="absolute right-0 z-50 w-[35px] h-[35px] rounded-full bg-white/30 backdrop-blur-md border border-slate-500 shadow-lg"
                  onClick={scrollInX}
                  src={showMore ? SmallerIcon : GreaterIcon}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsPage;
