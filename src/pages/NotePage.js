import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/chevron-left.svg";
import api from "../constants";

const NotePage = () => {
	let navigate = useNavigate();
	let { noteId } = useParams();

	let [note, setNote] = useState(null);

	useEffect(() => {
		const getNote = async () => {
			if (noteId === "new") return;
			try {
				const response = await api.get(`notes/${noteId}`);
				setNote(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		getNote();
	}, [noteId]);

	const createNote = async () => {
		try {
			await api.post(`notes/create/`, {
				...note,
				"created": new Date(),
				"updated": new Date(),
			});
		} catch (error) {
			console.log(error);
		}
	};

	const updateNote = async () => {
		try {
			const response = await api.patch(`notes/${noteId}/update/`, {
				...note,
				"updated": new Date(),
			});
			console.log(`Put in Note page: ${response.statusText}`);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (noteId !== "new" && note.body === "") {
			await deleteNote();
		} else if (noteId !== "new") {
			await updateNote();
		} else if (noteId === "new" && note.body !== null) {
			await createNote();
		}
		// await new Promise((resolve, reject) => {
		// 	setTimeout(resolve, 1000);
		// });
		// console.log("Navigating");
		navigate("/");
	};

	const deleteNote = async () => {
		try {
			await api.delete(`notes/${noteId}/delete/`);
			console.log("Delete en Note page");
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteNote = async (e) => {
		e.preventDefault();
		await deleteNote();
	};

	return (
		<div className="note">
			<div className="note-header">
				<h3>
					<Link to="/">
						<ArrowLeft onClick={handleSubmit} />
					</Link>
				</h3>
				<div style={{ display: "flex", gap: "1rem" }}>
					{noteId !== "new" ? (
						<button onClick={handleDeleteNote}>Delete</button>
					) : (
						<button onClick={handleSubmit}>Done</button>
					)}
				</div>
			</div>
			<textarea
				onChange={(e) => setNote({ ...note, "body": e.target.value })}
				value={note?.body}
			></textarea>
		</div>
	);
};

export default NotePage;
