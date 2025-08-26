import { Link } from "@tanstack/react-router";
import { AiOutlineTags } from "react-icons/ai";
import { TiPlus } from "react-icons/ti";
import { useNoteStore } from "../store/noteStore";

const NoteListPage = () => {
	const { notes, tags } = useNoteStore();

	const allNotes = Object.values(notes).sort(
		(a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
	);
	return (
		<section>
			<div className="flex items-center justify-between">
				<Link to="/notes/newNote" className="btn  btn-primary">
					افزودن نوشته <TiPlus className="size-4" />
				</Link>
				<h1 className="text-lg md:text-2xl font-bold">نوشته ها</h1>
			</div>
			{allNotes.length > 0 ?
				<div className="my-14 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 rtlDir justify-items-center">
					{allNotes.map((note) => (
						<div
							key={note.id}
							className="border-1 border-accent/40 bg-base-100 rounded-lg px-4 py-2 text-justify rtlDir w-full shadow-accent/20 shadow-xl overflow-hidden">
							<h2 className="text-xl font-semibold text-accent mb-4">{note.title}</h2>
							<p className="text-base-content text-sm truncate">{note.content}</p>
							<div className="text-secondary flex items-center justify-between w-fit my-2">
								<div className="flex items-center justify-evenly gap-2 text-sm">
									{note.tagIds.map((tagId) => (
										<span
											key={tagId}
											className="bg-info text-info-content p-1 rounded flex items-center justify-center gap-1">
											<AiOutlineTags className="size-4" />
											{tags[tagId].name}
										</span>
									))}
								</div>
							</div>
							<Link to={`/notes/${note.id}`} className="btn  btn-primary">
								مشاهده
							</Link>
						</div>
					))}
				</div>
			:	<div className="w-full h-[50vh] my-auto flex items-center justify-center">
					<p className="text-xl md:text-3xl text-secondary font-bold">
						هیچ نوشته و یادداشتی ندارید
					</p>
				</div>
			}
		</section>
	);
};

export default NoteListPage;
