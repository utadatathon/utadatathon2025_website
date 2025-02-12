import Link from "next/link";
import Navlinks from "./navlinks";

export default function Navbar() {
	return (
		<nav className="sticky top-0 flex items-center justify-between w-full px-6 py-5 sm:px-10 border-b border-gray-900 shadow-lg backdrop-blur-lg">
			<Link href="/" className="font-bold">
				UTA Datathon
			</Link>
			<div className="hidden sm:flex w-1/2 py-3 border rounded-lg items-center justify-around bg-slate-900">
				<Navlinks />
			</div>
			<Link
				href="#"
				className="transition rounded-full shadow-lg px-6 py-2 font-bold bg-indigo-800 hover:bg-indigo-600 hover:text-white hover:outline-none hover:scale-105"
			>
				Sign In
			</Link>
		</nav>
	);
}
