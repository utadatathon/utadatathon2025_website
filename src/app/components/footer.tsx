export default function Footer() {
	return (
		<footer className="grow-0 flex flex-col flex-wrap items-center justify-center text-center w-full p-4 border-t border-gray-900 text-sm text-slate-50">
			<p className="font-bold mb-2">
				&copy; {new Date().getFullYear()} UTA Datathon
			</p>
			<p className="text-xs flex-wrap">
				Designed & developed by{" "}
				<strong>The UTA Datathon Development Team</strong>
			</p>
			<div className="w-full h-20 sm:hidden"></div>
		</footer>
	);
}
