import { getInSession, setInSession } from "./storage";

const direction = "http://localhost:5000/api/user";

export async function login() {
	let uri = direction + "/auth";
	return fetch(uri, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((data) => {
		data.json().then((val) => {
			setInSession("userid", val.id);
			console.log(val.id);
		});
	});
}

export async function getTasks(setValue = (val) => {}) {
	let uri = direction + "/getTasks/" + getInSession("userid");
	return fetch(uri, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((data) => {
		data.json().then((val) => {
			setValue(val.tasks);
		});
	});
}

export async function getTask(setValue = (val) => {}) {
	let uri = direction + "/getTask/" + getInSession("userid");
	return fetch(uri, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((data) => {
		data.json();
		setValue(data.task);
	});
}

export async function doRequest(type, credentials, method = "POST") {
	let uri = direction + "/" + type + "/" + getInSession("userid");
	let response = await fetch(uri, {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(credentials),
	});
	response = await response.json();
	return response;
}
