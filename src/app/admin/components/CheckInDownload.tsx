// components/CheckInDownload.tsx

"use client";

import React, { useState } from "react";
import { db, collection, getDocs } from "../../../../firebase"; // Adjust path as needed

const CSV_HEADERS = [
  "userDocId",
  "firstname",
  "lastname",
  "email",
  "schoolName",
  "levelOfStudy",
  "fieldOfStudy",
  "countryOfResidence",
  "age",
  "gender",
  "raceEthnicity",
  "tshirtSize",
  "dietaryRestrictions",
  "phone",
  "userEmail",
  "timestamp",
];

function toCsvRow(obj: Record<string, string | number | boolean | null>, headers: string[]) {
  return headers
    .map((h) => `"${(obj[h] ?? "").toString().replace(/"/g, '""')}"`)
    .join(",");
}

export default function CheckInDownload() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    // 1. Fetch all qr-links
    const qrLinksSnap = await getDocs(collection(db, "qr-links"));
    const qrLinks = qrLinksSnap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as { userDocId?: string }), // Explicitly typing doc.data()
    }));

    // 2. For each qr-link, fetch the registration doc by userDocId
    const registrationPromises = qrLinks.map(async (qr) => {
      if (!qr.userDocId) return null;
      try {
        const regSnap = await getDocs(collection(db, "registrations"));
        // Find the registration with matching doc id
        const regDoc = regSnap.docs.find((d) => d.id === qr.userDocId);
        if (!regDoc) return null;
        return { userDocId: qr.userDocId, ...regDoc.data() };
      } catch {
        return null;
      }
    });

    const registrations = (await Promise.all(registrationPromises)).filter(
      Boolean
    );

    // 3. Build CSV
    let csv = CSV_HEADERS.join(",") + "\n";
    csv += registrations
      .filter((reg) => reg !== null)
      .map((reg) => toCsvRow(reg as Record<string, string | number | boolean | null>, CSV_HEADERS))
      .join("\n");

    // 4. Download CSV
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "checkin-registrations.csv";
    a.click();
    URL.revokeObjectURL(url);

    setLoading(false);
  };

  return (
    <div className="export-buttons">
      <button
        onClick={handleDownload}
        disabled={loading}
        className={`export-btn btn-blue ${loading ? "btn-disabled" : ""}`}
      >
        {loading ? "Preparing CSV..." : "Download Check IN's CSV"}
      </button>
    </div>
  );
}
