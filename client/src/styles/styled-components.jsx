import styled from "styled-components";

// ItemForm
const FormSectionStyled = styled.section`
	display: ${(props) => (props.show ? "unset" : "none")};
	visibility: ${(props) => (props.show ? "visible" : "hidden")};
`;

const FormStyled = styled.form`
	display: flex;
	flex-direction: column;
`;

// ListContainer
const ListContainerStyled = styled.article``;
const ListTitleStyled = styled.h2``;

// ListItem
const ItemTimestampStyled = styled.time``;
const ItemTitleStyled = styled.h3``;
const ItemDescriptionStyled = styled.p``;

export {
	FormSectionStyled,
	FormStyled,
	ListContainerStyled,
	ListTitleStyled,
	ItemTimestampStyled,
	ItemTitleStyled,
	ItemDescriptionStyled,
};
