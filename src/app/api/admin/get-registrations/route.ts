// src/app/api/admin/get-registrations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin SDK if it hasn't been initialized
if (!getApps().length) {
  // You'll need to create a service account key from Firebase Console
  // and store the values in your .env.local file
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

// List of admin emails
const adminEmails = [
  'datathon.uta@gmail.com',
  'thesamarthjagtap@gmail.com',
  'rubab.shahzad@uta.edu',
  'lyndsey.dewitt@uta.edu',
  'sxr0682@mavs.uta.edu',
  'pratham153patil@gmail.com',
  "devratasauthor@gmail.com"
  // Add your email here
  // Add other admin emails here
];

interface FirebaseData {
  [key: string]: unknown;
  timestamp?: {
    toDate: () => Date;
  };
}

interface Registration {
  id: string;
  timestamp?: string;
  [key: string]: unknown;
}

export async function GET(request: NextRequest) {
  try {
    // Extract the authorization token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized: Missing or invalid token' },
        { status: 401 }
      );
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify the token and get user info
    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(idToken);
    const { email } = decodedToken; // Removed unused 'uid' variable
    
    // Check if the user is an admin
    if (!email || !adminEmails.includes(email)) {
      return NextResponse.json(
        { error: 'Forbidden: Insufficient permissions' },
        { status: 403 }
      );
    }
    
    // Fetch registrations from Firestore
    const db = getFirestore();
    const registrationsSnapshot = await db.collection('registrations').get();
    
    // Convert to plain objects that can be serialized to JSON
    const registrations: Registration[] = registrationsSnapshot.docs.map(doc => {
      const data = doc.data() as FirebaseData;
      
      // Convert Firestore Timestamps to ISO strings for proper serialization
      const serializedData: Registration = { 
        ...data as unknown as Record<string, unknown>, 
        id: doc.id 
      };
      
      // Handle Firestore Timestamp objects
      if (data.timestamp && typeof data.timestamp.toDate === 'function') {
        serializedData.timestamp = data.timestamp.toDate().toISOString();
      }
      
      return serializedData;
    });
    
    return NextResponse.json(registrations);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}