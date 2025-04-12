"use client";

import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { auth, db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import "./dashboard.css";

const EVENT_DETAILS = [
  {
    id: "event-1",
    name: "Registration & Check-in",
    date: "April 12, 2025 | 8:00 AM - 10:00 AM"
  },
  {
    id: "event-2",
    name: "T-shirts",
    date: "April 12, 2025 | 11 AM - 11:30 PM"
  },
  {
    id: "event-4",
    name: "Lunch",
    date: "April 12, 2025 | 11:30 AM - 1:00 PM"
  },
  {
    id: "event-5",
    name: "Workshop #1",
    date: "April 12, 2025 | 1:00 PM - 2:00 PM"
  },
  {
    id: "event-6",
    name: "Workshop #2 (MLH)",
    date: "April 12, 2025 | 2:00 PM - 3:00 PM"
  },
  {
    id: "event-7",
    name: "Workshop #3",
    date: "April 12, 2025 | 3:30 PM - 4:30 PM"
  },
  {
    id: "event-8",
    name: "Snacks",
    date: "April 12, 2025 | 4:30 PM - 5:00 PM"
  },
  {
    id: "event-10",
    name: "Dinner",
    date: "April 12, 2025 | 7:30 PM - 8:30 PM"
  },
  {
    id: "event-12",
    name: "Late Night Coffee",
    date: "April 12, 2025 | 11:00 PM - 11:45 PM"
  },
  {
    id: "event-14",
    name: "Breakfast",
    date: "April 13, 2025 | 8:00 AM - 9:00 AM"
  },
  {
    id: "event-16",
    name: "Lunch",
    date: "April 13, 2025 | 11:30 AM - 12:15 PM"
  },
];

export default function QRCodePage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [eventsStatus, setEventsStatus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!loading && !user) {
      router.push("/registration");
    }
  }, [user, loading, router]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const q = query(
          collection(db, "registrations"),
          where("userId", "==", currentUser.uid)
        );

        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            setDocumentId(doc.id);
            setEventsStatus(doc.data().events || {});
          } else {
            setDocumentId(null);
            setEventsStatus({});
          }
        });

        return () => unsubscribeSnapshot();
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="container">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* QR Code Section */}
      <div className="qr-container">
        <h1 className="title">Your Event QR Code</h1>
        {documentId ? (
          <>
            <QRCode value={documentId} size={200} className="qr-code" />
            <p className="description">Present this QR code at event check-ins.</p>
          </>
        ) : (
          <p className="description">Complete your registration to generate a QR code.</p>
        )}
      </div>

      {/* Events Attendance Section */}
      <div className="events-container">
        <h2 className="title">Event Attendance Status</h2>
        <div className="events-grid">
          {EVENT_DETAILS.map((event) => (
            <div
              key={event.id}
              className={`event-card ${
                eventsStatus[event.id] ? "registered" : "not-registered"
              }`}
            >
              <div className="event-details">
                <h3 className="event-name">{event.name}</h3>
                <p className="event-info">{event.date}</p>
              </div>
              <div className="event-status">
                {eventsStatus[event.id] ? (
                  <>
                    <CheckCircleIcon className="icon" />
                    <span>Registered</span>
                  </>
                ) : (
                  <>
                    <XCircleIcon className="icon" />
                    <span>Not Registered</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
