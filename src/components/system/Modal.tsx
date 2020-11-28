import styled from "@emotion/styled";

export const Modal = styled.div`
  background-color: ${({ theme }) => theme.color.bgHaze};
  border-radius: 8px;
  min-height: 40rem;
  position: absolute;
  top: 19.21875rem;
  width: 83rem;
  padding: 4rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;

  & > * + * {
    margin-left: 4rem;
  }
`;

export const ModalBackdrop = styled.div`
  background-color: ${({ theme }) => theme.color.bgContrast};
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;
