import { createContext } from "react";

const ListsContext = createContext({
	lists: null,
	setLists: () => {
		console.log("NO ITEMS UPDATER");
	},
});

export default ListsContext;
