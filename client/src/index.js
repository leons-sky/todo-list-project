import React from "react";
import ReactDOM from "react-dom/client";
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from "react-router-dom";
import { Home, Signup, Error, Root } from "./pages";

import "./styles/reset.css";
import "./styles/index.css";
import request from "./request";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />} errorElement={<Error />}>
			<Route
				index
				element={<Home />}
				loader={async () => {
					const response = await request("http://localhost:4000/");

					console.log(response);
				}}
			/>
			<Route
				path="signup"
				element={<Signup />}
				loader={async () => {
					// const response = await request("http://localhost:4000/", {
					// 	method: "POST",
					// 	body: JSON.stringify({
					// 		username: "leonsemmens",
					// 		password: "test123",
					// 	}),
					// });
					// console.log(response);
					// if (response.ok) {
					// 	const user = await response.json();
					// 	console.log(user);
					// }
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
