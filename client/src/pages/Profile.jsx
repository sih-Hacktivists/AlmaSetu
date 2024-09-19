import { SearchBar } from "../components/SearchBar";
import { LiaLinkedin } from "react-icons/lia";
import { MdEdit } from "react-icons/md";
import { FaGithub } from "react-icons/fa";


const Profile = ({ loggedInUser }) => {
  const dummyUser = {
    name: "Saahiti Tiwari",
    role: "Alumni",
    institution: "UEM, Kolkata",
    bio: "Passionate Frontend Developer student with a strong foundation in HTML, CSS, JavaScript, and React. Experienced in creating responsive, user-friendly web interfaces. Eager to apply problem-solving skills and innovative design ideas in real-world projects.",
    profilePic: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    skills: [
      "C/C++",
      "Java",
      "JavaScript",
      "Front-end Developer",
      "Interested in coding contests",
    ],
    events: [
      "Tech for Good",
      "Green Developers",
      "Open Source Enthusiasts",
      "Hackerranker",
      "Futuristics",
    ],
    achievements: [
      "Consistently maintained a high GPA, ranking in the top 10% of the class, or received honors such as the Dean's List or a subject-specific award.",
      "Completed a senior project or thesis that was highly praised by faculty or industry professionals.",
      "Participated in a relevant internship or co-op experience that provided hands-on training in the field.",
      "Held a leadership role in a student organization or club, particularly one related to the field of study.",
      "Received a scholarship, grant, or other financial award based on academic achievement or potential.",
    ],
    workExperience: [
      "Consistently maintained a high GPA, ranking in the top 10% of the class, or received honors such as the Dean's List or a subject-specific award.",
      "Completed a senior project or thesis that was highly praised by faculty or industry professionals.",
      "Participated in a relevant internship or co-op experience that provided hands-on training in the field.",
      "Held a leadership role in a student organization or club, particularly one related to the field of study.",
      "Received a scholarship, grant, or other financial award based on academic achievement or potential.",
    ],
    socialLinks: [
      { icon: "fab fa-linkedin", url: "https://linkedin.com" },
      { icon: "fab fa-x-twitter", url: "https://twitter.com" },
      { icon: "fab fa-youtube", url: "https://youtube.com" },
      { icon: "fab fa-instagram", url: "https://instagram.com" },
      { icon: "fab fa-facebook", url: "https://facebook.com" },
    ],
    college: "UEM,JAIPUR",
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[90vw]">
        <SearchBar showProfile={true} showSearch={true} />
      </div>

      <div className="w-[90vw] h-[90vh] border-2 border-black rounded-xl p-4">
        <div className="w-[100%] h-[5%] flex justify-end m-1 p-4 items-center">
          <button className="w-32 h-8 gap-2 bg-white border-black border-2 rounded-2xl flex justify-center items-center">Edit Profile <MdEdit className="w-5 h-5" /></button>
        </div>

        <div className="w-[100%] h-[95%] flex  gap-2 justify-around items-center">

          {/* Profile Details */}
          <div className="h-[100%] w-[20%] flex flex-col justify-between items-center p-4  border-black border-2 rounded-xl">
            <div className=" flex flex-col justify-center items-center gap-3">

              <img src={dummyUser.profilePic}
                className="w-32 h-32 rounded-full" alt="" />
              <p className="text-2xl font-bold">{dummyUser.name}</p>
              <p>{dummyUser.role}</p>
              <p className="font-semibold">{dummyUser.college}</p>
              <button className="w-32 h-8 bg-[#111E4B] text-white rounded-xl">Connect +</button>
              <p className="w-40 h-8 border-black border-2 bg-white rounded-2xl text-center">147 Connections</p>
            </div>

            <div className="">
              <p className="text-center mb-2">Find Me On:</p>
              <div className="flex justify-center items-center gap-4">
                {dummyUser.socialLinks.map((item, index) => (
                  <div className="" key={index}><FaGithub className="w-8 h-8 rounded-full" /></div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-[75%] h-[100%]">
            {/* Bio */}
            <div className="w-[100%] h-[30%] shadow-black shadow-sm rounded-2xl">
              <p className="text-xl h-[30%] flex justify-center items-center text-white bg-[#111E4B] text-center  rounded-t-2xl">Bio:</p>
              <p className="p-2 h-[70%] flex justify-center items-center border-l-2 border-r-2 border-b-2 border-black rounded-b-2xl">{dummyUser.bio}</p>
            </div>

            <div className="w[90%] h-[30%] flex mt-4 justify-between items-center">
              <div className="w-[48%] h-[100%] border-l-2 shadow-black shadow-sm border-r-2 border-b-2 border-black rounded-2xl">
                <p className="text-xl h-[30%] flex justify-center items-center text-white bg-[#111E4B] text-center  rounded-t-2xl">Experience</p>
                <div className="p-4 h-[70%]  overflow-y-auto overflow-x-auto scrollbar-thumb-black mb-2 scrollbar-track-[#ECF7FE] scrollbar-thin scrollbar-corner-transparentjustify-center items-center ">
                  {dummyUser.workExperience.map((item, index) => (
                    <p key={index} className="flex justify-center items-center h-[100%] gap-3"><span className="font-semibold">{index + 1}.</span>{item}</p>
                  ))}
                </div>
              </div>
              <div className="w-[48%] h-[100%] border-l-2 shadow-black shadow-sm border-r-2 border-b-2 border-black rounded-2xl">
                <p className="text-xl h-[30%] flex justify-center items-center text-white bg-[#111E4B] text-center  rounded-t-2xl">Achievements</p>
                <div className="p-4 h-[70%]  overflow-y-auto overflow-x-auto scrollbar-thumb-black mb-2 scrollbar-track-[#ECF7FE] scrollbar-thin scrollbar-corner-transparentjustify-center items-center ">
                  {dummyUser.achievements.map((item, index) => (
                    <p key={index} className="flex justify-center items-center h-[100%] gap-3"><span className="font-semibold">{index + 1}.</span>{item}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="w[90%] h-[30%] flex mt-4 justify-between items-center">
            <div className="w-[48%] h-[100%] border-l-2 shadow-black shadow-sm border-r-2 border-b-2 border-black rounded-2xl">
                <p className="text-xl h-[30%] flex justify-center items-center text-white bg-[#111E4B] text-center  rounded-t-2xl">Events</p>
                <div className=" h-[70%] flex justify-center items-center">
                  <div className="w-[90%] h-[90%] overflow-y-auto overflow-x-auto scrollbar-thumb-black mb-2 scrollbar-track-[#ECF7FE] scrollbar-thin scrollbar-corner-transparent ">
                    {dummyUser.skills.map((item, index) => (
                      <p key={index} className="flex justify-start items-center  gap-3"><span className="font-semibold">{index + 1}.</span>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-[48%] h-[100%] border-l-2 shadow-black shadow-sm border-r-2 border-b-2 border-black rounded-2xl">
                <p className="text-xl h-[30%] flex justify-center items-center text-white bg-[#111E4B] text-center  rounded-t-2xl">Events</p>
                <div className=" h-[70%] flex justify-center items-center">
                  <div className="w-[90%] h-[90%] overflow-y-auto overflow-x-auto scrollbar-thumb-black mb-2 scrollbar-track-[#ECF7FE] scrollbar-thin scrollbar-corner-transparent ">
                    {dummyUser.events.map((item, index) => (
                      <p key={index} className="flex justify-start items-center  gap-3"><span className="font-semibold">{index + 1}.</span>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  );
};

export default Profile;
