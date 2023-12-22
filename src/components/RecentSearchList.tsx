import React from "react";
import styled from "styled-components";
import Chip from "./Chip";

interface RecentSearchProps {
  searches: { query: string; timestamp: string }[];
  onRemove: (index: number) => void;
}

const Container = styled.div`
  margin-left: 16px;
`;

const Title = styled.div`
  font-family: Inter;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const ChipWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const RecentSearchList: React.FC<RecentSearchProps> = ({
  searches,
  onRemove,
}) => {
  return (
    <Container>
      <Title>최근검색어</Title>
      <ChipWrapper>
        {searches.map((search, index) => (
          <Chip
            key={index}
            text={search.query}
            onClose={() => onRemove(index)}
          />
        ))}
      </ChipWrapper>
    </Container>
  );
};

export default RecentSearchList;
