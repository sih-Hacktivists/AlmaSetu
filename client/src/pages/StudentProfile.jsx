import React from "react";

export const Profile = () => {
  const user = {
    name: "Saahiti Tiwari",
    role: "Student (2022-2026)",
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
    socialLinks: [
      { icon: "fab fa-linkedin", url: "https://linkedin.com" },
      { icon: "fab fa-x-twitter", url: "https://twitter.com" },
      { icon: "fab fa-youtube", url: "https://youtube.com" },
      { icon: "fab fa-instagram", url: "https://instagram.com" },
      { icon: "fab fa-facebook", url: "https://facebook.com" },
    ],
  };

  return (
    <div className="flex min-h-screen bg-[#ECF7FE] text-[#000000]">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Profile and Information Section */}
        <div className="flex space-x-6">
          <div className="flex flex-col items-center">
            <img
              src={user.profilePic}
              alt="Profile"
              className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-lg"
            />
            <div className="text-center mt-7">
              <h2 className="text-3xl font-bold flex items-center ml-6">
                {user.name} <span className="text-blue-500 ml-1">✔</span>
              </h2>
              <p className="text-gray-600 mr-3">{user.role}</p>
              <p className="text-gray-600">{user.institution}</p>
            </div>
          </div>

          {/* Info Sections */}
          <div className="flex flex-col space-y-4 flex-1">
            {/* Bio Section */}
            <div className="rounded-[25px] shadow-md border border-black bg-[#ECF7FE]">
              <div className="bg-[#111E4B] text-white p-2 rounded-t-[25px]">
                <h3 className="text-lg text-center font-semibold">Bio</h3>
              </div>
              <div className="p-6 rounded-b-[25px]">
                <p>{user.bio}</p>
              </div>
            </div>

            {/* Skills and Achievements */}
            <div className="flex space-x-4">
              {/* Skills and Interest */}
              <div className="flex-1 rounded-[25px] shadow-md border border-black bg-[#ECF7FE]">
                <div className="bg-[#111E4B] text-white p-2 rounded-t-[25px]">
                  <h3 className="text-lg text-center font-semibold">
                    Skills and Interest
                  </h3>
                </div>
                <div className="p-6 rounded-b-[25px]">
                  <ul className="list-disc list-inside space-y-1">
                    {user.skills.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Achievements */}
              <div className="flex-1 rounded-[25px] shadow-md border border-black bg-[#ECF7FE]">
                <div className="bg-[#111E4B] text-white p-2 rounded-t-[25px]">
                  <h3 className="text-lg text-center font-semibold">Events</h3>
                </div>
                <div className="p-6 rounded-b-[25px]">
                  <p>No events listed yet.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/** Events Section **/}
        <div className="mt-4 rounded-[25px] shadow-md border border-black">
          <div className="bg-[#111E4B] text-white p-2 rounded-t-[25px]">
            <h3 className="text-lg text-center font-semibold">Achivements</h3>
          </div>
          <div className="p-6 rounded-b-[25px] bg-[#ECF7FE]">
            <ul className="list-disc list-inside space-y-1">
              {user.events.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mt-6">
          {user.socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-[#111E4B]"
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
