"use client";
import Link from 'next/link';
import './Dashboard.css';

export default function Dashboard() {
	return (
		<>
			<div className="coming-soon-container">
				<h1 className="coming-soon-title">COMING SOON</h1>
				<Link href="/registration" className="retro-button">
					Apply Now
				</Link>
			</div>
		</>
	);
}
