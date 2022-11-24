import { DataTypes } from "sequelize";
import User from "./User";
import db from "../db";

export default db.define(
	"list",
	{
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
		},
	},
	{
		timestamps: false,
		defaultScope: {
			attributes: {
				exclude: [],
			},
		},
	}
);
