import { Sequelize } from "sequelize";
import path from "path";

import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default new Sequelize({
	dialect: "sqlite",
	storage: path.join(__dirname, "todo.sqlite"),
	logging: false,
});
