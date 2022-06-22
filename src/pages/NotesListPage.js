import React, { useEffect, useState } from "react";
import api from "../constants";
import ListItem from "../components/ListItem";
import AddButton from "../components/AddButton";

const NotesListPage = () => {
	let [notes, setNotes] = useState([]);

	useEffect(() => {
		const getNotes = async () => {
			try {
				const response = await api.get("notes/");
				setNotes(response.data);
				// console.log("Get in NoteList page");
			} catch (error) {
				console.log(error);
			}
		};
		getNotes();
	}, []);

	return (
		<div className="notes">
			<div className="notes-header">
				<h2 className="notes-title">&#9782; Notes</h2>
				<p className="notes-count">{notes.length}</p>
			</div>
			<div className="notes-list">
				{notes.map((note, index) => (
					<ListItem key={index} note={note} />
				))}
			</div>
			<AddButton />
		</div>
	);
};

export default NotesListPage;
