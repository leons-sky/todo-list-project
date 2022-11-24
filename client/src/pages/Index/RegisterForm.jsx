import React from "react";
import styled from "styled-components";

const Label = styled.label`
	display: block;
`;

const RegisterForm = () => {
	return (
		<form>
			<Label htmlFor="username">
				Username
				<br />
				<input type="text" name="username" />
			</Label>
			<Label htmlFor="password">
				Password
				<br />
				<input type="password" name="password" />
			</Label>
			<Label htmlFor="password-confirm">
				Confirm Password
				<br />
				<input type="password-confirm" name="password" />
			</Label>
			<button type="submit">Register</button>
		</form>
	);
};

export default RegisterForm;
