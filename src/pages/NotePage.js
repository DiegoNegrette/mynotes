import { useParams } from "react-router-dom";

import React from "react";

const NotePage = () => {
	let { noteId } = useParams();
	return (
		<div>
			<h1>This is a single note page</h1>
		</div>
	);
};

export default NotePage;
