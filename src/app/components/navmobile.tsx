import Navlinks from "./navlinks";

export default function Navmobile() {
	return (
		<div className="fixed bottom-0 w-full h-24 px-6 py-4 flex items-center justify-center">
			<nav className="sm:hidden flex self-center items-center justify-around w-full p-4 rounded-2xl bg-slate-800/50 shadow-lg backdrop-blur-lg">
				<Navlinks />
			</nav>
		</div>
	);
}
