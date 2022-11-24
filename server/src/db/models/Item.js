import { DataTypes } from "sequelize";
import List from "./List";
import db from "../db";

export default db.define(
	"item",
	{
		title: {
			type: DataTypes.STRING,
		},

		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		listId: {
			type: DataTypes.INTEGER,
			references: {
				model: List,
				key: "id",
			},
		},
	},
	{}
);
