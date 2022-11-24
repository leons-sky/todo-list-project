import { DataTypes } from "sequelize";
import db from "../db";

export default db.define(
	"user",
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		token: {
			type: DataTypes.STRING,
			unique: true,
		},
	},
	{
		defaultScope: {
			attributes: {
				exclude: ["token", "password"],
			},
		},
	}
);
