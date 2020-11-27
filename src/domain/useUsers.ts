import { gql, useQuery } from "@apollo/client";
import { useRef } from "react";
import { SearchUsersQuery, SearchUsersQueryVariables } from "../API";
import { searchUsers } from "../graphql/queries";

export const useUsers = (match: string) => {
  const { data, fetchMore } = useQuery<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >(gql(searchUsers), {
    variables: { limit: 6, filter: { name: { match } } },
  });
  const dataRef = useRef(data);
  dataRef.current = data ?? dataRef.current;
  const { searchUsers: users } = dataRef.current ?? {};
  return {
    users,
    loadMore: () => fetchMore({ variables: { nextToken: users?.nextToken } }),
  };
};
