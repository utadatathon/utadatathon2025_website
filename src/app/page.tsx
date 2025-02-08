'use client';
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnPuuPA6zJI_m_Mb-2K9MJiZV_XoF9qkI",
  authDomain: "datathon2025-4b999.firebaseapp.com",
  projectId: "datathon2025-4b999",
  storageBucket: "datathon2025-4b999.firebasestorage.app",
  messagingSenderId: "412231169788",
  appId: "1:412231169788:web:9c4494f4aab789cd6a4979",
  measurementId: "G-FBVMVJXZ4N"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

interface IUserModel {
  name: string;
  age: string;
  email: string;
  phone: string;
  schoolName: string;
  levelOfStudy: string;
  countryOfResidence: string;
  tshirtSize: string;
  fieldOfStudy: string;
  linkedinUrl: string;
  githubUrl: string;
  resume: File | null;
  dietaryRestrictions: string;
  gender: string;
  raceEthnicity: string;
  mlhCodeOfConduct: boolean;
  mlhPrivacyPolicy: boolean;
  mlhEmails: boolean;
}

export default function Home() {
  const [data, setData] = useState<IUserModel>({
    name: "",
    age: "",
    email: "",
    phone: "",
    schoolName: "",
    levelOfStudy: "",
    countryOfResidence: "",
    tshirtSize: "",
    fieldOfStudy: "",
    linkedinUrl: "",
    githubUrl: "",
    resume: null,
    dietaryRestrictions: "",
    gender: "",
    raceEthnicity: "",
    mlhCodeOfConduct: false,
    mlhPrivacyPolicy: false,
    mlhEmails: false,
  });

  const [schools, setSchools] = useState<string[]>([]);
  const [countries] = useState<string[]>(["United States", "Canada", "United Kingdom", "Australia", "Germany", "France", "India", "China", "Japan", "Brazil"]);
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await fetch('https://raw.githubusercontent.com/MLH/mlh-policies/main/schools.csv');
        const text = await response.text();
        const csvSchools = text.split('\n').slice(1).map(line => {
          const columns = line.split(',');
          if (columns.length >= 3) {
            return {
              name: columns[1].trim(),
              country: columns[2].trim()
            };
          }
          return null;
        }).filter(school => school !== null && school.country === "United States").map(school => school!.name);

        setSchools(['University of Texas at Arlington', ...csvSchools.filter(school => school !== 'University of Texas at Arlington')]);
      } catch (error) {
        console.error("Failed to fetch schools:", error);
        setSchools(['University of Texas at Arlington']); // Fallback option
      }
    }

    fetchSchools();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setData(prev => ({ ...prev, [id]: value }));
    setMessage("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setData(prev => ({ ...prev, resume: event.target.files![0] }));
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setData(prev => ({ ...prev, [id]: checked }));
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const validateForm = () => {
    // Check for empty required fields
    const requiredFields = Object.entries(data).filter(([key]) => 
      key !== 'mlhEmails' // mlhEmails is optional
    );
    
    for (const [key, value] of requiredFields) {
      if (!value && value !== false) {
        setMessage(`Please fill out the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
        return false;
      }
    }

    // Validate URLs
    if (!validateUrl(data.linkedinUrl)) {
      setMessage("Please enter a valid LinkedIn URL");
      return false;
    }
    if (!validateUrl(data.githubUrl)) {
      setMessage("Please enter a valid GitHub URL");
      return false;
    }

    // Validate checkboxes
    if (!data.mlhCodeOfConduct || !data.mlhPrivacyPolicy) {
      setMessage("You must agree to the MLH Code of Conduct and Privacy Policy");
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setMessage("Submitting...");

    try {
      // Upload resume to Firebase Storage
      let resumeUrl = '';
      if (data.resume) {
        const storageRef = ref(storage, `resumes/${data.email}-${data.resume.name}`);
        await uploadBytes(storageRef, data.resume);
        resumeUrl = storageRef.fullPath;
      }

      // Save form data to Firestore
      const docRef = await addDoc(collection(db, "registrations"), {
        ...data,
        resume: resumeUrl, // Store the storage path instead of the File object
        timestamp: new Date().toISOString()
      });

      setMessage("Registration submitted successfully!");
      // Reset form
      setData({
        name: "",
        age: "",
        email: "",
        phone: "",
        schoolName: "",
        levelOfStudy: "",
        countryOfResidence: "",
        tshirtSize: "",
        fieldOfStudy: "",
        linkedinUrl: "",
        githubUrl: "",
        resume: null,
        dietaryRestrictions: "",
        gender: "",
        raceEthnicity: "",
        mlhCodeOfConduct: false,
        mlhPrivacyPolicy: false,
        mlhEmails: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/videos/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <div className="registration-card">
          <form onSubmit={handleFormSubmit} className="form-container">
            <h3>Register Here</h3>
            {message && <p className={`message ${message.includes("Error") ? "error" : "success"}`}>{message}</p>}
            
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="text"
                id="age"
                value={data.age}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="tel"
                id="phone"
                value={data.phone}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="schoolName">School Name *</label>
              <select
                id="schoolName"
                value={data.schoolName}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select</option>
                {schools.map(school => (
                  <option key={school} value={school}>{school}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="levelOfStudy">Level of Study *</label>
              <select
                id="levelOfStudy"
                value={data.levelOfStudy}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select</option>
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Graduate">Graduate</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="countryOfResidence">Country of Residence *</label>
              <select
                id="countryOfResidence"
                value={data.countryOfResidence}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tshirtSize">T-shirt Size *</label>
              <select
                id="tshirtSize"
                value={data.tshirtSize}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="fieldOfStudy">Field of Study *</label>
              <select
                id="fieldOfStudy"
                value={data.fieldOfStudy}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Information Systems">Information Systems</option>
                <option value="Natural Science">Natural Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Web Development">Web Development</option>
                <option value="Business">Business</option>
                <option value="Humanities">Humanities</option>
                <option value="Social Science">Social Science</option>
                <option value="Fine Arts">Fine Arts</option>
                <option value="Health Science">Health Science</option>
                <option value="Other">Other</option>
                <option value="Undecided">Undecided</option>
                <option value="No Major">No Major</option>
                <option value="Prefer not to answer">Prefer not to answer</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="linkedinUrl">LinkedIn URL *</label>
              <input
                type="url"
                id="linkedinUrl"
                value={data.linkedinUrl}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="githubUrl">GitHub URL *</label>
              <input
                type="url"
                id="githubUrl"
                value={data.githubUrl}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="resume">Resume *</label>
              <input
                type="file"
                id="resume"
                onChange={handleFileChange}
                className="form-input"
                accept=".pdf,.doc,.docx"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dietaryRestrictions">Dietary Restrictions *</label>
              <select
                id="dietaryRestrictions"
                value={data.dietaryRestrictions}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select</option>
                <option value="None">None</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Gluten-Free">Gluten-Free</option>
                <option value="Halal">Halal</option>
                <option value="Kosher">Kosher</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender *</label>
              <select
                id="gender"
                value={data.gender}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="raceEthnicity">Race/Ethnicity *</label>
              <select
                id="raceEthnicity"
                value={data.raceEthnicity}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select</option>
                <option value="Asian">Asian</option>
                <option value="Black/African American">Black/African American</option>
                <option value="Hispanic/Latino">Hispanic/Latino</option>
                <option value="White">White</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  id="mlhCodeOfConduct"
                  checked={data.mlhCodeOfConduct}
                  onChange={handleCheckboxChange}
                  required
                />
                I have read and agree to the MLH Code of Conduct. *
              </label>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  id="mlhPrivacyPolicy"
                  checked={data.mlhPrivacyPolicy}
                  onChange={handleCheckboxChange}
                  required
                />
                I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the MLH Privacy Policy. *
              </label>
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  id="mlhEmails"
                  checked={data.mlhEmails}
                  onChange={handleCheckboxChange}
                />
                I authorize MLH to send me occasional emails about relevant events, career opportunities, and community announcements.
              </label>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}