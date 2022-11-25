import React from "react";
import { useState, useContext } from "react";
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

async function userLoader(setUser) {
	const res = await request("/users/");
	if (res.ok) {
		const user = await res.json();
		setUser(user);
	}
	return res.ok;
}

const PageWithUserContext = (props) => {
	return (
		<UserContext.Provider value={props.value}>
			{props.children}
		</UserContext.Provider>
	);
};

const App = () => {
	const [user, setUser] = useState();

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path="/"
				element={
					<PageWithUserContext value={{ user, setUser }}>
						<Root />
					</PageWithUserContext>
				}
				errorElement={<ErrorHandling />}
			>
				<Route
					index
					element={<Index />}
					loader={async () => {
						if (await userLoader(setUser)) {
							return redirect("/lists");
						}
					}}
				/>
				<Route
					path="login"
					element={<Login />}
					loader={async () => {
						if (await userLoader(setUser)) {
							return redirect("/lists");
						}
					}}
				/>
				<Route
					path="lists"
					element={<Lists />}
					loader={async () => {
						if (!user) {
							if (!(await userLoader(setUser))) {
								return redirect("/login");
							}
						}

						const res = await request("/lists");
						if (res.ok) {
							const lists = await res.json();
							return lists;
						}
						return {};
					}}
				/>
			</Route>
		)
	);

	return <RouterProvider router={router} />;
};

export default App;
