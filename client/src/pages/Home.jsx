import { MyProfile } from "../components/MyProfile";

const Home = () => {
  return (
    <section
      className="flex size-full
     text-black"
    >
      
        <div className="h-[95%] w-1/5  m-5 ">
        <MyProfile/>
        </div>
        <div className="w-3/5 bg-red-200 mt-5 flex-1"> main content</div>
        <div className="w-1/6 bg-gray-400 m-5 h-[95%]">right content</div>
    </section>
  );
};

export default Home;
