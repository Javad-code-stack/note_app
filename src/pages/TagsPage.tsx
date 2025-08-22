import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNoteStore } from "../store/noteStore";

const TagsPage = () => {
	const { tags, createTag, deleteTag } = useNoteStore();
	const [newTag, setNewTag] = useState("");
	const tagNumber = Object.values(tags).length;

	const handleAddTag = (e: React.FormEvent) => {
		e.preventDefault();
		if (newTag) {
			createTag(newTag.trim());
			setNewTag("");
		}
		return;
	};

	const handleDeleteTag = (tagId: string) => {
		console.log(tagId);
		deleteTag(tagId);
	};

	useEffect(() => {}, [tagNumber]);

	return (
		<section className="rtlDir">
			<div className="flex items-center justify-between">
				<h1 className="text-lg md:text-2xl font-bold">برچسب</h1>
			</div>
			<fieldset className="fieldset mt-12 mb-4 flex gap-2 items-center mx-auto max-w-xl">
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
			<div className="max-w-xl min-h-16 p-3 border rounded-lg border-accent/50 flex flex-wrap items-center gap-2 mx-auto">
				{tagNumber > 0 ?
					Object.values(tags).map((tag) => (
						<button
							type="button"
							key={tag.id}
							className="flex items-center justify-between badge badge-outline badge-secondary py-4 px-6 ">
							<span>{tag.name}</span>
							<span onClick={() => handleDeleteTag(tag.id)}>
								<IoClose className="size-5 hover:text-red-700 cursor-pointer" />
							</span>
						</button>
					))
				:	<h2 className="text-center mx-auto text-lg font-bold text-primary">هیچ برچسبی نداریم!</h2>}
			</div>
		</section>
	);
};

export default TagsPage;
