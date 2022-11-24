import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
	const error = useRouteError();

	console.log(error);
	return (
		<>
			<h1>Oopsie! An error occured!</h1>
			<p>{JSON.stringify(error, null, 4)}</p>
		</>
	);
};

export default Error;
