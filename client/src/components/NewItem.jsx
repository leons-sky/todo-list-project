import React from "react";
import request from "../request.js";

const NewItem = (props) => {
	if (props.visible) {
		return (
			<section>
				<form
					onSubmit={async (event) => {
						event.preventDefault();
						const res = await request ()
					}}
				>
					<label htmlFor="itemTitle">Title:</label>
					<input
						type="text"
						name="itemTitle"
						id="itemTitle"
						required
					/>
					<label htmlFor="itemDescription">Description:</label>
					<input
						type="text"
						name="itemDescription"
						id="itemDescription"
					/>
					<input type="submit" value="Submit" />
					<input type="reset" value="Clear" />
				</form>
			</section>
		);
	}
	return <></>;
};

export default NewItem;
