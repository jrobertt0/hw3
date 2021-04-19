import { useEffect, useState } from "react";
import { getTasks, login } from "./helpers/requests";
import Card from "./components/card";
import AddTask from "./components/addTask";
import "./App.css";
import { doRequest } from "./helpers/requests";

function App() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		async function doInit() {
			await login();
			await getTasks(setTasks);
		}

		doInit();
	}, []);

	async function deleteTask(taskId) {
		setTasks(tasks.filter((task) => task.id !== taskId));
		await doRequest("deleteTask", { taskid: taskId }, "POST");
	}

	return (
		<div className="App">
			<AddTask setTasks={setTasks} tasks={tasks} />
			{tasks
				? tasks.map((task, index) => {
						return (
							<Card
								key={index}
								task={task}
								deleteTask={deleteTask}
							/>
						);
				  })
				: "aaaa"}
		</div>
	);
}

export default App;
