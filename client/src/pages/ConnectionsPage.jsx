import TabsSection from "../components/TabsSection"
const ConnectionsPage = () => {
  return (
    <div className="fixed h-screen w-full ">
        <div className="h-full w-full flex justify-center items-center">
            <div className="flex flex-col gap-5 h-[90%] w-[85%]">
                <div className="h-2/3 w-full  rounded-2xl ">
                <TabsSection/>
                </div>
                <div className="h-1/3 w-full bg-yellow-200 border rounded-2xl border-slate-700">
                Reccomed
                </div>
            </div>
        </div>
    </div>
  )
}

export default ConnectionsPage