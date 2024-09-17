import { Communities } from "../components/Communities";
import { SearchBar } from "../components/SearchBar";

const PanelDiscussion = () => {
  return (
    <div className="flex flex-col h-full p-5 gap-2">
      <SearchBar showSearch={true} showProfile={true} dropDown={false}/>  
      <div className=" w-full flex h-[90%]  ">
        <div className="w-1/6">
          <Communities admin={true} />
        </div>
        <div className="w-4/6 bg-red-200">
        
        </div>
        <div className="w-1/4 bg-yellow-100">sss</div>
      </div>
    </div>
  );
};

export default PanelDiscussion;
