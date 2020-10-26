import { gql } from "@apollo/client";

export const GET_SEARCH_STRING = gql`
  query searchString {
    searchString @client
  }
`;
