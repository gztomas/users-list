import {
  ApolloClient,
  FieldMergeFunction,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { captureException } from "@sentry/browser";
import { useMemo } from "react";
import { SearchUsersQuery } from "./API";
import aws_config from "./aws-exports";
import "./mockServer";

let apolloClient: ReturnType<typeof createClient>;

/**
 * Updates existing searchUsers field in the cache with incoming data by
 * concatenating new results to existing. This is a very dumb strategy given
 * that it is good enough fot the current UI requirement, but could get
 * improved if needed by leveraging cursors in `nextToken`
 * @param existing
 * @param incoming
 */
const mergeListUsersQuery: FieldMergeFunction<Partial<
  SearchUsersQuery["searchUsers"]
>> = (existing, incoming) => ({
  ...existing,
  ...incoming,
  items: (existing?.items ?? []).concat(incoming?.items ?? []),
});

/**
 * Apollo error link that reports errors to Sentry. Sentry initialization
 * should be added for this to work for production code.
 */
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      captureException(new Error(`[GraphQL error]: ${message}`), {
        extra: { locations, path },
      })
    );
  }
});

const createClient = () =>
  new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: errorLink.concat(
      new HttpLink({
        uri: aws_config.aws_appsync_graphqlEndpoint,
        headers: { "x-api-key": aws_config.aws_appsync_apiKey },
      })
    ),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            searchUsers: { keyArgs: ["filter"], merge: mergeListUsersQuery },
          },
        },
      },
    }),
  });

/**
 * Creates a client or returns an existing instance
 * @param initialState
 */
export const useApollo = (initialState: NormalizedCacheObject | null) =>
  useMemo(() => {
    const client = apolloClient ?? createClient();
    if (initialState) {
      const existingCache = client.extract();
      client.cache.restore({ ...existingCache, ...initialState });
    }
    if (typeof window === "undefined") return client;
    if (!apolloClient) apolloClient = client;
    return client;
  }, [initialState]);
