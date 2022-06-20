import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/chevron-left.svg";
import axiosInstance from "../constants";

const NotePage = () => {
	let navigate = useNavigate();
	let { noteId } = useParams();

	let [note, setNote] = useState(null);

	useEffect(() => {
		const getNote = async () => {
			if (noteId === "new") return;
			try {
				const response = await axiosInstance.get(`notes/${noteId}`);
				setNote(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		getNote();
	}, [noteId]);

	const createNote = async () => {
		try {
			const response = await axiosInstance.post(`notes/`, {
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
			const response = await axiosInstance.patch(`notes/${noteId}`, {
				...note,
				"updated": new Date(),
			});
			// console.log(`Put in Note page: ${response.statusText}`);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (noteId !== "new" && !note.body) {
			await deleteNote();
		} else if (noteId === "new") {
			await updateNote();
		} else if (noteId === "new" && note !== null) {
			await createNote();
		}
		// await new Promise((resolve, reject) => {
		// 	setTimeout(resolve, 1000);
		// });
		// console.log("Navigating");
		navigate("/");
	};

	const deleteNote = async (e) => {
		e.preventDefault();
		try {
			await axiosInstance.delete(`notes/${noteId}`);
			console.log("Delete en Note page");
			navigate("/");
		} catch (error) {
			console.log(error);
		}
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
					{/* <button onClick={updateNote}>Save</button> */}
					<button onClick={deleteNote}>Delete</button>
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
