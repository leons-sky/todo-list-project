import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext.js";
import styled from "styled-components";
import ListContainer from "../components/ListContainer.jsx";

const Header = styled.header`
	background-color: var(--background-gray);
	width: 100%;
	padding: 1rem;

	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	gap: 1rem;
`;

const Main = styled.main`
	width: 100%;
	height: 100%;

	padding: 2rem;
`;

const ListsSection = styled.section`
	width: 100%;
	height: 100%;

	display: flex;
`;

const LoggedIn = styled.h4`
	font-style: normal;
	font-weight: 400;
`;

const Highlight = styled.span`
	color: var(--accent-aqua);
`;

const LogoutButton = styled.button``;

const Lists = () => {
	const currentUser = useContext(UserContext);
	const navigate = useNavigate();

	return (
		<>
			<Header>
				<LogoutButton
					onClick={(e) => {
						navigate("/");
					}}
				>
					Logout
				</LogoutButton>
				<LoggedIn>
					Logged in as{" "}
					<Highlight>
						{currentUser ? currentUser.username : "NONE"}
					</Highlight>
				</LoggedIn>
			</Header>
			<Main>
				<ListsSection>
					<ListContainer title="Cool" />
				</ListsSection>
			</Main>
		</>
	);
};

export default Lists;
