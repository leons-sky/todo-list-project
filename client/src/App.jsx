import React from "react";
import { useState } from "react";
import {
	createBrowserRouter,
	createRoutesFromElements,
	redirect,
	Route,
	RouterProvider,
} from "react-router-dom";
import UserContext from "./contexts/UserContext";
import { ErrorHandling, Index, Login, Root } from "./pages";
import Lists from "./pages/Lists";
import request from "./request";

const Routes = (props) => {
	return (
		<Route path="/" element={<Root />} errorElement={<ErrorHandling />}>
			<Route
				index
				element={<Index />}
				loader={async () => {
					const res = await request("/users/");
					console.log(res);
					if (res.ok) {
						const user = await res.json();
						props.setCurrentUser(user);

						return redirect("/lists");
					}
					// const response = await request("http://localhost:4000/");
					// console.log(response);
				}}
			/>
			<Route path="login" element={<Login />} />
			<Route
				path="lists"
				element={<Lists />}
				loader={async () => {
					const res = await request("/lists");

					if (res.ok) {
						const lists = await res.json();
						return lists;
					}
					return {};
				}}
			/>
		</Route>
	);
};

const App = () => {
	const [currentUser, setCurrentUser] = useState();
	const router = createBrowserRouter(
		createRoutesFromElements(
			Routes({
				setCurrentUser,
			})
		)
	);

	return (
		<UserContext.Provider value={currentUser}>
			<RouterProvider router={router} />
		</UserContext.Provider>
	);
};

export default App;
