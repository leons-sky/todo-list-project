import React from "react";
import styled from "styled-components";

const ItemTimestamp = styled.time``;
const ItemTitle = styled.h3``;
const ItemDescription = styled.p``;

const ListItem = (props) => {
	return (
		<section>
			<div>
				<ItemTimestamp>{props.itemCreatedAt}</ItemTimestamp>
				{
				// DeleteButton
				}
			</div>

			<ItemTitle>{props.itemTitle}</ItemTitle>
			<ItemDescription>{props.itemDescription}</ItemDescription>
		</section>
	);
};

export default ListItem;
