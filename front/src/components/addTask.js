import { useState } from "react";
import { doRequest } from "../helpers/requests";

function AddTask({ tasks, setTasks }) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	async function addTask() {
		let data = {
			name: name,
			description: description,
		};

		let response = await doRequest("addTask", data, "POST");
		if (!response.Error) {
			setName("");
			setDescription("");
			data.id = tasks[tasks.length - 1].id + 1;
			let newTasks = tasks.concat(data);
			setTasks(() => newTasks);
		}
	}

	return (
		<div className="card">
			<div className="fields">
				<h2>Nombre</h2>
				<input
					type="text"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>

				<h2>Descripción</h2>
				<input
					type="text"
					onChange={(e) => setDescription(e.target.value)}
					value={description}
				/>
			</div>
			<button className="save" onClick={() => addTask()}>
				Save
			</button>
		</div>
	);
}

export default AddTask;
