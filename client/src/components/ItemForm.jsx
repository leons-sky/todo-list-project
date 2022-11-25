import React, { useState } from "react";
import styled from "styled-components";
import {
	ItemFormContainerStyled,
	ItemFormStyled,
	ItemFormTitleStyled,
	ItemFormInputStyled,
	ItemFormDescriptionStyled,
	ItemFormButtonStyled,
	ItemButtonsStyled,
} from "../styles/styled-components.jsx";
import request from "../request.js";
import { GiScorpion } from "react-icons/gi";

const ItemForm = (props) => {
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();

	return (
		<ItemFormContainerStyled show={props.show}>
			<ItemFormTitleStyled>Create New Item</ItemFormTitleStyled>
			<ItemFormStyled
				onSubmit={async (event) => {
					event.preventDefault();
					const res = await request(`/lists/${props.listId}`, {
						method: "POST",
						body: {
							title: title,
							description: description,
						},
					});
					if (res.ok) {
						const newItem = await res.json();
						props.setItems((items) => {
							return [...items, newItem];
						});
					} else {
						console.log(res);
					}
				}}
			>
				<label htmlFor="itemTitle">Title:</label>
				<ItemFormInputStyled
					type="text"
					name="itemTitle"
					required
					onChange={(event) => setTitle(event.target.value)}
				/>
				<label htmlFor="itemDescription">Description:</label>
				<ItemFormDescriptionStyled
					name="itemDescription"
					onChange={(event) => setDescription(event.target.value)}
				/>
				<ItemButtonsStyled>
					<ItemFormButtonStyled
						size="25%"
						background="var(--background-light-gray)"
						text="var(--accent-red)"
						type="reset"
						value="Clear"
					/>
					<ItemFormButtonStyled
						size="70%"
						background="var(--background-light-gray)"
						text="var(--accent-aqua)"
						type="submit"
						value="Submit"
					/>
				</ItemButtonsStyled>
			</ItemFormStyled>
		</ItemFormContainerStyled>
	);
};

export default ItemForm;
