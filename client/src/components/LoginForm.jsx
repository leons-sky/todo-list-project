import React, { useState } from "react";
import request from "../request.js";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FormStyled } from "../styles/styled-components.jsx";

const Input = styled.input`
	background-color: white;
	color: black;
`;

const LoginError = styled.p`
	display: ${(props) => (props.show ? "unset" : "none")};
	visibility: ${(props) => (props.show ? "visible" : "hidden")};
	color: var(--accent-red);
	stroke: 1px white;
`;

const LoginButton = styled.button`
	display: block;
	align-self: center;
`;

const LoginInput = (props) => {
	return (
		<label htmlFor={props.id}>
			{props.title}
			<br />
			<Input
				type={props.inputType ?? "text"}
				name={props.id}
				onChange={(e) => props.update(e.target.value)}
				required
				valid={!props.errorData}
			/>
		</label>
	);
};

const LoginForm = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	return (
		<FormStyled
			onSubmit={async (event) => {
				event.preventDefault();

				setError(null);
				const data = { username, password };

				const response = await request("/users/login", {
					method: "POST",
					body: data,
				});

				if (response.ok) {
					navigate("/lists");
				} else {
					if (response.status === 403) {
						setError("Invalid username or password");
					}
				}
			}}
		>
			<LoginInput id="username" title="Username" update={setUsername} />
			<LoginInput
				id="password"
				title="Password"
				inputType="password"
				update={setPassword}
			/>
			<LoginError>{error ? error.msg : ""}</LoginError>
			<LoginButton type="submit">Login</LoginButton>
		</FormStyled>
	);
};

export default LoginForm;
