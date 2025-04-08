import React from "react";

export default function MeetTheTeamSection() {
  const teams = [
    {
      name: "",
      members: [
        { name: "Rubab Shahzad", role: "Director", image: "images/team/rubab.jpg" },
        { name: "Lyndsey Dewitt", role: "Special Events Coordinator", image: "images/team/lyndsey.jpg"  },
        { name: "Nikitha Chandana", role: "Exec Student Lead", image: "images/team/nikitha.jpg"  }
      ],
    },
    {
      name: "Student Body",
      members: [
        { name: "Satya Rallabandi", role: "President", image: "images/team/satya.jpg"  },
        { name: "Samarth Jagtap", role: "Vice-President", image: "images/team/samarth.jpg"  },
      ],
    },
    {
      name: "Development Team",
      members: [
        { name: "Prathmesh Patil", role: "Developement Lead", image: "images/team/user.png" },
        { name: "Samarth Jagtap", role: "Development Co-Lead", image: "images/team/samarth.jpg"  },
        { name: "Inshaad Merchant", role: "Developer", image: "images/team/inshaad.jpg"  },
        { name: "Araohat Kokate", role: "Developer", image: "images/team/araohat.jpg"  },
        { name: "Pradeepsinh Chavda", role: "Developer", image: "images/team/pradeep.jpg"  },
        { name: "Sujit Shrestha", role: "Developer", image: "images/team/sujit.jpg"  },
      ],
    },
    {
      name: "Challenges Team",
      members: [
        { name: "Clivin Geju", role: "Challenges Lead", image: "images/team/clivin.jpg"  },
        { name: "Abhijit Challapalli", role: "Senior Challenges Advisor", image: "images/team/abhi.jpeg"  },
        { name: "Zecil Jain", role: "Challenge Reviewer", image: "images/team/zecil.jpg"  },
        { name: "Jay Shah", role: "Challenge Reviewer", image: "images/team/jay.jpg"  }
      ],
    },
    {
      name: "Creative Team",
      members: [
        { name: "Sai Rallabandi", role: "Creative Lead", image: "images/team/sai.jpg"  },
        { name: "Richa Desai", role: "Creative Team", image: "images/team/richa.jpg"  },
        { name: "Pearl Thakkar", role: "Creative Team", image: "images/team/pearl.jpg"  },
        { name: "Akhil Cherukuri", role: "Creative Team", image: "images/team/akhil.jpg"  },
        { name: "Keerthi Kommuru", role: "Creative Team", image: "images/team/keer.jpg"  },
        { name: "Lamia Hassan", role: "Creative Team", image: "images/team/lamia.jpg"  },
      ],
    },
    {
      name: "Operations and Logistics Team",
      members: [
        { name: "Anusha Vyas", role: "Operations Lead", image: "images/team/anusha.jpg"  },
        { name: "Karan Thakkar", role: "Logistics Coordinator", image: "images/team/karan.jpg"  },
        { name: "Kanishka Bharti", role: "Logistics Coordinator", image: "images/team/kani.jpg"  },
        { name: "Alejandra Torres", role: "Logistics Coordinator", image: "images/team/ale.jpg"  },
        { name: "Isit Thakkar", role: "Logistics Coordinator", image: "images/team/isit.jpg"  }
      ],
    },
    {
      name: "Experience Team",
      members: [
        { name: "Devrat Patel", role: "Experience Lead", image: "images/team/dev.jpg"  },
        { name: "Aastha Khatri", role: "Experience", image: "images/team/astha.jpg"  },
        { name: "Pranathi Chilukuri", role: "Experience", image: "images/team/pran.jpg"  }
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
                <img src={member.image} alt={member.name} className="member-image"/>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}