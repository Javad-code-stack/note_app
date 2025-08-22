import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NoteStore } from "../types";

export const useNoteStore = create<NoteStore>()(
	persist(
		(set) => ({
			notes: {},
			tags: {},
			createNote: function (title, content, tagIds) {
				const id = crypto.randomUUID();
				const timeStamp = new Date();
				set((state) => ({
					notes: {
						...state.notes,
						[id]: {
							id,
							title,
							content,
							tagIds,
							createdAt: timeStamp,
							updatedAt: timeStamp,
						},
					},
				}));
				return id;
			},
			updateNote: function (noteId, updates) {
				set((state) => ({
					notes: {
						...state.notes,
						[noteId]: {
							...state.notes[noteId],
							...updates,
							updatedAt: new Date(),
						},
					},
				}));
			},
			createTag: function (name) {
				const id = crypto.randomUUID();

				set((state) => ({
					...state,
					tags: { ...state.tags, [id]: { id, name } },
				}));
				return id;
			},
			deleteTag: function (tagId) {
				set((state) => {
					const newTags = { ...state.tags };
					delete newTags[tagId];

					const updatedNotes = { ...state.notes };
					for (const noteId in updatedNotes) {
						updatedNotes[noteId] = {
							...updatedNotes[noteId],
							tagIds: updatedNotes[noteId].tagIds.filter((id) => id !== tagId),
						};
					}
					return {
						tags: newTags,
						notes: updatedNotes,
					};
				});
			},
		}),
		{
			name: "Notes_vault",
		}
	)
);
