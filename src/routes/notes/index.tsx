import { createFileRoute } from "@tanstack/react-router";
import NoteListPage from "../../pages/NoteListPage";

export const Route = createFileRoute("/notes/")({
	component: NoteListPage,
	context: () => ({
		title: "Notes List",
	}),
});
