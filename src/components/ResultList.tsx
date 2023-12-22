import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NailCard from "./NailCard";
import { searchNails } from "../services/Api";
import { useRecoilState } from "recoil";
import { LikedListState } from "../recoil/atoms/LikedList";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 10px;
  height: auto;
`;

const ResultList: React.FC<{ query: string }> = ({ query }) => {
  const [nailsData, setNailsData] = useState([]);
  const [isLiked] = useRecoilState(LikedListState);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await searchNails(query, 10);
        setNailsData(result.data.nails);
      } catch (error) {
        console.error("Failed", error);
      }
    }

    fetchData();
  }, [query]);

  return (
    <OuterContainer>
      <GridContainer>
        {nailsData.map((nail: any) => (
          <NailCard
            key={nail.nail_id}
            image={nail.thumb_image}
            title={nail.shop.name}
            location={nail.shop.location}
            nail_id={nail.nail_id}
            liked={isLiked.includes(nail.nail_id)}
          />
        ))}
      </GridContainer>
    </OuterContainer>
  );
};

export default ResultList;
