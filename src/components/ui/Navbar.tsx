import { Link } from "@tanstack/react-router";
import { useThemeStore } from "../../store/useThemeStore";
import { GoSun } from "react-icons/go";
import { PiMoonLight, PiVault } from "react-icons/pi";
import { AiOutlineTags } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";

const Navbar = () => {
	const { theme, setTheme } = useThemeStore();
	const handleThemeToggle = () => {
		setTheme(theme === "sunset" ? "nord" : "sunset");
	};
	return (
		<header className="flex flex-col sm:flex-row justify-between items-center gap-6 sticky top-0 z-50max-w-[1200px] px-8 py-6 mx-auto bg-base-300 font-bold">
			{/* AVATAR */}
			<div className="flex gap-6 items-center">
				<div className="avatar">
					<div className="ring-primary ring-offset-base-100 w-7 rounded-full ring-2 ring-offset-2">
						<img src="/Default.png" loading="lazy" />
					</div>
				</div>
				{/* Theme Switch */}
				<label className="swap swap-rotate">
					{/* this hidden checkbox controls the state */}
					<input type="checkbox" onChange={handleThemeToggle} />
					{/* sun icon "*/}
					<GoSun className="swap-on size-7 fill-accent" />
					{/* moon icon */}
					<PiMoonLight className="swap-off size-7 fill-accent" />
				</label>
			</div>
			{/* NAVIGATIONS */}
			<div className=" flex gap-2 justify-between items-center">
				<Link
					to="/tags"
					className="btn btn-outline btn-accent"
					activeProps={() => ({ className: " bg-primary text-white" })}
					inactiveProps={() => ({ className: "btn-accent" })}>
					برچسب
					<AiOutlineTags className="size-4" />
				</Link>
				<Link
					to="/notes"
					className="btn btn-outline btn-accent"
					activeProps={() => ({ className: "bg-primary text-white" })}
					inactiveProps={() => ({ className: "btn-accent" })}>
					نوشته ها
					<CgNotes className="size-4" />
				</Link>
				<Link
					to="/"
					className="btn btn-outline btn-accent"
					activeProps={() => ({ className: "bg-primary text-white" })}
					inactiveProps={() => ({ className: "btn-accent" })}>
					صندوق
					<PiVault className="size-5" />
				</Link>
			</div>
		</header>
	);
};

export default Navbar;
