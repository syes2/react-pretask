import { atom } from "recoil";

/* 좋아요 목록을 관리하는 데 사용되는 상태 정의  */
export const LikedListState = atom<string[]>({
  key: "LikedListState",
  default: [],
});
