import { useState, useMemo } from "react";
import { UserContext } from "../contexts/UserContext";

interface UserContextWrapperProps {
  children: React.ReactNode;
}

export default function UserContextWrapper(
  props: UserContextWrapperProps
): JSX.Element {
  const [userId, setUserId] = useState<number | null>(null);
  const [itemsInStudyList, setItemsInStudyList] = useState<number[]>([]);

  const value = useMemo(
    () => ({ userId, setUserId, itemsInStudyList, setItemsInStudyList }),
    [userId, setUserId, itemsInStudyList, setItemsInStudyList]
  );

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}
