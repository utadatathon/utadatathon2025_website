"use client";

import { useState, useEffect } from "react";

const targetDate = new Date("2025-04-11T12:00:00");

export default function Home() {
	const calculateTimeLeft = () => {
		const now = new Date();
		const difference = targetDate.getTime() - now.getTime();

		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				mins: Math.floor((difference / 1000 / 60) % 60),
				secs: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		if (targetDate.getTime() < new Date().getTime()) {
			return;
		}

		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const timerComponents = [];

	Object.keys(timeLeft).forEach((key) => {
		timerComponents.push(
			<div
				key={key}
				className="flex flex-col border rounded-lg w-16 p-1 sm:w-32 sm:p-1"
			>
				<span>{timeLeft[key]}</span>
				<p>{key}</p>
			</div>
		);
	});

	return (
		<div className="flex flex-col grow -translate-y-8 items-center justify-center text-center p-4  font-bold">
			<p className="text-4xl p-4 leading-tight sm:text-6xl sm:p-8 sm:leading-snug">
				UTA Datathon <br />
				2025
			</p>
			<div>
				<p className="text-lg">Countdown to the Datathon</p>
				<div className="flex flex-wrap items-center justify-center gap-2 p-2 sm:gap-6">
					{timerComponents}
				</div>
			</div>
		</div>
	);
}
