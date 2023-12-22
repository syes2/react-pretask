import { atom } from "recoil";

/* 최근 검색어를 관리하는 데 사용되는 상태 정의  */
export const recentSearchesState = atom({ 
  key: "recentSearchesState",
  default: [] as { query: string; timestamp: string }[], // 검색어, 타임스탬프를 포함하는 객체들의 배열
});
