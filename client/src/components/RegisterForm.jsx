import React, { useState } from "react";
import request from "../request.js";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FormStyled } from "../styles/styled-components";

const Label = styled.label`
	display: block;
`;

const Input = styled.input`
	background-color: white;
	color: black;
`;

const InputError = styled.p`
	display: ${(props) => (props.show ? "unset" : "none")};
	visibility: ${(props) => (props.show ? "visible" : "hidden")};
	color: var(--accent-red);
	stroke: 1px white;
`;

const RegisterButton = styled.button`
	display: block;
	align-self: center;
`;

const RegisterInput = (props) => {
	return (
		<>
			<Label htmlFor={props.id}>
				{props.title}
				<br />
				<Input
					type={props.inputType ?? "text"}
					name={props.id}
					onChange={(e) => props.update(e.target.value)}
					required
					valid={!props.errorData}
				/>
			</Label>
			<InputError show={!!props.errorData}>
				{props.errorData ? props.errorData.msg : ""}
			</InputError>
		</>
	);
};

const RegisterForm = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	return (
		<FormStyled
			onSubmit={async (event) => {
				event.preventDefault();

				setErrors({});

				if (password !== confirmPassword) {
					setErrors((value) => {
						value.confirmPassword = {
							msg: "Passwords do not match",
						};
						return value;
					});
				}

				if (Object.keys(errors).length > 0) return;

				const data = { username, password };

				const response = await request("/users/register", {
					method: "POST",
					body: data,
				});

				if (response.ok) {
					navigate("/lists");
				} else {
					console.log(response);
					if (response.status === 409) {
						setErrors((value) => {
							value.username = {
								msg: "Username is taken",
							};
							return value;
						});
					} else {
						setErrors((value) => {
							value.username = {
								msg: "An error occured",
							};
							return value;
						});
						// console.log(await response.json());
					}
				}
			}}
		>
			<RegisterInput
				id="username"
				title="Username"
				update={setUsername}
				errorData={errors.username}
			/>
			<RegisterInput
				id="password"
				title="Password"
				inputType="password"
				update={setPassword}
				errorData={errors.password}
			/>
			<RegisterInput
				id="confirm-password"
				title="Confirm Password"
				inputType="password"
				update={setConfirmPassword}
				errorData={errors.confirmPassword}
			/>
			<RegisterButton type="submit">Register</RegisterButton>
		</FormStyled>
	);
};

export default RegisterForm;
