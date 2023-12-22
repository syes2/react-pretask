import React from "react";
import styled from "styled-components";
import hashTag from "../assets/type=hashtag.png";

interface SearchItemProps {
  item: any;
  searchQuery: string;
}

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f8f7f7;
  height: 51px;
  padding: 8px 16px;
`;

const ItemImage = styled.img<{ isShop: boolean }>`
  width: ${(props) => (props.isShop ? "35px" : "20px")};
  height: ${(props) => (props.isShop ? "35px" : "20px")};
  border-radius: ${(props) => (props.isShop ? "50%" : "0")};
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 323px;
  height: 19px;
  padding: 0 10px;
`;

const MainText = styled.span<{ isShop: boolean }>`
  font-family: ${(props) => (props.isShop ? "Inter" : "Pretendard")};
  font-size: 16px;
  font-weight: ${(props) => (props.isShop ? 700 : 400)};
  line-height: 19px;
  text-align: left;
`;

const TypeText = styled.span`
  width: 50px;
  height: 15px;
  font-family: Inter;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: -0.02em;
  text-align: right;
  color: #969293;
`;

const Highlight = styled.span`
  color: #fb786b;
`;

const SearchItem: React.FC<SearchItemProps> = ({ item, searchQuery }) => {
  const isShop = Boolean(item.shop_id);
  const imageSrc = isShop ? item.thumb_image : hashTag;

  const highlightText = (text: string) => {
    text = text.replace("#", "");

    const index = text.toLowerCase().indexOf(searchQuery.toLowerCase());
    if (index !== -1) {
      return (
        <>
          {text.slice(0, index)}
          <Highlight>{text.slice(index, index + searchQuery.length)}</Highlight>
          {text.slice(index + searchQuery.length)}
        </>
      );
    }
    return text;
  };

  return (
    <ItemContainer>
      <ItemImage src={imageSrc} alt="" isShop={isShop} />
      <TextContainer>
        <MainText isShop={isShop}>{highlightText(item.keyword)}</MainText>
        <TypeText>{isShop ? "네일샵" : "해시태그"}</TypeText>
      </TextContainer>
    </ItemContainer>
  );
};

export default SearchItem;
