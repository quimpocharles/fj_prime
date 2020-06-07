import { gql } from "apollo-boost";

const getCategoriesQuery = gql`
  {
    getCategories {
      id
      name
      image_location
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
      categoryId
      price
      image_location
      shop_name
    }
  }
`;

const getCartQuery = gql`
  query($id: String!) {
    getMember(id: $id) {
      first_name
      cart {
        quantity
      }
    }
  }
`;

const getProductQuery = gql`
  query($id: String!) {
    getProduct(id: $id) {
      id
      name
      price
      categoryId
      image_location
      shell {
        name
      }
    }
  }
`;

export {
  getCategoriesQuery,
  getCategoryQuery,
  getProductsQuery,
  getCartQuery,
  getProductQuery,
};
