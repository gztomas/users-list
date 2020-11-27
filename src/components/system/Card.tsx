import styled from "@emotion/styled";

export const Card = styled.a`
  align-items: center;
  background-color: ${({ theme }) => theme.color.bgPrimary};
  border-radius: 10px;
  border: 1px solid #eaeaea;
  color: inherit;
  display: flex;
  flex-basis: 45%;
  flex-direction: column;
  height: 21rem;
  justify-content: space-between;
  padding: 1.5rem;
  padding: 2.5rem 2rem;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.3s ease-in-out;
  width: 25rem;

  &:hover,
  &:focus {
    outline: none;
    box-shadow: 0px 4px 10px ${(props) => props.theme.color.divider};
  }
`;

export const CardTitle = styled.h2`
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const CardSubtitle = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CardContent = styled.div`
  align-self: stretch;
`;
