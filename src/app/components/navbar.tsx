"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, signOut } from "../../../firebase";
import { User } from "firebase/auth";
import clsx from "clsx";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Admin emails list
  const adminEmails = ["thesamarthjagtap@gmail.com","rubab.shahzad@uta.edu","lyndsey.dewitt@uta.edu","sxr0682@mavs.uta.edu"]; // Add other admin emails here
  
  // Base navigation links
  const navlinks = [
    { href: "/", name: "Home" },
    { href: "/dashboard", name: "Dashboard" },
    { href: "/schedule", name: "Schedule" },
    { href: "/faqs", name: "FAQs" }
  ];

  useEffect(() => {
    // Set up auth state listener
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser && adminEmails.includes(currentUser.email || "")) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, [adminEmails]);

  // Create dynamic links based on admin status
  const dynamicLinks = isAdmin 
    ? [...navlinks, { href: "/admin", name: "Admin" }]
    : navlinks;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <nav className="sticky top-0 w-full border-b border-gray-900 shadow-lg backdrop-blur-lg bg-gray-900 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex-shrink-0 font-bold text-white text-xl">
            UTA Datathon
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden sm:block">
            <div className="flex space-x-8">
              {dynamicLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition duration-150 ease-in-out",
                    {
                      "text-white border-b-2 border-white": pathname === link.href,
                    }
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Auth Button */}
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300 hidden md:block">
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="transition rounded-full shadow-lg px-6 py-2 font-bold bg-red-800 hover:bg-red-600 hover:text-white hover:outline-none hover:scale-105 text-white"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="../registration"
                className="transition rounded-full shadow-lg px-6 py-2 font-bold bg-indigo-800 hover:bg-indigo-600 text-white hover:outline-none hover:scale-105"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu - Shown below sm breakpoint */}
      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-700">
          {dynamicLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium",
                {
                  "text-white bg-gray-800": pathname === link.href,
                }
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}