"use client"
import Link from "next/link";
import Navlinks from "./navlinks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, signOut } from "../../../firebase";
import { User } from "firebase/auth";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="sticky top-0 flex items-center justify-between w-full px-6 py-5 sm:px-10 border-b border-gray-900 shadow-lg backdrop-blur-lg">
      <Link href="/" className="font-bold">
        UTA Datathon
      </Link>
      <div className="hidden sm:flex w-1/2 py-3 border rounded-lg items-center justify-around bg-slate-900">
        <Navlinks />
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300">
            {user.email}
          </span>
          <button
            onClick={handleSignOut}
            className="transition rounded-full shadow-lg px-6 py-2 font-bold bg-red-800 hover:bg-red-600 hover:text-white hover:outline-none hover:scale-105"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <Link
          href="../registration"
          className="transition rounded-full shadow-lg px-6 py-2 font-bold bg-indigo-800 hover:bg-indigo-600 hover:text-white hover:outline-none hover:scale-105"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
}