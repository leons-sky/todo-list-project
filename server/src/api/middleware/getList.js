import { List } from "../../db/models";

export default function getList(param, key) {
	key = key ?? "list";
	return async (req, res, next) => {
		const list = await List.findByPk(req.params[param]);
		if (!list) {
			return res.sendStatus(404);
		}
		req[key] = list;
		next();
	};
}
