import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
	ItemStyled,
	ItemTimestampStyled,
	ItemTitleStyled,
	ItemDescriptionStyled,
	DeleteButtonStyled,
	EditButtonStyled,
	ItemButtonsStyled,
	ItemFormInputStyled,
	ItemFormDescriptionStyled,
	ItemCheckmarkStyled,
	ItemCheckmarkContainerStyled,
	ItemIconsStyled,
} from "../styles/styled-components.jsx";
import request from "../request.js";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { BiCheckbox } from "react-icons/bi";
import { BiCheckboxSquare } from "react-icons/bi";
// import { GiScorpion } from "react-icons/gi";

const ListItem = (props) => {
	const date = new Date(props.item.createdAt);
	const stringDate = new Intl.DateTimeFormat("en-GB", {
		dateStyle: "short",
		timeStyle: "medium",
		timeZone: "UTC",
	}).format(date);

	const [editedTitle, editTitle] = useState(props.item.title ?? "");
	const [editedDescription, editDescription] = useState(
		props.item.description ?? ""
	);
	const [showModal, setShowModal] = useState(false);

	function modalClose() {
		editTitle(props.item.title ?? "");
		editDescription(props.item.description ?? "");
		setShowModal(false);
	}

	return (
		<ItemStyled
			onDragEnter={(e) => {
				props.onDragEnter(e, props.item.id);
			}}
			onDragStart={(e) => {
				props.onDragStart(e, props.item.id);
			}}
			onDragEnd={props.onDragEnd}
			draggable
		>
			<Modal show={showModal} onHide={modalClose}>
				<Modal.Header closeButton>
					<Modal.Title>Edit todo item</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<label htmlFor="itemTitle">Title:</label>
					<ItemFormInputStyled
						type="text"
						name="itemTitle"
						value={editedTitle}
						onChange={(event) => editTitle(event.target.value)}
					/>
					<label htmlFor="itemDescription">Description:</label>
					<ItemFormDescriptionStyled
						name="itemDescription"
						value={editedDescription}
						onChange={(event) =>
							editDescription(event.target.value)
						}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={modalClose}>
						Close
					</Button>
					<Button
						variant="primary"
						onClick={async () => {
							//submitting request

							const res = await request(
								`/items/${props.item.id}`,
								{
									method: "PUT",
									body: {
										title: editedTitle
											? editedTitle
											: undefined,
										description: editedDescription
											? editedDescription
											: undefined,
									},
								}
							);
							if (res.ok) {
								const updatedItem = await res.json();

								props.setItems((items) => {
									const copy = [...items];
									const oldItem = copy.filter(
										(item) => item.id === updatedItem.id
									)[0];
									const oldItemIndex = copy.indexOf(oldItem);
									copy[oldItemIndex] = updatedItem;
									return copy;
								});
							} else {
								console.log(await res.json());
							}

							modalClose();
							// document.getElemenByID("title", "description").submit
							// console.log("clicked");
							// document.getElementByID("modal");{
							// on.click(form_submit)modal("hide")
							// }
						}}
					>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
			<ItemButtonsStyled>
				<ItemIconsStyled>
					<EditButtonStyled
						icon={AiFillEdit}
						size={36}
						onClick={() => setShowModal(true)}
					/>
				</ItemIconsStyled>
				<ItemTimestampStyled>{stringDate}</ItemTimestampStyled>
				<ItemIconsStyled>
					<DeleteButtonStyled
						icon={AiFillCloseCircle}
						size={36}
						onClick={async () => {
							// fetch method delete
							// send event.target.value (itemid)
							const res = await request(
								`/items/${props.item.id}`,
								{
									method: "DELETE",
								}
							);

							if (res.ok) {
								props.setItems((items) => {
									return items.filter(
										(item) => item.id !== props.item.id
									);
								});
							} else {
								console.log(res);
							}
						}}
					/>
				</ItemIconsStyled>
			</ItemButtonsStyled>
			<ItemTitleStyled>{props.item.title}</ItemTitleStyled>
			<ItemCheckmarkContainerStyled
				onClick={() => {
					//send request
					props.setItems(async (items) => {
						const completed = !props.item.completed;

						const res = await request(`/items/${props.item.id}`, {
							method: "PUT",
							body: {
								completed: completed,
							},
						});
						if (res.ok) {
							props.item.completed = completed;
						}

						return [...items];
					});
				}}
			>
				<ItemCheckmarkStyled
					icon={BiCheckbox}
					size={48}
					$show={!props.item.completed}
				/>
				<ItemCheckmarkStyled
					icon={BiCheckboxSquare}
					size={48}
					$show={props.item.completed}
				/>
			</ItemCheckmarkContainerStyled>
			<ItemDescriptionStyled>
				{props.item.description}
			</ItemDescriptionStyled>
		</ItemStyled>
	);
};

export default ListItem;
