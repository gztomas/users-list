import styled from "@emotion/styled";

type Props = {
  $variant?: "primary" | "secondary";
  $error?: boolean;
};

export const Button = styled.button<Props>`
  align-items: center;
  background-color: ${({ theme, $variant }) =>
    $variant === "secondary" ? theme.color.bgHaze : theme.color.bgPrimary};
  border-radius: 8px;
  border: 4px solid
    ${({ theme, $error }) => ($error ? theme.color.error : theme.color.divider)};
  color: ${({ theme, $error }) =>
    $error ? theme.color.error : theme.color.primary};
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

  :hover:not(:disabled) {
    border-color: ${({ theme }) => theme.color.hover};
  }
  :focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.focus};
  }
  :disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.color.disabled};
  }
`;
