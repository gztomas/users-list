import { gql, useQuery } from "@apollo/client";
import { useRef } from "react";
import {
  ListUsersQuery,
  ListUsersQueryVariables,
  SearchUsersQuery,
  SearchUsersQueryVariables,
} from "../API";
import { listUsers, searchUsers } from "../graphql/queries";

export const useUsers = (match: string) => {
  const { data: searchData, fetchMore: fetchMoreSearch } = useQuery<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >(gql(searchUsers), {
    variables: { limit: 6, filter: { name: { match } } },
    skip: !match,
  });

  const { data: listData, fetchMore: fetchMoreList } = useQuery<
    ListUsersQuery,
    ListUsersQueryVariables
  >(gql(listUsers), {
    variables: { limit: 6, filter: { name: { contains: match } } },
    skip: Boolean(match),
  });

  const usersRef = useRef(listData?.listUsers ?? searchData?.searchUsers);
  usersRef.current =
    listData?.listUsers ?? searchData?.searchUsers ?? usersRef.current;
  const fetchMore = match ? fetchMoreSearch : fetchMoreList;

  return {
    users: usersRef.current,
    loadMore: () =>
      fetchMore({
        variables: { nextToken: usersRef.current?.nextToken },
      }),
  };
};
