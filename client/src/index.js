import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from "react-router-dom";
import { Home, Signup, Error, Root } from "./pages";

import "./reset.css";
import "./index.css";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />} errorElement={<Error />}>
			<Route
				index
				element={<Home />}
				loader={async () => {
					const response = await fetch("http://localhost:4000/", {
						method: "GET",
						credentials: "include",
						mode: "cors",
						headers: {
							"Content-Type": "application/json",
						},
					});

					console.log(response);
				}}
			/>
			<Route
				path="signup"
				element={<Signup />}
				loader={async () => {
					const response = await fetch("http://localhost:4000/", {
						method: "POST",
						credentials: "include",
						mode: "cors",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							username: "leonsemmens",
							password: "test123",
						}),
					});

					console.log(response);
					if (response.ok) {
						const user = await response.json();
						console.log(user);
					}
				}}
			/>
		</Route>
	)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	<RouterProvider router={router} />
	// </React.StrictMode>
);
