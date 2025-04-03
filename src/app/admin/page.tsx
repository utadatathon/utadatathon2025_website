// src/app/admin/page.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { auth } from "../../../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import "./admin-styles.css";

// Analytics components
import DashboardStats from "./components/DashboardStats";
import RegistrationChart from "./components/RegistrationChart";
import SchoolDistribution from "./components/SchoolDistribution";
import StudyLevelChart from "./components/StudyLevelChart";

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
            <p className="admin-subtitle">Manage registrations and view analytics</p>
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

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Data Export
                </h3>
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={exportToCSV}
                    disabled={loading || registrations.length === 0}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                  >
                    Export Emails Only (CSV)
                  </button>

                  <button
                    onClick={exportFullDataToCSV}
                    disabled={loading || registrations.length === 0}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                  >
                    Export All Registration Data (CSV)
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Registrations */}
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Recent Registrations
                </h3>
                <button
                  onClick={() => setViewMode("list")}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View All →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="p-3 text-gray-200 border-b border-gray-600">
                        Name
                      </th>
                      <th className="p-3 text-gray-200 border-b border-gray-600">
                        Email
                      </th>
                      <th className="p-3 text-gray-200 border-b border-gray-600">
                        School
                      </th>
                      <th className="p-3 text-gray-200 border-b border-gray-600">
                        Registered
                      </th>
                      <th className="p-3 text-gray-200 border-b border-gray-600">
                        Actions
                      </th>
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
                        <tr
                          key={index}
                          className="bg-gray-800/50 hover:bg-gray-700/50"
                        >
                          <td className="p-3 border-b border-gray-700 text-gray-300">{`${
                            reg.firstname || ""
                          } ${reg.lastname || ""}`}</td>
                          <td className="p-3 border-b border-gray-700 text-gray-300">
                            {reg.email || ""}
                          </td>
                          <td className="p-3 border-b border-gray-700 text-gray-300">
                            {reg.schoolName || ""}
                          </td>
                          <td className="p-3 border-b border-gray-700 text-gray-300">
                            {reg.timestamp
                              ? new Date(reg.timestamp).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className="p-3 border-b border-gray-700">
                            <button
                              onClick={() => viewRegistrationDetail(reg)}
                              className="text-blue-400 hover:text-blue-300"
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
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">
                All Registrations
              </h2>
              <div className="flex space-x-4">
                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Export Emails
                </button>
                <button
                  onClick={exportFullDataToCSV}
                  className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Export All Data
                </button>
              </div>
            </div>

            {/* Table of registrations */}
            <div className="overflow-x-auto bg-gray-700/30 rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="p-3 text-gray-200 border-b border-gray-600">
                      Name
                    </th>
                    <th className="p-3 text-gray-200 border-b border-gray-600">
                      Email
                    </th>
                    <th className="p-3 text-gray-200 border-b border-gray-600">
                      School
                    </th>
                    <th className="p-3 text-gray-200 border-b border-gray-600">
                      Level
                    </th>
                    <th className="p-3 text-gray-200 border-b border-gray-600">
                      Field
                    </th>
                    <th className="p-3 text-gray-200 border-b border-gray-600">
                      Registered
                    </th>
                    <th className="p-3 text-gray-200 border-b border-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-700/30"
                      }
                    >
                      <td className="p-3 border-b border-gray-700 text-gray-300">{`${
                        reg.firstname || ""
                      } ${reg.lastname || ""}`}</td>
                      <td className="p-3 border-b border-gray-700 text-gray-300">
                        {reg.email || ""}
                      </td>
                      <td className="p-3 border-b border-gray-700 text-gray-300">
                        {reg.schoolName || ""}
                      </td>
                      <td className="p-3 border-b border-gray-700 text-gray-300">
                        {reg.levelOfStudy || ""}
                      </td>
                      <td className="p-3 border-b border-gray-700 text-gray-300">
                        {reg.fieldOfStudy || ""}
                      </td>
                      <td className="p-3 border-b border-gray-700 text-gray-300">
                        {reg.timestamp
                          ? new Date(reg.timestamp).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="p-3 border-b border-gray-700">
                        <button
                          onClick={() => viewRegistrationDetail(reg)}
                          className="text-blue-400 hover:text-blue-300"
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
          <div className="space-y-6">
            {/* Detail view header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">
                Registration Details
              </h2>
              <button
                onClick={() => {
                  setViewMode(registrations.length > 0 ? "list" : "dashboard");
                  setSelectedRegistration(null);
                }}
                className="text-blue-400 hover:text-blue-300"
              >
                &larr; Back
              </button>
            </div>

            {/* Detail content */}
            <div className="bg-gray-700/30 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">
                    Personal Information
                  </h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-400">Name</dt>
                      <dd className="text-gray-200">{`${
                        selectedRegistration.firstname || ""
                      } ${selectedRegistration.lastname || ""}`}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-400">Email</dt>
                      <dd className="text-gray-200">
                        {selectedRegistration.email || "N/A"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-400">Phone</dt>
                      <dd className="text-gray-200">
                        {selectedRegistration.phone || "N/A"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-400">Age</dt>
                      <dd className="text-gray-200">
                        {selectedRegistration.age || "N/A"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-400">Gender</dt>
                      <dd className="text-gray-200">
                        {selectedRegistration.gender || "N/A"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-400">Country</dt>
                      <dd className="text-gray-200">
                        {selectedRegistration.countryOfResidence || "N/A"}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4">
                    Academic Information
                  </h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-400">School</dt>
                      <dd className="text-gray-200">
                        {selectedRegistration.schoolName || "N/A"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-400">Level of Study</dt>
                      <dd className="text-gray-200">
                        {selectedRegistration.levelOfStudy || "N/A"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-400">Field of Study</dt>
                      <dd className="text-gray-200">
                        {selectedRegistration.fieldOfStudy || "N/A"}
                      </dd>
                    </div>
                  </dl>

                  <h3 className="text-lg font-medium text-white mt-6 mb-4">
                    Event Information
                  </h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-400">T-Shirt Size</dt>
                      <dd className="text-gray-200">
                        {selectedRegistration.tshirtSize || "N/A"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-400">
                        Dietary Restrictions
                      </dt>
                      <dd className="text-gray-200">
                        {selectedRegistration.dietaryRestrictions || "None"}
                      </dd>
                    </div>
                    <dd className="text-gray-200">
                      {selectedRegistration.resume &&
                      typeof selectedRegistration.resume === "string" ? (
                        <div>
                          <a
                            href={selectedRegistration.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 mr-4"
                          >
                            Download Resume
                          </a>
                          <button
                            onClick={() => {
                              // Open a modal or new window with the PDF viewer
                              window.open(
                                selectedRegistration.resume as string,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }}
                            className="text-green-400 hover:text-green-300"
                          >
                            View Online
                          </button>
                        </div>
                      ) : (
                        "No resume uploaded"
                      )}
                    </dd>

                    <div>
                      <dt className="text-sm text-gray-400">
                        Registration Date
                      </dt>
                      <dd className="text-gray-200">
                        {selectedRegistration.timestamp
                          ? new Date(
                              selectedRegistration.timestamp
                            ).toLocaleString()
                          : "N/A"}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
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
