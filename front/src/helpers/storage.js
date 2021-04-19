export function setInSession(name, item) {
	sessionStorage.setItem(name, item);
}

export function getInSession(name, json = false) {
    const item = sessionStorage.getItem(name);
	return json ? JSON.parse(item) : item;
}