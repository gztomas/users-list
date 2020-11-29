import styled from "@emotion/styled";
import * as React from "react";

export const Modal = styled.div`
  align-items: center;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  position: fixed;
`;

export const ModalBackdrop = styled.div`
  animation: fade-in 0.1s ease-in-out;
  background-color: ${({ theme }) => theme.color.bgContrast};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
`;

export const ModalContent = styled.div`
  animation: appear 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.color.bgHaze};
  border-radius: 8px;
  max-width: 95vw;
  min-height: 40rem;
  padding: 4rem;
  position: absolute;
  width: 83rem;
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
