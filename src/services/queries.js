import { gql } from "apollo-boost";

const getCategoriesQuery = gql`
  {
    getCategories {
      name
      id
    }
  }
`;

export { getCategoriesQuery };
