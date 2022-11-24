import React from "react";
import styled from "styled-components";

const Section = styled.section`
	display: ${(props) => (props.show ? "unset" : "none")};
	visibility: ${(props) => (props.show ? "visible" : "hidden")};
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const ItemForm = (props) => {
	return (
		<Section show={props.show}>
			<h3>Create New Item</h3>
			<Form
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
			</Form>
		</Section>
	);
};

export default ItemForm;
