import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 38.84375rem;

  & > label + label {
    margin-top: 2.25rem;
  }
`;
