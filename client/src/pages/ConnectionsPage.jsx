import { users } from "../assets/Constant";
import TabsSection from "../components/TabsSection";
const ConnectionsPage = () => {
  return (
    <div className="fixed h-screen w-full ">
      <div className="h-full w-full flex justify-center items-center">
        <div className="flex flex-col gap-5 h-[90%] w-[85%]">
          <div className="h-2/3 w-full  rounded-2xl ">
            <TabsSection />
          </div>
          <div className="h-1/3 w-full  border rounded-2xl border-slate-700 px-4">
            <div className="flex flex-col justify-between h-full w-full">
              <p className="px-2 py-2 text-xl font-bold">
                Reccomended Connections
              </p>
              <div className="h-[80%] flex items-center gap-5 overflow-x-auto  py-2">
                {/* Connection Card */}

                {users.map((user, index) => {

                 return <div key={index} className="flex-none  w-[15%] h-full bg-white rounded-lg border border-black py-2">
                    <div className=" flex flex-col items-center gap-5 max-2xl:gap-0 justify-center h-full  ">
                      <img
                        className="object cover rounded-full size-16 max-2xl:size-9"
                        src={user.profilePic}
                        alt=""
                      />
                      <p className="font-semibold text-2xl max-2xl:text-base">
                       {user.name}
                      </p>
                      <p className="text-sm max-2xl:text-[8px]">{user.role}</p>
                      {/* logic of uem short form */}
                      <p className="text-[14px]">
                        {"University of engineering of management".slice(0, 10)}
                      </p>
                      <div className="flex items-center px-4 py-1 text-white rounded-full bg-[#111E4B] cursor-pointer">
                        {"+ "} connect
                      </div>
                    </div>
                  </div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsPage;
