import React, { useContext, useRef, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import ListContainer from "../components/ListContainer";
import request from "../request";
import { Highlight } from "../styles/styled-components";
import ListsContext from "../contexts/ListsContext.js";

const Header = styled.header`
	background-color: var(--background-gray);
	border-bottom: 2px solid var(--accent-aqua);
	flex-basis: 15%;
	flex-grow: 0;
	width: 100%;
	padding: 0.5rem;
	position: sticky;
	top: 0;
	z-index: 2;
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
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-start;

	gap: 1rem;

	@media screen and (max-width: calc(4rem + 45rem + 2rem)) {
		justify-content: flex-start;
		flex-direction: column;
	}
`;

const LoggedIn = styled.h4`
	font-style: normal;
	font-weight: 400;
`;

const LogoutButton = styled.button``;

const Lists = () => {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const [lists, setLists] = useState(useLoaderData());
	// console.log("LISTS", lists);

	const dragItem = useRef();
	const dragOverList = useRef();
	const dragOverItem = useRef();

	return (
		<>
			{" "}
			{/* ListsContext.Provider value={{ lists, setLists }} */}
			<Header>
				<LogoutButton
					onClick={async () => {
						await request("/users/logout", {
							method: "POST",
						});
						navigate("/");
					}}
				>
					Logout
				</LogoutButton>
				<LoggedIn>
					Logged in as{" "}
					<Highlight>{user ? user.username : "NONE"}</Highlight>
				</LoggedIn>
			</Header>
			<Main>
				<ListsSection>
					{lists.map((list) => (
						<ListContainer
							key={list.id}
							list={list}
							setItems={async (itemsOrCallback) => {
								let newItems;
								if (typeof itemsOrCallback === "function") {
									newItems = await itemsOrCallback(
										list.items
									);
								} else {
									newItems = itemsOrCallback;
								}
								setLists((prev) => {
									list.items = newItems;
									return [...prev];
								});
							}}
							onDragItem={(e, id) => {
								dragItem.current = id;
							}}
							onDropItem={async (e) => {
								const itemId = dragItem.current;
								const overItemId = dragOverItem.current;
								const listId = dragOverList.current;

								dragItem.current =
									dragOverItem.current =
									dragOverList.current =
										null;

								if (!itemId) return;

								const originalList = lists.filter(
									(list) =>
										!!list.items.find(
											(item) => item.id === itemId
										)
								)[0];
								if (!originalList) return;
								const originalItem = originalList.items.filter(
									(item) => item.id === itemId
								)[0];
								if (!originalItem) return;

								let destinationList;
								if (listId) {
									destinationList = lists.filter(
										(list) => list.id === listId
									)[0];
								}

								if (
									(!listId || !destinationList) &&
									overItemId
								) {
									destinationList = lists.filter(
										(list) =>
											!!list.items.find(
												(item) => item.id === overItemId
											)
									)[0];
								}

								if (!destinationList) return;

								let overItem;
								if (overItemId) {
									overItem = destinationList.items.filter(
										(item) => item.id === overItemId
									)[0];
								}

								const res = await request(
									`/lists/${originalList.id}/move/${originalItem.id}/to/${destinationList.id}`,
									{
										method: "POST",
									}
								);
								if (!res.ok) {
									console.log(res);
									return;
								}

								if (overItem) {
									setLists((lists) => {
										const originalItemIndex =
											originalList.items.indexOf(
												originalItem
											);
										originalList.items.splice(
											originalItemIndex,
											1
										);
										const overItemIndex =
											destinationList.items.indexOf(
												overItem
											);
										destinationList.items.splice(
											overItemIndex +
												(destinationList ===
													originalList &&
												originalItemIndex <=
													overItemIndex
													? 1
													: 0),
											0,
											originalItem
										);
										return [...lists];
									});
								} else {
									setLists((lists) => {
										originalList.items.splice(
											originalList.items.indexOf(
												originalItem
											),
											1
										);
										destinationList.items.push(
											originalItem
										);
										return [...lists];
									});
								}
							}}
							onDragEnterItem={(e, id) => {
								dragOverItem.current = id;
							}}
							onDragEnterList={(e, id) => {
								const list = lists.filter(
									(list) => list.id === id
								)[0];
								const item = list.items.filter(
									(item) => item.id === dragOverItem.current
								)[0];
								if (!item) {
									dragOverItem.current = null;
								}
								dragOverList.current = id;
							}}
						/>
					))}
				</ListsSection>
			</Main>
		</>
	);
};

export default Lists;
