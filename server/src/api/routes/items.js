import express from "express";
import validator from "express-validator";
import { Item } from "../../db/models";
import auth from "../middleware/auth.js";
import errorHandler from "../middleware/errorHandler.js";
import getItem from "../middleware/getItem.js";

const itemsRouter = express.Router();

//edit a item ****************

itemsRouter.put(
	"/:itemId",
	[
		validator.body("title").optional().isLength({
			min: 2,
			max: 50,
		}),
		//checking description is not empty and length is min 5 char and max 250 char
		validator.body("description").optional().isLength({
			min: 2,
			max: 300,
		}),
		validator.body("completed").optional().isBoolean(),
		errorHandler,
	],
	auth,
	getItem,
	//gives functionality to edit post
	async (req, res) => {
		const updatedItem = await req.item.update({
			title: req.body.title,
			description: req.body.description,
			completed: req.body.completed,
		});
		res.send(updatedItem);
	}
);

//delete a item
itemsRouter.delete("/:itemId", auth, getItem, async (req, res) => {
	// const deletePost = await Post.destroy({where: {id: req.params.postID}});
	await req.item.destroy();
	res.sendStatus(200);
});

export default itemsRouter;
