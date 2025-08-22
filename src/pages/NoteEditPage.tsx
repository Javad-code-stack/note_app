import { useState } from "react";
import { useNoteStore } from "../store/noteStore";
import { useParams, useRouter } from "@tanstack/react-router";

const NoteEditPage = () => {
	const router = useRouter();
	const { notes, tags, createNote, updateNote, createTag } = useNoteStore();
	const { noteId } = useParams({ strict: false });
	const note = noteId ? notes[noteId] : null;

	const [title, setTitle] = useState(note?.title || "");
	const [content, setContent] = useState(note?.content || "");
	const [newTag, setNewTag] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>(note?.tagIds || []);

	const toggleTag = (tagId: string) => {
		setSelectedTags((prev) =>
			prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
		);
	};
	const handleAddTag = (e: React.FormEvent) => {
		e.preventDefault();
		if (newTag) {
			const tagId = createTag(newTag.trim());
			setNewTag("");
			setSelectedTags((prev) => [...prev, tagId]);
		}
		return;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (title.trim() && content.trim()) {
			if (note) {
				updateNote(note.id, { title, content, tagIds: selectedTags });
				router.navigate({ to: `/notes/${note.id}` });
			} else {
				const newNoteId = createNote(title, content, selectedTags);
				router.navigate({ to: `/notes/${newNoteId}` });
			}
		}
	};

	return (
		<section>
			{/* Top Section */}
			<div className="flex items-center justify-between rtlDir">
				<h1 className="text-lg md:text-2xl font-bold ">{note ? "اصلاح یادداشت" : "ساخت یادداشت"}</h1>
			</div>
			<div className="rtlDir max-w-xl mx-auto">
				<form
					onSubmit={handleSubmit}
					className="my-14 w-full mx-auto flex flex-col justify-between gap-4">
					<fieldset className="fieldset">
						<legend className="fieldset-legend">عنوان یادداشت شما چیست؟</legend>
						<input
							type="text"
							id="title"
							className="input w-full"
							maxLength={16}
							placeholder="عنوان نوشته"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</fieldset>
					<fieldset className="fieldset">
						<legend className="fieldset-legend">متن یادداشت</legend>
						<textarea
							id="content"
							className="textarea h-24 w-full"
							placeholder="یادداشت"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							required
						/>
					</fieldset>
					<h2>برچسب ها:</h2>
					<div className="flex items-center gap-2 flex-wrap">
						{Object.values(tags).map((tag) => (
							<button
								type="button"
								key={tag.id}
								onClick={() => toggleTag(tag.id)}
								className={`badge ${selectedTags.includes(tag.id) ? "badge-success" : "badge-accent"} hover:badge-outline transition-all px-4 cursor-pointer py-2`}>
								{tag.name}
							</button>
						))}
					</div>
					<fieldset className="fieldset mb-4 flex gap-2 items-center">
						<legend className="fieldset-legend">برچسب جدید</legend>
						<input
							type="text"
							id="tag"
							className="input w-full"
							maxLength={10}
							placeholder="نام برچسب"
							value={newTag}
							onChange={(e) => setNewTag(e.target.value)}
						/>
						<button type="button" onClick={handleAddTag} className="btn btn-outline btn-success">
							ثبت برچسب
						</button>
					</fieldset>
					<button type="submit" className="btn btn-outline btn-accent">
						{note ? "اصلاح یاداشت" : "ثبت یادداشت"}
					</button>
				</form>
			</div>
		</section>
	);
};

export default NoteEditPage;
