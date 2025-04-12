"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { auth, signOut } from "../../../firebase";
import { User } from "firebase/auth";
import clsx from "clsx";
import "./Header.css";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [openNavigation, setOpenNavigation] = useState(false);

  // Admin emails list
  const adminEmails = useMemo(
    () => [
      "thesamarthjagtap@gmail.com",
      "rubab.shahzad@uta.edu",
      "lyndsey.dewitt@uta.edu",
      "sxr0682@mavs.uta.edu",
      "pratham153patil@gmail.com",
      "aastha6100@gmail.com",
      "devratasauthor@gmail.com",
    ],
    []
  );

  // Base navigation links
  const navlinks = [
    { href: "/", name: "Home" },
    { href: "/dashboard", name: "Dashboard" },
    { href: "/schedule", name: "Schedule" },
    { href: "/faqs", name: "FAQs" },
    { href: "/prizes", name: "Prizes" },
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

  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <>
      <a
        id="mlh-trust-badge"
        href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2025-season&utm_content=blue"
        target="_blank"
        rel="noopener noreferrer"
        className="mlh-badge"
      >
        <img
          src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-blue.svg"
          alt="Major League Hacking 2025 Hackathon Season"
        />
      </a>

      <header className={`header ${openNavigation ? "open" : ""}`}>
        <div className="logo">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="UTA Datathon Logo"
              width={200}
              height={65}
              priority
              className="logo-img"
              style={{
                filter:
                  "brightness(1.2) drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
                transition: "all 0.3s ease",
              }}
            />
          </Link>
        </div>

        <nav className="nav">
          <ul
            className={`nav-links ${
              openNavigation ? "nav-open" : "nav-closed"
            }`}
          >
            {dynamicLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={clsx("transition", {
                    "font-bold": link.href === pathname,
                  })}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="auth-item">
              {user ? (
                <>
                  <span className="user-email">{user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="register-btn"
                    style={{ backgroundColor: "#b91c1c" }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link href="../registration">
                  <button className="register-btn">Sign In</button>
                </Link>
              )}
            </li>
          </ul>
        </nav>

        <button onClick={toggleNavigation} className="menu-btn">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 18H21"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>
    </>
  );
};

export default Header;
