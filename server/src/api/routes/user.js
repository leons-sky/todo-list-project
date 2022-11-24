import express from "express";
import { User, List } from "../../db/models";
import auth from "../middleware/auth.js";
import { COOKIE } from "../constants.js";

const usersRouter = express.Router();

// getting cookies
// app.get("/", async (req, res) => {
// 	// console.log(req.cookies);
// 	res.sendStatus(200);
// });

// GET USER

// create/register user *** token
usersRouter.post("/register", async (req, res) => {
	const data = {
		username: req.body.username,
		password: req.body.password,
	};

	// check user doesn't already exist
	const user = await User.findOne({
		where: data,
	});
	if (user) {
		return res.status(400).send("Already created");
	}

	// create a new user
	const createdUser = await User.create(data);

	// sign a new json web token with the user's data
	// json web tokens: https://jwt.io/
	const token = jsonwebtoken.sign(
		{
			userId: createdUser.getDataValue("id"),
			username: req.body.username,
			password: req.body.password,
		},
		process.env.TOKEN_SECRET
	);

	// add the token to the user's data
	await createdUser.update({
		token: token,
	});

	// store the token as a cookie for the user
	res.cookie(COOKIE, token, {
		httpOnly: true,
	}).send(await User.findByPk(createdUser.getDataValue("id"))); // send the user their data
});

//login ******** if user logs in ???????
usersRouter.post("/login", async (req, res) => {
	const data = {
		username: req.body.username,
		password: req.body.password,
	};

	const user = await User.findOne({
		where: data,
	});
	if (!user) {
		return res.sendStatus(403);
	}

	res.cookie(COOKIE, token, {
		httpOnly: true,
	}).send(user);
});

export default usersRouter;

//validation against endpoints / error messages
