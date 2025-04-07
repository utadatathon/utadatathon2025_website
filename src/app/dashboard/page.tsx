"use client";

import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import "./dashboard.css";

import { auth, db } from "@/lib/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

export default function QRCodePage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [documentId, setDocumentId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
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
            const doc: QueryDocumentSnapshot<DocumentData> = snapshot.docs[0];
            setDocumentId(doc.id);
          } else {
            setDocumentId(null);
          }
        });

        return () => unsubscribeSnapshot();
      } else {
        setDocumentId(null);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="container">
        <p>Loading your QR code...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <h2 className="title">Please login to view your QR code</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Your Event QR Code</h1>
      {documentId ? (
        <>
          <div className="qr-container">
            <QRCode value={documentId} size={256} />
          </div>
          <p className="description">
            Scan this QR code at the event desk. It links to your registration ID.
          </p>
        </>
      ) : (
        <p className="description">You&apos;re logged in, but no registration was found.</p>
      )}
    </div>
  );
}
