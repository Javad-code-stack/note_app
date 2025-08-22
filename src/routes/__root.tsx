import { createRootRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import Navbar from "../components/ui/Navbar";
import { useThemeStore } from "../store/useThemeStore";
// Pages

export const Route = createRootRoute({ component: Layout });

function Layout() {
	const { theme } = useThemeStore();
	const { matches } = useRouterState();
	const activeMatch = matches[matches.length - 1];
	const { title = "Valut App" } = activeMatch.context;

	useEffect(() => {
		document.title = title;
	}, [title]);

	return (
		<div data-theme={theme}>
			<main className="relative max-w-[1200px] bg-base-200 mx-auto min-h-screen">
				<Navbar />
				<div className="p-6 h-full w-full overflow-hidden text-justify">
					<Outlet />
				</div>
			</main>
		</div>
	);
}
