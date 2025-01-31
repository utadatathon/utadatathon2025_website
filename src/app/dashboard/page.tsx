// "use client";
// import { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../firebase/configuration"; 
// import AboutDatathonCarousel from "../../components/AboutDatathonCarousel";

// const DashboardPage = () => {
//   const [status, setStatus] = useState("under review");

//   useEffect(() => {
//     const fetchStatus = async () => {
//       const user = auth.currentUser;
//       if (user) {
//         const userDoc = doc(db, "users", user.uid); // Assuming "users" is the collection name
//         const docSnap = await getDoc(userDoc);

//         if (docSnap.exists()) {
//           setStatus(docSnap.data().status); // Assuming the status is stored in a "status" field
//         }
//       }
//     };

//     fetchStatus();
//   }, []);

//   return (
//     <div className="grow">
//       <p>Dashboard Page</p>
//       <div className="status-box">
//         <h3>Application Status</h3>
//         <p>{status}</p>
//       </div>
//       <AboutDatathonCarousel />
//     </div>
//   );
// };

// export default DashboardPage;