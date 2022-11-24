import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { User } from "../db/models";
import jsonwebtoken from "jsonwebtoken";

const app = express();

app.use(
	cors({
		origin: true,
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());

app.get("/", async (req, res) => {
	console.log(req.cookies);
	res.sendStatus(200);
});

app.post("/", async (req, res) => {
	const data = {
		username: req.body.username,
		password: req.body.password,
	};

	const user = await User.findOne({
		where: data,
	});
	if (user) {
		return res.status(400).send("Already created");
	}

	const createdUser = await User.create(data);

	const token = jsonwebtoken.sign(
		{
			userId: createdUser.getDataValue("id"),
			username: req.body.username,
			password: req.body.password,
		},
		process.env.TOKEN_SECRET
	);

	await createdUser.update({
		token: token,
	});

	res.cookie("test_accesstoken", token, {
		httpOnly: true,
	}).send(await User.findByPk(createdUser.getDataValue("id")));
});

export default app;
