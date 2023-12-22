import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import SearchList from "../components/SearchList";
import RecentSearchList from "../components/RecentSearchList";
import ResultList from "../components/ResultList";
import { useRecoilState } from "recoil";
import { recentSearchesState } from "../recoil/atoms/RecentSearchState";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: scroll;
  display: flex;
  padding-top: 65px;
`;

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useRecoilState(recentSearchesState);

  /* 검색할때 해당 검색어를 최근 검색어 목록에 추가하고 업데이트.
  10분 이내의 유효한 검색어를 필터링한 다음, 최근 검색어를 타임 스탬프와 함께 저장함.
  30개까지 유효*/
  const handleSearch = () => {
    setIsSearching(true);
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const validSearches = recentSearches.filter(
      (search) => search.timestamp > tenMinutesAgo
    );
    const updatedSearches = [
      { query: searchQuery, timestamp: new Date().toISOString() },
      ...validSearches,
    ].slice(0, 30);
    setRecentSearches(updatedSearches); // 변경된 최근 검색어 상태를 업데이트
  };

  /*  */
  const handleRemoveRecentSearch = (index: number) => {
    const updatedSearches = [...recentSearches];
    updatedSearches.splice(index, 1);
    setRecentSearches(updatedSearches); // 변경된 최근 검색어 상태를 업데이트
  };

  return (
    <Container>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setIsSearching(false);
          setSearchQuery(query);
        }}
        onSearch={handleSearch}
        onBack={() => window.history.back()}
      />

      <Content>
        {isSearching ? ( // 검색한 경우
          <ResultList query={searchQuery} />
        ) : searchQuery ? ( // 검색어가 있는 경우
          <SearchList query={searchQuery} />
        ) : ( // 그 외
          <RecentSearchList
            searches={recentSearches}
            onRemove={handleRemoveRecentSearch}
          />
        )}
      </Content>
    </Container>
  );
};

export default Home;

