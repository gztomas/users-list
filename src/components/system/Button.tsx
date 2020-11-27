import styled from "@emotion/styled";

export const Button = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.color.bgPrimary};
  border-radius: 8px;
  border: 4px solid ${({ theme }) => theme.color.divider};
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  font-weight: 600;
  height: 5.625rem;
  justify-content: center;
  line-height: 1.875rem;
  text-transform: uppercase;
  transition: border 0.3s ease-in-out;
  width: 17.5rem;

  &:hover {
    border-color: ${({ theme }) => theme.color.hover};
  }
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.focus};
  }
`;