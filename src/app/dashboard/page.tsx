"use client";
import Link from 'next/link';

export default function Dashboard() {
	return (
		<>
			<style jsx global>{`
				@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
				
				.coming-soon-container {
					min-height: 100vh;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding: 2rem;
				}

				.coming-soon-title {
					font-family: 'Press Start 2P', monospace;
					text-align: center;
					font-size: 4rem;
					background: linear-gradient(180deg, 
						#fff4b8 0%,
						#ffd773 20%, 
						#ff9f38 40%,
						#ff7a1f 60%,
						#ff4f1f 80%);
					-webkit-background-clip: text;
					background-clip: text;
					color: transparent;
					filter: drop-shadow(0px 2px 0px #000)
						 drop-shadow(0px -2px 0px #000)
						 drop-shadow(2px 0px 0px #000)
						 drop-shadow(-2px 0px 0px #000)
						 drop-shadow(4px 4px 0px #661a00);
					transform: perspective(500px) rotateX(10deg);
					letter-spacing: 3px;
					margin-bottom: 3rem;
				}

				.retro-button {
					font-family: 'Press Start 2P', monospace;
					background: #000;
					color: #a3e4ff;
					border: 2px solid #00f7ff;
					padding: 1rem 2rem;
					font-size: 1.2rem;
					cursor: pointer;
					transition: all 0.3s ease;
					text-transform: uppercase;
					box-shadow: 0 0 5px rgba(0, 247, 255, 0.5);
					text-decoration: none;
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;
				}

				.retro-button:hover {
					background: #00f7ff;
					color: #000;
					transform: translateY(-2px);
					box-shadow: 0 0 10px rgba(0, 247, 255, 0.7);
				}

				@media (max-width: 768px) {
					.coming-soon-title {
						font-size: 2.5rem;
						letter-spacing: 2px;
						padding: 10px 0;
					}

					.retro-button {
						padding: 0.8rem 1.5rem;
						font-size: 1rem;
						width: 100%;
						max-width: 300px;
					}
				}

				@media (max-width: 350px) {
					.coming-soon-title {
						font-size: 2rem;
					}

					.retro-button {
						padding: 0.8rem 1.5rem;
						font-size: 0.9rem;
					}
				}
			`}</style>

			<div className="coming-soon-container">
				<h1 className="coming-soon-title">COMING SOON</h1>
				<Link href="/registration" className="retro-button">
					Apply Now
				</Link>
			</div>
		</>
	);
}
