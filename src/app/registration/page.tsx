'use client';

import { useState } from "react";
import { auth, db } from "@/app/firebase/configuration";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

export default function Register() {
  const countries = [
    "United States", "Canada", "United Kingdom", "Australia", "Germany", 
    "France", "India", "China", "Japan", "Brazil", "Mexico", "Spain", "Italy",
    "South Korea", "Netherlands", "Sweden", "Switzerland", "South Africa"
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    countryOfResidence: "United States",
    levelOfStudy: "",
    tshirtSize: "",
    fieldOfStudy: "",
    linkedinUrl: "",
    githubUrl: "",
    dietaryRestrictions: "",
    allergies: "",
    gender: "",
    raceEthnicity: "",
    mlhCodeOfConduct: false,
    mlhPrivacyPolicy: false,
    mlhEmails: false,
  });

  const [message, setMessage] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setMessage("");
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setFormData(prev => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate required fields
    if (!formData.email || !formData.password || !formData.name || !formData.countryOfResidence || !formData.levelOfStudy) {
      setMessage("Please fill out all required fields.");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Save user details (excluding password) to Firestore
      const userRef = doc(collection(db, "users"), user.uid);
      await setDoc(userRef, { ...formData });

      setMessage("Registration successful!");
    } catch (error: any) {
      setMessage(error.message);
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
          <form onSubmit={handleSubmit} className="form-container">
            <h3>Register Here</h3>
            {message && <p className="message">{message}</p>}

            {/* Email and Password */}
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input type="password" id="password" value={formData.password} onChange={handleInputChange} required />
            </div>
            <hr className="separator" />

            {/* Mandatory Fields */}
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input type="text" id="name" value={formData.name} onChange={handleInputChange} required />
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
              <label htmlFor="levelOfStudy">Level of Study *</label>
              <input type="text" id="levelOfStudy" value={formData.levelOfStudy} onChange={handleInputChange} required />
            </div>

            {/* Additional Fields */}
            <div className="form-group">
              <label htmlFor="tshirtSize">T-Shirt Size</label>
              <select id="tshirtSize" value={formData.tshirtSize} onChange={handleInputChange}>
                <option value="">Select</option>
                {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="fieldOfStudy">Field of Study</label>
              <select id="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Business">Business</option>
                <option value="Humanities">Humanities</option>
                <option value="Fine Arts">Fine Arts</option>
                <option value="Health Science">Health Science</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="linkedinUrl">LinkedIn URL</label>
              <input type="text" id="linkedinUrl" value={formData.linkedinUrl} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="githubUrl">GitHub URL</label>
              <input type="text" id="githubUrl" value={formData.githubUrl} onChange={handleInputChange} />
            </div>

            {/* MLH Agreement Checkboxes */}
            <div className="form-group checkbox-group">
              <label>
                <input type="checkbox" id="mlhCodeOfConduct" checked={formData.mlhCodeOfConduct} onChange={handleCheckboxChange} required />
                I have read and agree to the MLH Code of Conduct. *
              </label>
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input type="checkbox" id="mlhPrivacyPolicy" checked={formData.mlhPrivacyPolicy} onChange={handleCheckboxChange} required />
                I authorize you to share my application/registration information with Major League Hacking for event administration.
              </label>
            </div>
            <div className="form-group checkbox-group">
              <label>
                <input type="checkbox" id="mlhEmails" checked={formData.mlhEmails} onChange={handleCheckboxChange} />
                I authorize MLH to send me occasional emails about relevant events and opportunities.
              </label>
            </div>

            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
