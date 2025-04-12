"use client";

import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import "./admin-styles.css";

export default function QRCodePage({ userId }: { userId: string }) {
    const [documentId, setDocumentId] = useState<string | null>(null);

    useEffect(() => {
        if (userId) {
            const q = query(
                collection(db, "registrations"),
                where("userId", "==", userId)
            );

            const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
                if (!snapshot.empty) {
                    const doc = snapshot.docs[0];
                    setDocumentId(doc.id);
                } else {
                    setDocumentId(null);
                }
            });

            return () => unsubscribeSnapshot();
        }
    }, [userId]);

    return (
        <div className="container">
            {/* QR Code Section */}
            <div className="qr-container">
                <h1 className="title">User Event QR Code</h1>
                {documentId ? (
                    <>
                        <QRCode value={documentId} size={200} className="qr-code" />
                    </>
                ) : (
                    <p className="description">Complete your registration to generate a QR code.</p>
                )}
            </div>
        </div>
    );
}
