import { graphql, rest, setupWorker } from "msw";
import { SearchUsersQuery, SearchUsersQueryVariables } from "./API";
import { PLACEHOLDER_AVATAR_IMAGE } from "./components/UsersList";

const handlers = [
  graphql.query<SearchUsersQuery, SearchUsersQueryVariables>(
    "SearchUsers",
    (req, res, ctx) =>
      res(
        ctx.data({
          searchUsers: {
            items: [
              {
                __typename: "User",
                address: null,
                createdAt: "2019",
                description: null,
                dob: null,
                id: "1",
                name: "Some user",
                updatedAt: "2020",
              },
            ],
            nextToken: "token",
            total: 0,
            __typename: "SearchableUserConnection",
          },
        })
      )
  ),

  rest.get("https://source.unsplash.com/*", async (req, res, ctx) => {
    const imageBuffer = await fetch(PLACEHOLDER_AVATAR_IMAGE).then((res) =>
      res.arrayBuffer()
    );
    return res(
      ctx.set("Content-Length", imageBuffer.byteLength.toString()),
      ctx.set("Content-Type", "image/jpeg"),
      ctx.body(imageBuffer)
    );
  }),
];

if (typeof window !== "undefined" && process.env.NODE_ENV === "test") {
  const worker = setupWorker(...handlers);
  void worker.start();
}
