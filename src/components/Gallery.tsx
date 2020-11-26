import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { ListUsersQuery } from "../API";
import { listUsers } from "../graphql/queries";

export const Gallery = () => {
  const { data } = useQuery<ListUsersQuery>(
    gql`
      ${listUsers}
    `
  );

  return (
    <Grid>
      {data?.listUsers?.items?.map((user) => (
        <Card
          key={user?.id}
          href="https://github.com/vercel/next.js/tree/master/examples"
        >
          <h3>{user?.name}</h3>
          <p>{user?.description}</p>
        </Card>
      ))}
    </Grid>
  );
};

const Grid = styled.div`
  @media (max-width: 600px) {
    & {
      width: 100%;
      flex-direction: column;
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  max-width: 800px;
  margin-top: 3rem;
`;

const Card = styled.a`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover,
  &:focus,
  &:active {
    color: #0070f3;
    border-color: #0070f3;
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;
