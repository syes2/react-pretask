import React from "react";
import styled from "styled-components";
import backIcon from "../assets/type=back.png";
import searchIcon from "../assets/type=search.png";
import roundxIcon from "../assets/type=roundx.png";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (newQuery: string) => void;
  onSearch: () => void;
  onBack: () => void;
}

const BarContainer = styled.div`
  width: 350px;
  height: 50px;
  padding: 5px 16px 6px;
  display: flex;
  gap: 10px;
  align-items: center;
  position: fixed;
  background-color: white;
`;

const SearchInputContainer = styled.div`
  width: 279px;
  height: 38px;
  background: #f8f7f7;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px;
  position: relative;
`;

const StyledInput = styled.input`
  flex-grow: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: Inter;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
`;

const ClearIcon = styled.img`
  position: absolute;
  right: 10px;
  cursor: pointer;
  width: 14px;
  height: 14px;
`;

const SearchIcon = styled.img`
  cursor: pointer;
  width: 22px;
  height: 22px;
`;

const BackIcon = styled.img`
  cursor: pointer;
  width: 22px;
  height: 22px;
`;

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onSearch,
}) => {
  return (
    <BarContainer>
      <BackIcon src={backIcon} alt="Clear" onClick={() => onSearchChange("")} />

      <SearchInputContainer>
        <StyledInput
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={
            searchQuery ? "" : "네일 키워드와 네일샵을 검색해보세요."
          }
        />
        {searchQuery && (
          <ClearIcon
            src={roundxIcon}
            alt="Clear"
            onClick={() => onSearchChange("")}
          />
        )}
      </SearchInputContainer>

      <SearchIcon src={searchIcon} alt="Search" onClick={onSearch} />
    </BarContainer>
  );
};

export default SearchBar;
