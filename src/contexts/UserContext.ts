import { createContext } from "react";
export const UserContext = createContext<{
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<number | null>>;
  itemsInStudyList: number[];
  setItemsInStudyList: React.Dispatch<React.SetStateAction<number[]>>;
}>({
  userId: null,
  setUserId: () => {
    /** */
  },
  itemsInStudyList: [],
  setItemsInStudyList: () => {
    /** */
  },
});
