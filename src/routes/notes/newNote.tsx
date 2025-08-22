import { createFileRoute } from "@tanstack/react-router";
import NoteEditPage from "../../pages/NoteEditPage";

export const Route = createFileRoute("/notes/newNote")({
	component: NoteEditPage,
	context: () => ({
		title: "Create/Edit a note",
	}),
});
