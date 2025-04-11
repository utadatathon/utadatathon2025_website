import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function MeetTheTeamSection() {
  const teams = [
    {
      name: "",
      members: [
        { name: "Rubab Shahzad", role: "Director", image: "images/team/rubab.jpg",  github: "https://github.com/rubabshz", linkedin: "https://www.linkedin.com/in/rubab-shahzad/" },
        { name: "Lyndsey Dewitt", role: "Special Events Coordinator", image: "images/team/lyndsey.jpg", linkedin: "www.linkedin.com/in/lyndsey-dewitt-1a0161214"  },
        { name: "Nikitha Chandana", role: "Exec Student Lead", image: "images/team/nikitha.jpg"  }
      ],
    },
    {
      name: "Student Body",
      members: [
        {
          name: "Rubab Shahzad",
          role: "Director",
          image: "images/team/rubab.jpg",
          github: "https://github.com/rubabshz",
          linkedin: "https://www.linkedin.com/in/rubab-shahzad/",
        },
        {
          name: "Lyndsey Dewitt",
          role: "Special Events Coordinator",
          image: "images/team/lyndsey.jpg",
          linkedin: "www.linkedin.com/in/lyndsey-dewitt-1a0161214",
        }
      ],
    },
    {
      name: "Students Executive Board",
      members: [
        {
          name: "Satya Rallabandi",
          role: "President",
          image: "images/team/satya.jpg",
          linkedin: "https://www.linkedin.com/in/satya171rallabandi",
        },
        {
          name: "Samarth Jagtap",
          role: "Vice-President",
          image: "images/team/samarth.jpg",
          github: "https://github.com/thatscrazzyy",
          linkedin: "https://www.linkedin.com/in/thesamarthjagtap/",
        },
        {
          name: "Nikitha Chandana",
          role: "Exec Student Lead",
          image: "images/team/nikitha.jpg",
        },
      ],
    },
    {
      name: "Development Team",
      members: [
        {
          name: "Prathmesh Patil",
          role: "Developement Lead",
          image: "images/team/pratham.jpeg",
          linkedin: "https://www.linkedin.com/in/prathameshpatil31/",
          github: "https://github.com/1-apex",
        },
        {
          name: "Samarth Jagtap",
          role: "Development Co-Lead",
          image: "images/team/samarth.jpg",
          github: "https://github.com/thatscrazzyy",
          linkedin: "https://www.linkedin.com/in/thesamarthjagtap/",
        },
        {
          name: "Inshaad Merchant",
          role: "Developer",
          image: "images/team/inshaad.jpg",
        },
        {
          name: "Araohat Kokate",
          role: "Developer",
          image: "images/team/araohat.jpg",
          linkedin: "https://www.linkedin.com/in/araohat-kokate-689a4b222/",
          github: "https://github.com/araohatkokate",
        },
        {
          name: "Pradeepsinh Chavda",
          role: "Developer",
          image: "images/team/pradeep.jpg",
          linkedin: "http://linkedin.com/in/pradeepsinh-chavda-008ba1161",
          github: "https://github.com/PRADEEPSINHCHAVDA",
        },
        {
          name: "Sujit Shrestha",
          role: "Developer",
          image: "images/team/sujit.jpg",
          linkedin: "https://www.linkedin.com/in/sujitshres1ha/",
          github: "https://github.com/SujitShres1ha",
        },
      ],
    },
    {
      name: "Challenges Team",
      members: [
        {
          name: "Clivin Geju",
          role: "Challenges Lead",
          image: "images/team/clivin.jpg",
          linkedin: "https://www.linkedin.com/in/clivin-john/",
          github: "https://github.com/clyv",
        },
        {
          name: "Abhijit Challapalli",
          role: "Senior Challenges Advisor",
          image: "images/team/abhi.jpeg",
          linkedin: "https://www.linkedin.com/in/abhijit-c-b5876814b/",
          github: "https://github.com/AbhijitChallapalli",
        },
        {
          name: "Zecil Jain",
          role: "Challenge Reviewer",
          image: "images/team/zecil.jpg",
          linkedin: "https://www.linkedin.com/in/zecil-jain",
          github: "https://github.com/zeciljain8197",
        },
        {
          name: "Jay Shah",
          role: "Challenge Reviewer",
          image: "images/team/jay.jpg",
          linkedin: "https://www.linkedin.com/in/jay-shah-8b0b95228/",
        },
      ],
    },
    {
      name: "Creative Team",
      members: [
        {
          name: "Sai Rallabandi",
          role: "Creative Lead",
          image: "images/team/sai.jpg",
          linkedin:
            "https://www.linkedin.com/in/sai-tejaswini-rallabandi-933874231/",
        },
        {
          name: "Richa Desai",
          role: "Creative Team",
          image: "images/team/richa.jpg",
          linkedin: "www.linkedin.com/in/akhil-satya-sai-cherukuri-4088b02a9",
        },
        {
          name: "Pearl Thakkar",
          role: "Creative Team",
          image: "images/team/pearl.jpg",
          linkedin: "https://www.linkedin.com/in/pearl-thakkar-8449512bb",
        },
        {
          name: "Akhil Cherukuri",
          role: "Creative Team",
          image: "images/team/akhil.jpg",
          linkedin:
            "https://www.linkedin.com/in/akhil-satya-sai-cherukuri-4088b02a9",
          github: "https://github.com/AkhilCh54",
        },
        {
          name: "Keerthi Kommuru",
          role: "Creative Team",
          image: "images/team/keer.jpg",
          linkedin: "https://www.linkedin.com/in/kommurukeerthi/",
        },
        {
          name: "Lamia Hassan",
          role: "Creative Team",
          image: "images/team/lamia.jpg",
          linkedin: "https://www.linkedin.com/in/lamia-hasan-rodoshi-13a85b252",
        },
      ],
    },
    {
      name: "Operations and Logistics Team",
      members: [
        {
          name: "Anusha Vyas",
          role: "Operations Lead",
          image: "images/team/anusha.jpg",
          linkedin: "https://www.linkedin.com/in/anusha-vyas-4582a8189",
        },
        {
          name: "Karan Thakkar",
          role: "Logistics Coordinator",
          image: "images/team/karan.jpg",
          linkedin: "https://www.linkedin.com/in/karantz",
        },
        {
          name: "Kanishka Bharti",
          role: "Logistics Coordinator",
          image: "images/team/kani.jpg",
        },
        {
          name: "Alejandra Torres",
          role: "Logistics Coordinator",
          image: "images/team/ale.jpg",
          linkedin: "www.linkedin.com/in/ale-t",
        },
        {
          name: "Isit Thakkar",
          role: "Logistics Coordinator",
          image: "images/team/isit.jpg",
        },
      ],
    },
    {
      name: "Experience Team",
      members: [
        {
          name: "Devrat Patel",
          role: "Experience Lead",
          image: "images/team/dev.jpg",
          linkedin: "https://www.linkedin.com/in/devratpatel/",
        },
        {
          name: "Aastha Khatri",
          role: "Experience",
          image: "images/team/astha.jpg",
          linkedin: "https://www.linkedin.com/in/aastha-khatri/",
        },
        {
          name: "Pranathi Chilukuri",
          role: "Experience",
          image: "images/team/pran.jpg",
          linkedin: "http://linkedin.com/in/pranathi-pavani-1b430724b",
        },
      ],
    },
  ];

  return (
    <div className="meet-the-team-section">
      {teams.map((team, index) => (
        <div key={index} className="team">
          <h2>{team.name}</h2>
          <div className="members">
            {team.members.map((member, memberIndex) => (
              <div key={memberIndex} className="member">
                <img
                  src={member.image}
                  alt={member.name}
                  className="member-image"
                />
                <h4>{member.name}</h4>
                <p>{member.role}</p>
                <div className="social-links">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="social-icon" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin className="social-icon" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
