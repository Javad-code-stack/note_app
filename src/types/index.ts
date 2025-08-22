interface Note {
	id: string;
	title: string;
	content: string;
	tagIds: string[];
	createdAt: Date;
	updatedAt: Date;
}

interface Tag {
	id: string;
	name: string;
}

export interface NoteStore {
	notes: Record<string, Note>;
	tags: Record<string, Tag>;
	createNote: (title: string, content: string, tagIds: string[]) => string;
	updateNote: (noteId: string, updates: Partial<Omit<Note, "id">>) => void;
	createTag: (name: string) => string;
	deleteTag: (tagId: string) => void;
}
