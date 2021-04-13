import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../__type_graphql__/meQuery";

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      password
      identity
      role
    }
  }
`;

export const useMe = () => {
  return useQuery<meQuery>(ME_QUERY, {
    fetchPolicy: "cache-and-network",
  });
};
