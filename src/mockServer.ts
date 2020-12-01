import { graphql, rest, setupWorker } from "msw";
import {
  SearchUsersQuery,
  SearchUsersQueryVariables,
  UpdateUserMutation,
  UpdateUserMutationVariables,
} from "./API";
import { PLACEHOLDER_AVATAR_IMAGE } from "./constants";

const names = [
  "Brody Shepard",
  "Karolina Griffith",
  "Annabella Day",
  "Jaidon Mcnamara",
  "Nettie Koch",
  "Amanpreet Bob",
  "Maci Byrd",
  "Ailish Chase",
  "Sienna Marriott",
  "Kaylem Barron",
];

const users = Array.from({ length: 15 }, (_, i) => ({
  __typename: "User" as const,
  address: null,
  createdAt: "2019",
  description: null,
  dob: null,
  id: String(i),
  name: names[i % names.length],
  updatedAt: "2020",
}));

/**
 * Mock API for functional tests
 */
const handlers = [
  graphql.query<SearchUsersQuery, SearchUsersQueryVariables>(
    "SearchUsers",
    (req, res, ctx) =>
      res(
        ctx.data({
          searchUsers: {
            items: users.slice(0, req.variables.limit ?? 100),
            nextToken: "0",
            total: users.length,
            __typename: "SearchableUserConnection",
          },
        })
      )
  ),

  graphql.mutation<UpdateUserMutation, UpdateUserMutationVariables>(
    "UpdateUser",
    (req, res, ctx) => {
      const user = users.find((user) => user.id === req.variables.input.id);
      Object.assign(user, req.variables.input);
      return res(
        user
          ? ctx.data({
              updateUser: user,
            })
          : ctx.errors([new Error("User not found")])
      );
    }
  ),

  rest.get("https://source.unsplash.com/*", async (_, res, ctx) => {
    const imageBuffer = await (
      await fetch(PLACEHOLDER_AVATAR_IMAGE)
    ).arrayBuffer();
    return res(
      ctx.set("Content-Length", imageBuffer.byteLength.toString()),
      ctx.set("Content-Type", "image/jpeg"),
      ctx.body(imageBuffer)
    );
  }),
];

if (
  typeof window !== "undefined" &&
  window.location.search.includes("msw=true")
) {
  const worker = setupWorker(...handlers);
  void worker.start();
}
