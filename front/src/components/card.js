import { useState } from "react";
import { doRequest } from "../helpers/requests";

function Card({ task, deleteTask }) {
	const [name, setName] = useState(task.name);
	const [description, setDescription] = useState(task.description);
	const [edit, setEdit] = useState(false);

	async function save() {
		let data = {
			taskid: task.id,
			name: name,
			description: description,
		};
		let response = await doRequest("editTask", data, "POST");
		if (!response.Error) setEdit((val) => !val);
	}

	return (
		<div className="card">
			<div>
				<button
					className="round delete"
					onClick={() => deleteTask(task.id)}
				>
					delete
				</button>
				<button
					className="round edit"
					onClick={() => setEdit((val) => !val)}
				>
					edit
				</button>
			</div>
			<div className="fields">
				<h2>Nombre</h2>
				{!edit ? (
					name
				) : (
					<input
						type="text"
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
				)}

				<h2>Descripción</h2>
				{!edit ? (
					description
				) : (
					<input
						type="text"
						onChange={(e) => setDescription(e.target.value)}
						value={description}
					/>
				)}
			</div>
			{edit ? (
				<button className="save" onClick={() => save()}>
					Save
				</button>
			) : null}
		</div>
	);
}

export default Card;
