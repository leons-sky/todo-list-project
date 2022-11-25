import { createContext } from "react";

const UserContext = createContext({
	user: null,
	setUser: () => {
		console.log("NO USER UPDATER");
	},
});

export default UserContext;
