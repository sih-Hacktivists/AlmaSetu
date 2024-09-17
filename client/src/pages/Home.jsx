import { MyProfile } from "../components/MyProfile";
import { Connections } from "../components/Connections";
import { Communities } from "../components/Communities";
import Yukta from "../components/Yukta";
const Home = () => {
  return (
    <section
      className="flex size-full
     text-black"
    >
      <div className="h-[95%] w-1/5  m-5 ">
        <MyProfile />
      </div>
      <div className="w-3/5 bg-red-200 mt-5 flex-1"></div>
      <div className="w-1/6 m-5 h-[95%]">
        <div className="h-full   flex flex-col justify-between">

          <div className="h-1/3">
            <Connections />
          </div>
          <div className="h-1/2">
            <Communities />
          </div>

          
            <Yukta/>
        </div>
      </div>
    </section>
  );
};

export default Home;
