import { Item } from "../../db/models";

export default async function getItem(req, res, next) {
	const item = await Item.findByPk(req.params.itemId);
	if (!item) {
		return res.sendStatus(404);
	}
	req.item = item;
	next();
}
