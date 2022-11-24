import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import RegisterForm from "../components/RegisterForm";

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

const Index = () => {
	return (
		<Main>
			<Section>
				<Spacer />
				<H2>Register</H2>
				<RegisterForm />
				<p>
					Already have an account? <Link to="/login">Login</Link>
				</p>
			</Section>
		</Main>
	);
};

export default Index;
