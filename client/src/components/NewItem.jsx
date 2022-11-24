import React from "react";

const NewItem = (props) => {
	if (props.visible) {
		return (
			<section>
				<form
					action="" /* send to endpoint to create item in db*/
					method="post"
					onSubmit={(event) => {
						event.preventDefault();
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
