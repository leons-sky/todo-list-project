import { DataTypes } from "sequelize";
import List from "./List.js";
import db from "../db.js";

export default db.define("item", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
	},
	completed: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	listId: {
		type: DataTypes.INTEGER,
		references: {
			model: List,
			key: "id",
		},
	},
});
