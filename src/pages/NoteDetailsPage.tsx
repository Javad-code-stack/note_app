import { Link, useParams } from "@tanstack/react-router";
import { useNoteStore } from "../store/noteStore";
import { FiEdit } from "react-icons/fi";

const NoteDetailsPage = () => {
	const { notes, tags } = useNoteStore();
	const allNotes = Object.values(notes);
	const allTags = Object.values(tags);
	const { noteId } = useParams({ strict: false });

	const currentNote = allNotes.filter((note) => note.id === noteId)[0];
	const currentTags = allTags.filter((tag) => currentNote?.tagIds.includes(tag.id));

	return (
		<>
			<Link
				to={`/notes/${noteId}/edit`}
				className="flex items-center gap-1 text-sm btn btn-outline btn-error w-fit">
				اصلاح نوشته
				<FiEdit />
			</Link>
			<div className="max-w-4xl items-center mx-auto flex flex-col rtlDir my-12 px-2">
				<h1 className="text-3xl md:text-4xl font-bold mb-2">{currentNote.title}</h1>
				{currentNote.createdAt !== currentNote.updatedAt ?
					<div className="my-4 font-black text-sm">
						{new Date(currentNote.updatedAt).toLocaleDateString()}
					</div>
				:	<div className="my-4 font-black text-sm">
						{new Date(currentNote.createdAt).toLocaleDateString()}
					</div>
				}

				<div className="text-justify text-lg leading-8">{currentNote.content}</div>
				<div className="mt-8 max-w-lg flex items-center ml-auto gap-2">
					{currentTags.map((tag) => (
						<div key={tag.id} className="badge badge-accent">
							{tag.name}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default NoteDetailsPage;
