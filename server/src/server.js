import "./env.js";

import db from "./db/db.js";
import app from "./api/app.js";

async function sync(force) {
	force = Boolean(force);

	await db.sync({
		force: force,
	});

	if (force) {
		// seed data here
	}
}

db.authenticate()
	.then(async () => {
		console.log("Connected to database.");

		// Sync database
		// await sync(true) // wipe the database
		await sync();

		// Listen port
		app.listen(process.env.PORT, () => {
			console.log(`Successfully listening on port ${process.env.PORT}`);
		});
	})
	.catch((err) => {
		console.error("Unable to connect to database:", err);
	});
