import React, { useState } from "react";
import ItemForm from "./ItemForm.jsx";
import { IconContext } from "react-icons";
import { AiFillPlusCircle } from "react-icons/ai";
import styled from "styled-components";

const IconContextProvider = ({ className, children }) => (
	<IconContext.Provider value={{ className }}>
		{children}
	</IconContext.Provider>
);

const IconsStyle = styled(IconContextProvider)`
	color: var(--accent-red);
	cursor: pointer;

	&:hover {
		filter: brightness(130%) drop-shadow(0 0 1px var(--accent-red));
	}

	&:active {
		filter: brightness(70%);
	}
`;

const Container = styled.article``;

const ListContainer = (props) => {
	const [showForm, setShowForm] = useState(false);

	return (
		<IconsStyle>
			<Container>
				<h2>{props.title}</h2>
				<AiFillPlusCircle
					size={40}
					onClick={() => {
						// show NewItem
						setShowForm((value) => !value);
					}}
				/>
				<ItemForm show={showForm} />
			</Container>
			{
				// fetch all list items in this list container for this user from database
				// data should appear as
				// [{id: x, title: "x", description: "x", listId: x, createdAt: x, updatedAt: x}, {...}]
				// data.map((item) => {
				// return (
				// <ListItem
                //  itemTitle = item.title
				//  itemDescription = item.description
				//  itemCreatedAt = item.createdAt
				//  />
				// )
				// })
			}
		</IconsStyle>
	);
};

export default ListContainer;
