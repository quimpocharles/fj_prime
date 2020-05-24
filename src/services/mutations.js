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

export { createMemberMutation };
