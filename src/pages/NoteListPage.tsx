import { Link } from "@tanstack/react-router";
import { TiPlus } from "react-icons/ti";

const NoteListPage = () => {
	return (
		<section>
			<div className="flex items-center justify-between">
				<Link to="/notes/newNote" className="btn  btn-primary">
					افزودن نوشته <TiPlus className="size-4" />
				</Link>
				<h1 className="text-lg md:text-2xl font-bold">نوشته ها</h1>
			</div>
		</section>
	);
};

export default NoteListPage;
