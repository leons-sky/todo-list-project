import express from "express";
import { Item } from "../../db/models";

const itemsRouter = express.Router();

const getItem = async (req, res, next) => {
	const item = await Item.findByPk(req.params.itemId);
	req.item = item;
	next();
};

//edit a item ****************
itemsRouter.put("/:itemId", getItem, async (req, res) => {
	const updatedItem = await req.item.update({
		title: req.body.title,
		description: req.body.description,
	});
	res.send(updatedItem);
});

//delete a item
itemsRouter.delete("/:itemId", getItem, async (req, res) => {
	// const deletePost = await Post.destroy({where: {id: req.params.postID}});
	await req.item.destroy();
	res.sendStatus(200);
});

export default itemsRouter;
