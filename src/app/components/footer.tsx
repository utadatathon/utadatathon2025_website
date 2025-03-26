export default function Footer() {
	return (
		<footer className="grow-0 w-full p-4 border-t border-gray-900 text-sm text-slate-50">
			<div className="container mx-auto flex flex-col items-center justify-center text-center">
				<p className="font-bold mb-2">
					&copy; {new Date().getFullYear()} UTA Datathon
				</p>
				<p className="text-xs mb-2">
					Designed & developed by{" "}
					<strong>The UTA Datathon Development Team</strong>
				</p>
				<a 
					href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" 
					target="_blank" 
					rel="noopener noreferrer"
					className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
				>
					MLH Code of Conduct
				</a>
			</div>
			<div className="w-full h-20 sm:hidden"></div>
		</footer>
	);
}
