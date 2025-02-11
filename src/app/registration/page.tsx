"use client";
import { useEffect, useState } from "react";
import {
    db,
    storage,
    auth,
    ref,
    uploadBytes,
    getDownloadURL,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    serverTimestamp
  } from "../../../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import SuccessScreen from '../components/SuccessScreen';
import AuthComponent from '../components/AuthComponent'; 

interface IUserModel {
  firstname: string;
  lastname: string;
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
  // Auth states
  const [user, setUser] = useState<User | null>(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Form states
  const [data, setData] = useState<IUserModel>({
    firstname: "",
    lastname: "",
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

  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Auth effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Auth handler
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, authEmail, authPassword);
      } else {
        await signInWithEmailAndPassword(auth, authEmail, authPassword);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setMessage("Authentication failed");
    }
  };

  // A static list of countries
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "India",
    "China",
    "Japan",
    "Brazil",
  ];

  // Schools state and fetch effect
  const [schools, setSchools] = useState<string[]>([]);
  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/MLH/mlh-policies/main/schools.csv"
        );
        const text = await response.text();
        const csvSchools = text
          .split("\n")
          .slice(1)
          .map((line) => {
            const columns = line.split(",");
            if (columns.length >= 3) {
              return {
                name: columns[1].trim(),
                country: columns[2].trim(),
              };
            }
            return null;
          })
          .filter(
            (school) => school !== null && school.country === "United States"
          )
          .map((school) => school!.name);
        
        setSchools([
          "University of Texas at Arlington",
          ...csvSchools.filter(
            (school) => school !== "University of Texas at Arlington"
          ),
        ]);
      } catch (error) {
        console.error("Failed to fetch schools:", error);
      }
    }
    fetchSchools();
  }, []);

  // Form handlers
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setData((prev) => ({ ...prev, [id]: value }));
    setMessage("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setData((prev) => ({ ...prev, resume: files[0] }));
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setData((prev) => ({ ...prev, [id]: checked }));
  };

  //const validateUrl = (url: string) => {
    //try {
      //new URL(url);
      //return true;
   // } catch {
    //  return false;
   // }
  //};

  const [submitted, setSubmitted] = useState(false);

// 3. Add check for existing registration
useEffect(() => {
  const checkRegistration = async () => {
    if (user) {
      const q = query(collection(db, "registrations"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setSubmitted(true);
      }
    }
  };
  
  checkRegistration();
}, [user]);



const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      if (!user) {
        setMessage("Please sign in to submit");
        return;
      }
  
      // Check for existing registration
      const q = query(collection(db, "registrations"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setMessage("You have already submitted a registration");
        return;
      }
  
      let resumeUrl = "";
      if (data.resume) {
        const resumeRef = ref(storage, `resumes/${user.uid}/${Date.now()}-${data.resume.name}`);
        await uploadBytes(resumeRef, data.resume);
        resumeUrl = await getDownloadURL(resumeRef);
      }
  
      await addDoc(collection(db, "registrations"), {
        ...data,
        userId: user.uid,
        userEmail: user.email,
        resume: resumeUrl,
        timestamp: serverTimestamp(),
      });
  
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error submitting form.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="video-container">
    {submitted ? (
      <SuccessScreen />
    ) : (
      <>
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/videos/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="content">
          {!user ? (
            <AuthComponent
              authEmail={authEmail}
              authPassword={authPassword}
              setAuthEmail={setAuthEmail}
              setAuthPassword={setAuthPassword}
              isRegistering={isRegistering}
              setIsRegistering={setIsRegistering}
              handleAuth={handleAuth}
              message={message}
            />
        ) : (
          <div className="registration-card">
            <h3>Register Here</h3>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleFormSubmit} className="form-container">
            {/* First Name */}
            <div className="form-group">
              <label htmlFor="firstname">First Name *</label>
              <input
                type="text"
                id="firstname"
                value={data.firstname}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            {/* Last Name */}
            <div className="form-group">
              <label htmlFor="lastname">Last Name *</label>
              <input
                type="text"
                id="lastname"
                value={data.lastname}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            {/* Age */}
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
            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone *</label>
              <input
                type="text"
                id="phone"
                value={data.phone}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            {/* Email */}
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
            {/* School Name */}
            <div className="form-group">
              <label htmlFor="schoolName">School Name *</label>
              <select
                id="schoolName"
                value={data.schoolName}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select your school</option>
                {schools.map((school) => (
                  <option key={school} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>
            {/* Level of Study */}
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
            {/* Country of Residence */}
            <div className="form-group">
              <label htmlFor="countryOfResidence">Country of Residence *</label>
              <select
                id="countryOfResidence"
                value={data.countryOfResidence}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select your country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            {/* T-shirt Size */}
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
            {/* Field of Study */}
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
            {/* LinkedIn URL */}
            <div className="form-group">
              <label htmlFor="linkedinUrl">LinkedIn URL *</label>
              <input
                type="text"
                id="linkedinUrl"
                value={data.linkedinUrl}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            {/* GitHub URL */}
            <div className="form-group">
              <label htmlFor="githubUrl">GitHub URL *</label>
              <input
                type="text"
                id="githubUrl"
                value={data.githubUrl}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            {/* Resume Upload */}
            <div className="form-group">
              <label htmlFor="resume">Resume *</label>
              <input
                type="file"
                id="resume"
                onChange={handleFileChange}
                className="form-input"
                required
              />
            </div>
            {/* Dietary Restrictions */}
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
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Celiac Disease">Celiac Disease</option>
                <option value="Allergies">Allergies</option>
                <option value="Halal">Halal</option>
              </select>
            </div>
            {/* Gender */}
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
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            {/* Race/Ethnicity */}
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
                <option value="Black">Black</option>
                <option value="Hispanic">Hispanic</option>
                <option value="White">White</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            {/* MLH Code of Conduct */}
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
            {/* MLH Privacy Policy */}
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
            {/* MLH Emails (Optional) */}
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
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
        )}
        </div>
        </>
    )}
      </div>
  );
}
