import React from "react";
import styled from "styled-components";
import closeIcon from "../assets/type=x.png";

interface ChipProps {
  text: string;
  onClose: () => void;
}

const ChipContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 8px;
  border-radius: 2px;
  border: 0.6px solid #969293;
  gap: 10px;
  font-family: Inter;
  font-size: 11px;
  font-weight: 400;
  text-align: center;
  color: #969293;
  cursor: pointer;
`;

const CloseIcon = styled.img`
  width: 14px;
  height: 14px;
`;

const Chip: React.FC<ChipProps> = ({ text, onClose }) => {
  return (
    <ChipContainer>
      {text}
      <CloseIcon src={closeIcon} alt="close" onClick={onClose} />
    </ChipContainer>
  );
};

export default Chip;
