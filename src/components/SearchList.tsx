import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchItem from "./SearchItem";
import { searchRecommendList } from "../services/Api";
import debounce from "lodash/debounce";

interface SearchListProps {
  query: string;
}

interface SearchItem {
  shop_id: string | null;
  thumb_image: string | null;
  keyword: string;
}

interface SearchResult {
  shops: SearchItem[];
  hashtags: SearchItem[];
}

const ScrollableContainer = styled.div`
  overflow-y: scroll;
`;

const DEBOUNCE_DELAY = 300;

const SearchList: React.FC<SearchListProps> = ({ query }) => {
  const [items, setItems] = useState<any[]>([]);

  const fetchItems = () => {
    if (query) {
      searchRecommendList(query)
        .then((results: SearchResult) => {
          const filteredShops = results.shops
            .filter((shop) => shop.keyword.includes(query))
            .slice(0, 3);
          const filteredHashtags = results.hashtags
            .filter((tag) => tag.keyword.includes(query))
            .slice(0, 3);

          setItems([...filteredShops, ...filteredHashtags]);
        })
        .catch((error) => {
          console.error("Failed:", error);
        });
    }
  };

  const debouncedFetchItems = debounce(fetchItems, DEBOUNCE_DELAY);

  useEffect(() => {
    debouncedFetchItems();
    return () => {
      debouncedFetchItems.cancel();
    };
  }, [query, debouncedFetchItems]);

  return (
    <ScrollableContainer>
      {items.map((item) => (
        <SearchItem
          key={item.shop_id || item.keyword}
          item={item}
          searchQuery={query}
        />
      ))}
    </ScrollableContainer>
  );
};

export default SearchList;

