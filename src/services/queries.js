import { gql } from "apollo-boost";

const getCategoriesQuery = gql`
  {
    getCategories {
      name
      id
    }
  }
`;

const getCategoryQuery = gql`
  query($id: String) {
    getCategory(id: $id) {
      id
      name
      products {
        id
        name
        price
      }
    }
  }
`;

const getProductsQuery = gql`
  {
    getProducts {
      id
      name
      categories {
        id
        name
        price
      }
    }
  }
`;

export { getCategoriesQuery, getCategoryQuery, getProductsQuery };
