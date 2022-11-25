import express from "express";
import validator from "express-validator";
import { Item, User, List } from "../../db/models";
import auth from "../middleware/auth.js";
import errorHandler from "../middleware/errorHandler.js";
import getList from "../middleware/getList.js";
import getItem from "../middleware/getItem.js";

// create a router
const listsRouter = express.Router();

//  getting lists of user *****************

listsRouter.get("/", auth, async (req, res) => {
	const lists = await List.findAll({
		where: {
			"$user.id$": req.user.getDataValue("id"),
		},
		include: [User, Item],
	});
	res.send(lists);
});

// POST lists/:listID
listsRouter.post(
	"/:listId",
	[
		validator.param("listId").isInt({
			min: 1,
		}),
		validator.body("title").isLength({
			min: 1,
			max: 50,
		}),
		validator.body("description").optional().isLength({
			min: 1,
			max: 300,
		}),
		//error handler
		errorHandler,
	],
	getList("listId"),
	async (req, res) => {
		const createdItem = await Item.create({
			title: req.body.title,
			description: req.body.description,
		});

		req.list.addItem(createdItem);
		res.send(createdItem);
	}
);

listsRouter.post(
	"/:listId/move/:itemId/to/:listId2",
	[
		validator.param("listId").isInt({
			min: 1,
		}),
		validator.param("itemId").isInt({
			min: 1,
		}),
		validator.param("listId2").isInt({
			min: 1,
		}),
		//error handler
		errorHandler,
	],
	getList("listId", "originList"),
	getList("listId2", "targetList"),
	getItem,
	async (req, res) => {
		await req.originList.removeItem(req.item);
		await req.targetList.addItem(req.item);

		res.sendStatus(200);
	}
);

export default listsRouter;
