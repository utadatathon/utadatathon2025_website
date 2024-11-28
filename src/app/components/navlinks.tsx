"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const navlinks = [
	{ href: "/", name: "Home" },
	{ href: "/dashboard", name: "Dashboard" },
	{ href: "/schedule", name: "Schedule" },
	{ href: "/faqs", name: "FAQs" },
];

export default function Navlinks() {
	const pathname = usePathname();

	return (
		<>
			{navlinks.map((link) => (
				<Link
					key={link.name}
					href={link.href}
					className={clsx("transition hover:scale-110", {
						"border-b-2 font-bold": link.href === pathname,
					})}
				>
					{link.name}
				</Link>
			))}
		</>
	);
}
