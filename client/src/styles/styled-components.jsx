import React from "react";
import { IconContext } from "react-icons";
import styled, { createGlobalStyle } from "styled-components";

const IconStyled = ({ className, children, icon, ...rest }) => {
	return React.createElement(
		icon,
		{
			className: className,
			...rest,
		},
		children
	);
};

const IconContextProvider = ({ className, children }) => (
	<IconContext.Provider value={{ className }}>
		{children}
	</IconContext.Provider>
);

export const ListContainerIconsStyled = styled(IconContextProvider)`
	color: var(--accent-red);
	cursor: pointer;

	&:hover {
		filter: brightness(130%) drop-shadow(0 0 2px var(--accent-red));
	}

	&:active {
		filter: brightness(70%);
	}
`;

export const ItemIconsStyled = styled(IconContextProvider)`
	color: var(--accent-aqua);
	&:hover {
		filter: brightness(130%) drop-shadow(0 0 1px var(--accent-aqua));
	}

	&:active {
		filter: brightness(70%);
	}
`;

// Global Styling
// export const GlobalStyle = createGlobalStyle`

// `;

// General
export const FormStyled = styled.form`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;
export const Highlight = styled.span`
	color: var(--accent-aqua);
`;

// ItemForm
export const ItemFormContainerStyled = styled.section`
	display: ${(props) => (props.show ? "unset" : "none")};
	visibility: ${(props) => (props.show ? "visible" : "hidden")};
	width: 100%;
	background-color: var(--background-black);
	border-radius: 7px;
	padding: 5%;
`;
export const ItemFormStyled = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	row-gap: 2px;
`;
export const ItemFormTitleStyled = styled.h3`
	text-align: center;
`;
export const ItemFormInputStyled = styled.input`
	border-radius: 7px;
	padding: 7px;
	width: 100%;
	&:focus {
		outline: none;
	}
`;

export const ItemFormDescriptionStyled = styled.textarea`
	border-radius: 7px;
	padding: 7px;
	width: 100%;
	&:focus {
		outline: none;
	}
`;

export const ItemFormButtonStyled = styled.input`
	border: none;
	border-radius: 7px;
	padding: 5px;
	cursor: pointer;
	margin-top: 5px;
	background-color: ${(props) => props.background};
	color: ${(props) => props.text};
	transition: tranform 0.5s ease-in-out;
	font-weight: 500;
	flex-basis: ${(props) => props.size};

	&:hover {
		background-color: ${(props) => props.text};
		color: ${(props) => props.background};
	}
`;

// ListContainer
export const ListContainerStyled = styled.article`
	position: relative;
	display: flex;
	flex-flow: column wrap;
	place-items: center;
	background-color: var(--background-gray);
	min-width: 15rem;
	flex-basis: 15rem;
	flex-grow: 1;
	border-radius: 10px;
	height: min-content;
	padding: 0.5rem;

	@media screen and (max-width: calc(4rem + 45rem + 2rem)) {
		flex-grow: unset;
		flex-basis: unset;
		width: 100%;
	}
`;
export const ListTitleStyled = styled.h2`
	margin: 2%;
	font-size: 2em;
	text-align: center;
`;
export const ListAddButtonStyled = styled(IconStyled)`
	/* position: absolute;
	top: 0.5rem;
	right: 0.5rem; */
`;
export const ListContainerItemsSection = styled.section`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 0.5rem;
	padding: 1rem;
`;

// ListItem
export const ItemStyled = styled.article`
	/* position: relative; */
	display: grid;

	/* column-gap: 1rem; */

	grid-template-rows: 1fr 1fr 1fr 1fr;
	grid-template-areas:
		"b b b"
		"t t t"
		"d d c"
		"d d c";
	justify-items: space-between;
	align-items: center;

	background-color: var(--background-light-gray);
	padding: 1rem;
	border-radius: 5px;

	&:hover {
		filter: brightness(120%);
		border: 1px solid var(--background-black);
	}
`;

export const ItemTitleStyled = styled.h3`
	grid-area: t;
	justify-self: center;
	text-decoration: underline;
`;
export const ItemCheckmarkContainerStyled = styled.div`
	justify-self: flex-end;
	grid-area: c;
`;
export const ItemCheckmarkStyled = styled(IconStyled)`
	display: ${(props) => (props.$show ? "unset" : "none")};
	visibility: ${(props) => (props.$show ? "visible" : "hidden")};
`;
export const ItemDescriptionStyled = styled.p`
	overflow: wrap;
	grid-area: d;
`;
export const ItemButtonsStyled = styled.section`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.5rem;
	width: 100%;
	grid-area: b;
`;
export const ItemTimestampStyled = styled.time`
	font-size: 0.8em;
`;
export const DeleteButtonStyled = styled(IconStyled)`
	cursor: pointer;
`;
export const EditButtonStyled = styled(IconStyled)`
	cursor: pointer;
`;

// export {
// 	FormSectionStyled,
// 	FormStyled,
// 	ListContainerStyled,
// 	ListTitleStyled,
// 	ItemTimestampStyled,
// 	ItemTitleStyled,
// 	ItemDescriptionStyled,
// };
