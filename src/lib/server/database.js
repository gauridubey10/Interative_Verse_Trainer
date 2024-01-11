// @ts-nocheck
const db = new Map();
db.set("abc@gmail.com", [{
    id: crypto.randomUUID(),
    pass: "1234",
    date: Date.now()
}]);

db.set("a@a.com", [{
    id: crypto.randomUUID(),
    pass: "1234",
    date: Date.now()
}]);

export function getUser(userEmail) {
	if (!db.get(userid)) {
		return "errr";
	}


	return db.get(userid);
}

export function createUser(userEmail, userPassword) {
	const user = db.set(userEmail, [{
        id: crypto.randomUUID(),
        pass: userPassword,
        date: Date.now()
    }]);

}
