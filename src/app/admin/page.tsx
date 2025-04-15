// src/app/admin/page.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { auth } from "../../../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import dynamic from "next/dynamic";
import "./admin-styles.css";
import QRComponent from "./QRComponent";

// Analytics components
const DashboardStats = dynamic(() => import("./components/DashboardStats"), {
  ssr: false,
});
const RegistrationChart = dynamic(
  () => import("./components/RegistrationChart"),
  { ssr: false }
);
import SchoolDistribution from "./components/SchoolDistribution";
import StudyLevelChart from "./components/StudyLevelChart";
import CheckInDownload from "./components/CheckInDownload";

interface Registration {
  email?: string;
  firstname?: string;
  lastname?: string;
  schoolName?: string;
  levelOfStudy?: string;
  fieldOfStudy?: string;
  phone?: string;
  age?: string | number;
  gender?: string;
  tshirtSize?: string;
  dietaryRestrictions?: string;
  countryOfResidence?: string;
  timestamp?: string | Date;
  [key: string]: unknown;
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [adminEmails] = useState<string[]>([
    "thesamarthjagtap@gmail.com",
    "datathon.uta@gmail.com",
    "rubab.shahzad@uta.edu",
    "lyndsey.dewitt@uta.edu",
    "sxr0682@mavs.uta.edu",
    "pratham153patil@gmail.com",
    "devratasauthor@gmail.com",
    "aastha6100@gmail.com",
    // Add your email here
    // Add other admin emails here
  ]);
  const [message, setMessage] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [viewMode, setViewMode] = useState<"dashboard" | "list" | "detail">(
    "dashboard"
  );

  // Define fetchRegistrations as a memoized callback to prevent dependency issues
  const fetchRegistrations = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setMessage("");

    try {
      // Create a token to authenticate our request
      const idToken = await user.getIdToken();

      // Call our API endpoint instead of directly accessing Firestore
      const response = await fetch("/api/admin/get-registrations", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setRegistrations(data);
      // setMessage(`Loaded ${data.length} registrations successfully`);
      // Default to dashboard view when data is loaded
      setViewMode("dashboard");
    } catch (error) {
      console.error("Error fetching registrations:", error);
      setMessage(
        `Error loading registrations: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && adminEmails.includes(currentUser.email || "")) {
        fetchRegistrations();
      }
    });
    return () => unsubscribe();
  }, [adminEmails, fetchRegistrations]);

  const exportToCSV = () => {
    // Extract email data
    const emails = registrations.map((reg) => reg.email).filter(Boolean);

    // Create CSV content
    const csvContent = ["email", ...emails].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `datathon_emails_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportFullDataToCSV = () => {
    // Define the fields to export
    const fields = [
      "email",
      "firstname",
      "lastname",
      "schoolName",
      "levelOfStudy",
      "fieldOfStudy",
      "phone",
      "age",
      "gender",
      "tshirtSize",
      "dietaryRestrictions",
      "countryOfResidence",
      "timestamp",
      "userEmail",
    ];

    // Create header row
    const csvRows = [fields.join(",")];

    // Add data rows
    for (const reg of registrations) {
      const row = fields
        .map((field) => {
          let value = reg[field];

          // Handle timestamp if it exists
          if (field === "timestamp" && value) {
            // Ensure we have a valid date object
            try {
              // Cast to string or Date to satisfy TypeScript
              const dateValue = value as string | Date;
              value = new Date(dateValue).toISOString();
            } catch {
              console.error("Invalid date format:", value);
              value = "";
            }
          }

          // Handle undefined values
          if (value === undefined || value === null) {
            return "";
          }

          // Escape commas and quotes
          const stringValue = String(value);
          if (
            stringValue.includes(",") ||
            stringValue.includes('"') ||
            stringValue.includes("\n")
          ) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        })
        .join(",");

      csvRows.push(row);
    }

    // Join rows with newlines and create file
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `datathon_participants_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // View a specific registration in detail
  const viewRegistrationDetail = (registration: Registration) => {
    setSelectedRegistration(registration);
    setViewMode("detail");
  };

  // Check if user is authenticated and is an admin
  const isAdmin = user && adminEmails.includes(user.email || "");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">
            Admin Login Required
          </h1>
          <p className="text-gray-300">
            Please sign in with an admin account to access this page.
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">Access Denied</h1>
          <p className="text-gray-300">
            You don&apos;t have permission to access this page.
          </p>
          <p className="text-gray-400 mt-4">Logged in as: {user.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-container">
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Datathon Admin Panel</h1>
            <p className="admin-subtitle">
              Manage registrations and view analytics
            </p>
          </div>

          <div className="admin-buttons">
            <button
              onClick={() => setViewMode("dashboard")}
              className={`admin-btn ${
                viewMode === "dashboard" ? "btn-active" : "btn-inactive"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`admin-btn ${
                viewMode === "list" ? "btn-active" : "btn-inactive"
              }`}
            >
              Registrations List
            </button>
            <button
              onClick={fetchRegistrations}
              disabled={loading}
              className="admin-btn btn-refresh"
            >
              {loading ? "Loading..." : "Refresh Data"}
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`admin-message ${
              message.includes("Error") ? "message-error" : "message-success"
            }`}
          >
            {message}
          </div>
        )}

        {/* Dashboard View with Analytics */}
        {viewMode === "dashboard" && registrations.length > 0 && (
          <div className="space-y-8">
            {/* Key Stats at the top */}
            <DashboardStats data={registrations} />

            {/* Charts section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Registration Timeline
                </h3>
                <RegistrationChart registrations={registrations} />
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">
                  School Distribution
                </h3>
                <SchoolDistribution registrations={registrations} />
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Study Level Distribution
                </h3>
                <StudyLevelChart registrations={registrations} />
              </div>

              <div className="chart-card">
                <h3 className="chart-title">Data Export</h3>
                <div className="export-buttons flex flex-col md:flex-row gap-4">
                  {/* CheckInDownload Button */}
                  <CheckInDownload />
                </div>

                <div className="export-buttons flex flex-col md:flex-row gap-4">
                  {/* Export Emails Button */}
                  <button
                    onClick={exportToCSV}
                    disabled={loading || registrations.length === 0}
                    className={`export-btn btn-blue ${
                      loading || registrations.length === 0
                        ? "btn-disabled"
                        : ""
                    }`}
                  >
                    <span>Export Emails Only (CSV)</span>
                  </button>

                  {/* Export All Data Button */}
                  <button
                    onClick={exportFullDataToCSV}
                    disabled={loading || registrations.length === 0}
                    className={`export-btn btn-green ${
                      loading || registrations.length === 0
                        ? "btn-disabled"
                        : ""
                    }`}
                  >
                    <span>Export All Registration Data (CSV)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Registrations */}
            <div className="recent-registrations">
              <div className="section-header">
                <h3 className="section-header">Recent Registrations</h3>
                <button
                  onClick={() => setViewMode("list")}
                  className="section-button"
                >
                  View All →
                </button>
              </div>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>School</th>
                      <th>Registered</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations
                      .sort((a, b) => {
                        const dateA = a.timestamp
                          ? new Date(a.timestamp).getTime()
                          : 0;
                        const dateB = b.timestamp
                          ? new Date(b.timestamp).getTime()
                          : 0;
                        return dateB - dateA;
                      })
                      .slice(0, 5)
                      .map((reg, index) => (
                        <tr key={index} className="table-row">
                          <td>{`${reg.firstname || ""} ${
                            reg.lastname || ""
                          }`}</td>
                          <td>{reg.email || ""}</td>
                          <td>{reg.schoolName || "N/A"}</td>
                          <td>
                            {reg.timestamp
                              ? new Date(reg.timestamp).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td>
                            <button
                              onClick={() => viewRegistrationDetail(reg)}
                              className="action-button"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Registrations List View */}
        {viewMode === "list" && registrations.length > 0 && (
          <div className="registrations-list">
            <div className="list-header">
              <h2 className="list-title">All Registrations</h2>
              <div className="list-actions">
                <button
                  onClick={exportToCSV}
                  className="button-primary button-blue"
                >
                  Export Emails
                </button>
                <button
                  onClick={exportFullDataToCSV}
                  className="button-primary button-green"
                >
                  Export All Data
                </button>
              </div>
            </div>

            {/* Table of registrations */}
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>School</th>
                    <th>Level</th>
                    <th>Field</th>
                    <th>Registered</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg, index) => (
                    <tr
                      key={index}
                      className={`table-row ${
                        index % 2 === 0 ? "row-even" : "row-odd"
                      }`}
                    >
                      <td>{`${reg.firstname || ""} ${reg.lastname || ""}`}</td>
                      <td>{reg.email || ""}</td>
                      <td>{reg.schoolName || "N/A"}</td>
                      <td>{reg.levelOfStudy || "N/A"}</td>
                      <td>{reg.fieldOfStudy || "N/A"}</td>
                      <td>
                        {reg.timestamp
                          ? new Date(reg.timestamp).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        <button
                          onClick={() => viewRegistrationDetail(reg)}
                          className="action-button"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Individual Registration Detail View */}
        {viewMode === "detail" && selectedRegistration && (
          <div className="detail-view">
            {/* Detail view header */}
            <div className="detail-header">
              <h2 className="detail-title">Registration Details</h2>
              <button
                onClick={() => {
                  setViewMode(registrations.length > 0 ? "list" : "dashboard");
                  setSelectedRegistration(null);
                }}
                className="back-button"
              >
                &larr; Back
              </button>
            </div>

            {/* Detail content */}
            <div className="detail-card">
              <div className="detail-grid">
                {/* Personal Information */}
                <section>
                  <h3 className="section-title">Personal Information</h3>
                  <dl className="info-list">
                    {[
                      {
                        label: "Name",
                        value: `${selectedRegistration.firstname || ""} ${
                          selectedRegistration.lastname || ""
                        }`,
                      },
                      {
                        label: "Email",
                        value: selectedRegistration.email || "N/A",
                      },
                      {
                        label: "Phone",
                        value: selectedRegistration.phone || "N/A",
                      },
                      {
                        label: "Age",
                        value: selectedRegistration.age || "N/A",
                      },
                      {
                        label: "Gender",
                        value: selectedRegistration.gender || "N/A",
                      },
                      {
                        label: "Country",
                        value: selectedRegistration.countryOfResidence || "N/A",
                      },
                    ].map((item, index) => (
                      <div key={index} className="info-item">
                        <dt className="info-label">{item.label}</dt>
                        <dd className="info-value">{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>

                {/* Academic Information */}
                <section>
                  <h3 className="section-title">Academic Information</h3>
                  <dl className="info-list">
                    {[
                      {
                        label: "School",
                        value: selectedRegistration.schoolName || "N/A",
                      },
                      {
                        label: "Level of Study",
                        value: selectedRegistration.levelOfStudy || "N/A",
                      },
                      {
                        label: "Field of Study",
                        value: selectedRegistration.fieldOfStudy || "N/A",
                      },
                    ].map((item, index) => (
                      <div key={index} className="info-item">
                        <dt className="info-label">{item.label}</dt>
                        <dd className="info-value">{item.value}</dd>
                      </div>
                    ))}
                  </dl>

                  {/* Event Information */}
                  <h3 className="section-title mt-6">Event Information</h3>
                  <dl className="info-list">
                    {[
                      {
                        label: "T-Shirt Size",
                        value: selectedRegistration.tshirtSize || "N/A",
                      },
                      {
                        label: "Dietary Restrictions",
                        value:
                          selectedRegistration.dietaryRestrictions || "None",
                      },
                    ].map((item, index) => (
                      <div key={index} className="info-item">
                        <dt className="info-label">{item.label}</dt>
                        <dd className="info-value">{item.value}</dd>
                      </div>
                    ))}

                    {/* Resume */}
                    {selectedRegistration.resume &&
                    typeof selectedRegistration.resume === "string" ? (
                      <div className="resume-actions">
                        <a
                          href={selectedRegistration.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-link"
                        >
                          Download Resume
                        </a>
                        <button
                          onClick={() =>
                            window.open(
                              selectedRegistration.resume as string,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          className="action-button"
                        >
                          View Online
                        </button>
                      </div>
                    ) : (
                      <p className="info-value">No resume uploaded</p>
                    )}

                    {/* Registration Date */}
                    <div className="info-item">
                      <dt className="info-label">Registration Date</dt>
                      <dd className="info-value">
                        {selectedRegistration.timestamp
                          ? new Date(
                              selectedRegistration.timestamp
                            ).toLocaleString()
                          : "N/A"}
                      </dd>
                    </div>
                  </dl>
                </section>
              </div>
              {/* QR Code */}
              <QRComponent userId={selectedRegistration.userId as string} />
            </div>
          </div>
        )}

        {/* Empty State */}
        {registrations.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg
              className="w-16 h-16 text-gray-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              No Registration Data
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              No registrations have been loaded yet. Click the &quot;Load
              Registration Data&quot; button to fetch data from the database.
            </p>
            <button
              onClick={fetchRegistrations}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Loading..." : "Load Registration Data"}
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
}
