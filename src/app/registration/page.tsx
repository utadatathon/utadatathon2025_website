'use client';

import { useState } from "react";
import { auth, db } from "@/app/firebase/configuration";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    countryOfResidence: "",
    levelOfStudy: "",
    age: "",
    phone: "",
    schoolName: "University of Texas at Arlington",
    tshirtSize: "",
    fieldOfStudy: "",
    linkedinUrl: "",
    githubUrl: "",
    resume: null as File | null,
    dietaryRestrictions: "",
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
      await setDoc(userRef, {
        name: formData.name,
        email: formData.email,
        countryOfResidence: formData.countryOfResidence,
        levelOfStudy: formData.levelOfStudy,
        age: formData.age || null,
        phone: formData.phone || null,
        schoolName: formData.schoolName,
        tshirtSize: formData.tshirtSize || null,
        fieldOfStudy: formData.fieldOfStudy || null,
        linkedinUrl: formData.linkedinUrl || null,
        githubUrl: formData.githubUrl || null,
        dietaryRestrictions: formData.dietaryRestrictions || null,
        gender: formData.gender || null,
        raceEthnicity: formData.raceEthnicity || null,
        mlhCodeOfConduct: formData.mlhCodeOfConduct,
        mlhPrivacyPolicy: formData.mlhPrivacyPolicy,
        mlhEmails: formData.mlhEmails,
      });

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
              <label htmlFor="name">First and Last Name *</label>
              <input type="text" id="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="countryOfResidence">Country of Residence *</label>
              <input type="text" id="countryOfResidence" value={formData.countryOfResidence} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="levelOfStudy">Level of Study *</label>
              <input type="text" id="levelOfStudy" value={formData.levelOfStudy} onChange={handleInputChange} required />
            </div>

            {/* Optional Fields */}
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="text" id="age" value={formData.age} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="text" id="phone" value={formData.phone} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="resume">Resume</label>
              <input type="file" id="resume" onChange={handleFileChange} />
            </div>

            {/* Agreement Checkboxes */}
            <div className="form-group">
              <label>
                <input type="checkbox" id="mlhCodeOfConduct" checked={formData.mlhCodeOfConduct} onChange={handleCheckboxChange} required />
                I agree to the MLH Code of Conduct *
              </label>
            </div>
            <div className="form-group">
              <label>
                <input type="checkbox" id="mlhPrivacyPolicy" checked={formData.mlhPrivacyPolicy} onChange={handleCheckboxChange} required />
                I agree to the MLH Privacy Policy *
              </label>
            </div>

            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
