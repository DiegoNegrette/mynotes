import { useParams } from "react-router-dom";
import React, { useState } from "react";
import notes from "../assets/data";
import { Link } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/chevron-left.svg";

const NotePage = () => {
	let { noteId } = useParams();
	let note = notes.find((note) => note.id === Number(noteId));
	return (
		<div className="note">
			<div className="note-header">
				<h3>
					<Link to="/">
						<ArrowLeft />
					</Link>
				</h3>
			</div>
			<textarea value={note?.body}></textarea>
		</div>
	);
};

export default NotePage;
