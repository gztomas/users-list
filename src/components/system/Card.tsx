import styled from "@emotion/styled";

export const Card = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.color.bgPrimary};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 21rem;
  justify-content: space-between;
  padding: 2.5rem 2rem;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.3s ease-in-out;
  width: 25rem;

  :hover {
    box-shadow: 0px 4px 10px ${(props) => props.theme.color.divider};
  }
  :focus {
    outline: none;
    box-shadow: 0 0 0 4px ${({ theme }) => theme.color.focus};
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
