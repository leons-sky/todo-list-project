import express from "express";
import validator from "express-validator";
import { Item, User, List } from "../../db/models";

// create a router
const listsRouter = express.Router();

//  getting lists of user *****************

listsRouter.get("/", async (req, res) => {
	// const list = await List.findAll({ where: { userID: req.params.userID } });
	// res.send(list);
	res.send({});
});

const getList = async (req, res, next) => {
	const list = await List.findByPk(req.params.listId);
	req.list = list;
	next();
};

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
		//error handler
		(req, res, next) => {
			const errors = validator.validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).send(errors.array());
			}
			next();
		},
	],
	getList,
	async (req, res) => {
		const createdItem = await Item.create({
			title: req.body.title,
			description: req.body.description,
		});

		req.list.addItem(createdItem);
		res.send(createdItem);
	}
);

export default listsRouter;
