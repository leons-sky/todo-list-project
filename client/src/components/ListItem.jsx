import React from "react";
import {
	ItemTimestampStyled,
	ItemTitleStyled,
	ItemDescriptionStyled,
} from "../styles/styled-components.jsx";

const ListItem = (props) => {
	return (
		<section>
			<div>
				<ItemTimestampStyled>{props.itemCreatedAt}</ItemTimestampStyled>
				{
					// DeleteButton
				}
			</div>

			<ItemTitleStyled>{props.itemTitle}</ItemTitleStyled>
			<ItemDescriptionStyled>
				{props.itemDescription}
			</ItemDescriptionStyled>
		</section>
	);
};

export default ListItem;
