module.exports = {
	secret: prompt("Enter jwt secret", "Supersecret"),
	db: {
		'host' : prompt("Enter db host", "127.0.0.1"),
		'db' : prompt("Enter db name", "myDb"),
		'user' : prompt("Enter db user", "myUser"),
		'password' : prompt("Enter db password", "pass")
	}
}
