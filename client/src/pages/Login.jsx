import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../components/LoginForm.jsx";

const Main = styled.main`
	width: 100%;
	height: 100%;
`;

const Section = styled.section`
	width: 100%;
	height: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Spacer = styled.div`
	height: 20vh;
`;

const H2 = styled.h2`
	margin: 3rem;
	color: var(--accent-red);
`;

const Login = () => {
	return (
		<Main>
			<Section>
				<Spacer />
				<H2>Login</H2>
				<LoginForm />
				<p>
					Don't have an account? <Link to="/">Register</Link>
				</p>
			</Section>
		</Main>
	);
};

export default Login;
