import { graphql, rest, setupWorker } from "msw";
import { SearchUsersQuery, SearchUsersQueryVariables } from "./API";
import { PLACEHOLDER_AVATAR_IMAGE } from "./components/UsersList";

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

const handlers = [
  graphql.query<SearchUsersQuery, SearchUsersQueryVariables>(
    "SearchUsers",
    (req, res, ctx) =>
      res(
        ctx.data({
          searchUsers: {
            items: Array.from({ length: 15 }, (_, i) => ({
              __typename: "User" as const,
              address: null,
              createdAt: "2019",
              description: null,
              dob: null,
              id: String(i),
              name: names[i % names.length],
              updatedAt: "2020",
            })).slice(0, req.variables.limit ?? 100),
            nextToken: "0",
            total: 15,
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

if (
  typeof window !== "undefined" &&
  window.location.search.includes("msw=true")
) {
  const worker = setupWorker(...handlers);
  void worker.start();
}