'use client';

import { useState, useEffect } from "react";
import { auth, db } from "@/app/firebase/configuration";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [schools, setSchools] = useState<string[]>(["University of Texas at Arlington"]);
  const countries = ["Select",
    "United States", "Canada", "United Kingdom", "Australia", "Germany", 
    "France", "India", "China", "Japan", "Brazil", "Mexico", "Spain", "Italy",
    "South Korea", "Netherlands", "Sweden", "Switzerland", "South Africa"
  ];
  
  const fieldOfStudyOptions = [
    "Computer Science, Computer Engineering, or Software Engineering",
    "Another Engineering Discipline (Civil, Electrical, Mechanical, etc.)",
    "Information Systems, Information Technology, or System Administration",
    "A Natural Science (Biology, Chemistry, Physics, etc.)",
    "Mathematics or Statistics",
    "Web Development or Web Design",
    "Business Discipline (Accounting, Finance, Marketing, etc.)",
    "Humanities Discipline (Literature, History, Philosophy, etc.)",
    "Social Science (Anthropology, Psychology, Political Science, etc.)",
    "Fine Arts or Performing Arts (Graphic Design, Music, Studio Art, etc.)",
    "Health Science (Nursing, Pharmacy, Radiology, etc.)",
    "Other (please specify)",
    "Undecided / No Declared Major",
    "My school does not offer majors / primary areas of study",
    "Prefer not to answer"
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    phone: "",
    schoolName: "",
    levelOfStudy: "",
    countryOfResidence: "",
    tshirtSize: "",
    fieldOfStudy: "",
    linkedinUrl: "",
    githubUrl: "",
    resume: null as File | null,
    dietaryRestrictions: "",
    allergies: "",
    gender: "",
    raceEthnicity: "",
    mlhCodeOfConduct: false,
    mlhPrivacyPolicy: false,
    mlhEmails: false,
  });

  const [message, setMessage] = useState<string>("");

  // Fetch school names from MLH schools.csv
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData(prev => ({ ...prev, [id]: value.trim() || "" })); // Ensure empty string if value is missing
    setMessage(""); 
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, resume: files[0] as File }));
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setFormData(prev => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Current form data:", formData); // Debugging log
  
    const requiredFields = ["email", "password", "name", "age", "schoolName", "levelOfStudy", "countryOfResidence", "tshirtSize"];
    for (const field of requiredFields) {
      const fieldValue = formData[field as keyof typeof formData];
      if (!fieldValue || (typeof fieldValue === "string" && fieldValue.trim() === "")) {
        console.log(`Missing field: ${field}, Value: ${fieldValue}`);
        setMessage("Please fill out all required fields.");
        return;
      }
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      const userRef = doc(collection(db, "users"), user.uid);
      await setDoc(userRef, { ...formData });
  
      setMessage("Registration successful!");
    } 
    
    catch (error: any) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await fetch("https://raw.githubusercontent.com/MLH/mlh-policies/main/schools.csv");
        const text = await response.text();
        const csvSchools = text
          .split("\n")
          .slice(1)
          .map(line => line.split(",")[1]?.trim()) // Get school names
          .filter((school, index, self) => school && self.indexOf(school) === index && school !== "University of Texas at Arlington"); // Ensure uniqueness
  
        setSchools(["University of Texas at Arlington", ...csvSchools]); // UTA first, then "Select"
      } catch (error) {
        console.error("Failed to fetch schools:", error);
      }
    }
  
    fetchSchools();
  }, []);
  
  
  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <div className="registration-card">
          <form onSubmit={handleSubmit} className="form-container" style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <h3>Register Here</h3>
            {message && <p className="message">{message}</p>}
            {/* Email and Password */}
            <div className="form-group"><label>Email *</label><input type="email" id="email" value={formData.email} onChange={handleInputChange} required /></div>
            <div className="form-group"><label>Password *</label><input type="password" id="password" value={formData.password} onChange={handleInputChange} required /></div>
            <hr className="separator"/>
            {/* Required Fields */}
            <div className="form-group"><label>First and Last Name *</label><input type="text" id="name" value={formData.name} onChange={handleInputChange} required /></div>
            <div className="form-group"><label>Age * (Must be atleast 18 to apply)</label><input type="number" id="age" value={formData.age} onChange={handleInputChange} required /></div>
            <div className="form-group"><label>Phone Number</label><input type="text" id="phone" value={formData.phone} onChange={handleInputChange} /></div>
            {/* Dropdowns */}
            <div className="form-group">
              <label>School Name *</label>
                <select id="schoolName" value={formData.schoolName} onChange={handleInputChange} required>
                  <option value="">Select</option>
                  {schools.map(school => (
                  <option key={school} value={school}>{school}</option>
                  ))}
                </select>
            </div>
            <div className="form-group">
              <label htmlFor="fieldOfStudy">Level of Study *</label>
              <select id="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleInputChange} required>
                <option value="">Select</option>
                <option value="Computer Science">Freshman</option>
                <option value="Engineering">Sophomore</option>
                <option value="Mathematics">Junior</option>
                <option value="Business">Senior</option>
                <option value="Humanities">Graduate</option>
                <option value="Fine Arts">Phd</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="countryOfResidence">Country of Residence *</label>
              <select id="countryOfResidence" value={formData.countryOfResidence} onChange={handleInputChange} required>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="tshirtSize">T-Shirt Size *</label>
              <select id="tshirtSize" value={formData.tshirtSize} onChange={handleInputChange} required>
                <option value="">Select</option>
                {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            {/* Links */}
            <div className="form-group"><label>LinkedIn</label><input type="text" id="linkedinUrl" value={formData.linkedinUrl} onChange={handleInputChange} /></div>
            <div className="form-group"><label>GitHub</label><input type="text" id="githubUrl" value={formData.githubUrl} onChange={handleInputChange} /></div>
            {/* Resume Upload */}
            <div className="form-group">
              <label htmlFor="resume">Upload Resume</label>
              <input type="file" id="resume" onChange={handleFileChange} />
            </div>
            {/* Dietary Restrictions */}
            <div className="form-group">
              <label htmlFor="dietaryRestrictions">Dietary Restrictions</label>
              <select id="dietaryRestrictions" value={formData.dietaryRestrictions} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Celiac Disease">Celiac Disease</option>
                <option value="Allergies">Allergies (Specify Below)</option>
                <option value="Halal">Halal</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="raceEthnicity">Race</label>
              <select id="raceEthnicity" value={formData.raceEthnicity} onChange={handleInputChange}>
              <option value="">Select</option>
                <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                <option value="Asian">Asian</option>
                <option value="African American">African American</option>
                <option value="Native Hawaiian or other Pacific Islander">Native Hawaiian or other Pacific Islander</option>
                <option value="White">Halal</option>
              </select>
            </div>
            {/* MLH Conduct */}
            <div className="form-group checkbox">
              <label>
                <input type="checkbox" id="mlhCodeOfConduct" checked={formData.mlhCodeOfConduct} onChange={handleCheckboxChange} required />
                I have read and agree to the MLH Code of Conduct. *
              </label>
            </div>
            <div className="form-group checkbox">
              <label>
                <input type="checkbox" id="mlhPrivacyPolicy" checked={formData.mlhPrivacyPolicy} onChange={handleCheckboxChange} required />
                I authorize you to share my application/registration information with Major League Hacking for event administration.
              </label>
            </div>
            <div className="form-group checkbox">
              <label>
                <input type="checkbox" id="mlhEmails" checked={formData.mlhEmails} onChange={handleCheckboxChange} />
                I authorize MLH to send me occasional emails about relevant events and opportunities.
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
