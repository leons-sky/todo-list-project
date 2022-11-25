import React, { useState } from "react";
import ItemForm from "./ItemForm.jsx";
import ListItem from "./ListItem.jsx";
import { IconContext } from "react-icons";
import { AiFillPlusCircle } from "react-icons/ai";
import {
	ListAddButtonStyled,
	ListContainerStyled,
	ListTitleStyled,
	ListContainerItemsSection,
	ListContainerIconsStyled,
} from "../styles/styled-components.jsx";
import styled from "styled-components";
import request from "../request.js";

const ListContainer = (props) => {
	const [showForm, setShowForm] = useState(false);
	// const [items, setItems] = useState(props.list.items)
	// console.log(props.items);

	return (
		<ListContainerIconsStyled>
			<ListContainerStyled
				onDragEnter={(e) => {
					props.onDragEnterList(e, props.list.id);
				}}
			>
				<ListTitleStyled>{props.list.title}</ListTitleStyled>
				<ListAddButtonStyled
					icon={AiFillPlusCircle}
					size={40}
					onClick={() => {
						// show NewItem
						setShowForm((value) => !value);
					}}
				/>
				<ItemForm
					show={showForm}
					listId={props.list.id}
					setItems={props.setItems}
				/>
				<ListContainerItemsSection>
					{
						// [{id: x, title: "x", description: "x", listId: x, createdAt: x, updatedAt: x}, {...}]
						props.list.items.map((item) => {
							return (
								<ListItem
									key={
										item.id + item.title + item.description
									}
									item={item}
									setItems={props.setItems}
									onDragEnter={props.onDragEnterItem}
									onDragStart={props.onDragItem}
									onDragEnd={props.onDropItem}
								/>
							);
						})
					}
				</ListContainerItemsSection>
			</ListContainerStyled>
		</ListContainerIconsStyled>
	);
};

export default ListContainer;
