import styled from "@emotion/styled";

export const Input = styled.input`
  align-items: center;
  background-color: ${({ theme }) => theme.color.bgPrimary};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.divider};
  color: ${({ theme }) => theme.color.primary};
  display: flex;
  font-family: Source Sans Pro;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.875rem;
  padding: 1rem;
  transition: border 0.3s ease-in-out;
  width: 25rem;

  :hover:not(:disabled) {
    border-color: ${({ theme }) => theme.color.hover};
  }
  :focus:not(:disabled) {
    outline: none;
    border-color: ${({ theme }) => theme.color.focus};
  }
  :invalid {
    border-color: ${({ theme }) => theme.color.error};
  }
  :disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.color.secondary};
    background-color: ${({ theme }) => theme.color.bgHaze};
  }
  ::placeholder {
    color: ${({ theme }) => theme.color.secondary};
    font-weight: 300;
  }
`;
