import { gql } from "apollo-boost";

const createMemberMutation = gql`
	mutation(
		$username: String!
		$email: String!
		$address: String
		$first_name: String
		$last_name: String
		$password: String!
		$contact_number: String!
	) {
		createMember(
			username: $username
			email: $email
			address: $address
			first_name: $first_name
			last_name: $last_name
			password: $password
			contact_number: $contact_number
		) {
			id
			first_name
			last_name
			email
		}
	}
`;

const logInMutation = gql`
	mutation($email: String!, $password: String!) {
		logInMember(email: $email, password: $password) {
			id
			first_name
			last_name
			email
			cart {
				quantity
				itemId
			}
		}
	}
`;

const addToCartMutation = gql`
	mutation(
		$userId: String
		$itemId: String
		$quantity: Int!
		$categoryId: String
	) {
		addToCart(
			userId: $userId
			itemId: $itemId
			quantity: $quantity
			categoryId: $categoryId
		)
	}
`;

const updateCartMutation = gql`
	mutation($userId: String, $itemId: String, $quantity: Int) {
		updateCartItem(userId: $userId, itemId: $itemId, quantity: $quantity)
	}
`;

const deleteCartMutation = gql`
	mutation($userId: String, $itemId: String) {
		deleteCartItem(userId: $userId, itemId: $itemId)
	}
`;

export {
	createMemberMutation,
	logInMutation,
	addToCartMutation,
	updateCartMutation,
	deleteCartMutation,
};
