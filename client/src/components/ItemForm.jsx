import React from "react";
import { FormSectionStyled, FormStyled } from "../styles/styled-components.jsx";

const ItemForm = (props) => {
	return (
		<FormSectionStyled show={props.show}>
			<h3>Create New Item</h3>
			<FormStyled
				action="" /* send to endpoint to create item in db*/
				method="post"
				onSubmit={(event) => {
					event.preventDefault();
				}}
			>
				<label htmlFor="itemTitle">Title:</label>
				<input type="text" name="itemTitle" id="itemTitle" required />
				<label htmlFor="itemDescription">Description:</label>
				<input
					type="text"
					name="itemDescription"
					id="itemDescription"
				/>
				<input type="submit" value="Submit" />
				<input type="reset" value="Clear" />
			</FormStyled>
		</FormSectionStyled>
	);
};

export default ItemForm;
