import styled from "@emotion/styled";
import * as React from "react";

export const Modal = styled.div`
  align-items: center;
  display: flex;
  inset: 0;
  justify-content: center;
  position: fixed;
`;

export const ModalBackdrop = styled.div`
  background-color: ${({ theme }) => theme.color.bgContrast};
  inset: 0;
  position: fixed;
  animation: fade-in 0.1s ease-in-out;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.color.bgHaze};
  border-radius: 8px;
  min-height: 40rem;
  padding: 4rem;
  position: absolute;
  width: 83rem;
  animation: appear 0.3s ease-in-out;
`;

export const ModalBody = styled.div`
  display: flex;
  margin: 5rem 0;

  & > * + * {
    margin-left: 2.25rem;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;

  & > * + * {
    margin-left: 4rem;
  }
`;

export const useModalShortcuts = ({ onClose }: { onClose: () => void }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    addEventListener("keydown", handleKeyDown);
    return () => removeEventListener("keydown", handleKeyDown);
  }, [onClose]);
};
