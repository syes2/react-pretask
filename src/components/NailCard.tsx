import React, { useEffect, useState } from "react";
import styled from "styled-components";
import heartIcon from "../assets/type=heart.png";
import filledHeartIcon from "../assets/type=filledheart.png";
import { useRecoilState } from "recoil";
import { LikedListState } from "../recoil/atoms/LikedList";

interface NailCardProps {
  image: string;
  title: string;
  location: string;
  nail_id: string;
  liked: boolean;
}

const CardContainer = styled.div`
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardImage = styled.img`
  height: 163.5px;
  border-radius: 4px;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  justify-content: space-between;
  align-items: center;
`;

const TextsContainer = styled.div`
  display: flex;
  align-items: left;
  flex-direction: column;
  text-align: left;
  margin-top: 4px;
`;

const TitleText = styled.p`
  font-family: Inter;
  font-size: 13px;
  font-weight: 600;
  margin: 0px;
`;

const SubText = styled.p`
  font-family: Inter;
  font-size: 11px;
  font-weight: 400;
  color: #969293;
  margin: 0px;
`;

const HeartIcon = styled.img`
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

const NailCard: React.FC<NailCardProps> = ({
  image,
  title,
  location,
  nail_id,
  liked: initialLiked,
}) => {
  const [LikedList, setLikedList] = useRecoilState(LikedListState);
  const [liked, setLiked] = useState(initialLiked);

  useEffect(() => {
    setLiked(LikedList.includes(nail_id));
  }, [LikedList, nail_id]);

  const handleLikeClick = () => {
    if (liked) {
      setLikedList((prevList) => prevList.filter((id) => id !== nail_id));
    } else {
      setLikedList((prevList) => [...prevList, nail_id]);
    }
    setLiked(!liked);
  };

  return (
    <CardContainer>
      <CardImage src={image} alt="Nail Image" />
      <InfoContainer>
        <TextsContainer>
          <TitleText>{title}</TitleText>
          <SubText>{location}</SubText>
        </TextsContainer>
        <HeartIcon
          src={liked ? filledHeartIcon : heartIcon}
          alt="Heart Icon"
          onClick={handleLikeClick}
        />
      </InfoContainer>
    </CardContainer>
  );
};

export default NailCard;
