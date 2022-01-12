// import axios from "axios";
// import { useState } from "react";
// import { IResource } from "../utils/interfaces";
// import ResourceCard from "./ResourceCard";

const StudyList = (): JSX.Element => {
  // const [studyListResources, setStudyListResources] = useState<IResource[]>([]);
  // const [refetch, setRefetch] = useState<number>(1);

  // const isLoggedIn = !!localStorage.getItem("loggedInUser");

  // useEffect(() => {
  //   const fetchStudyList = async () => {
  //     const loggedInUser = localStorage.getItem("loggedInUser");
  //     const baseUrl = process.env.REACT_APP_API_URL;
  //     try {
  //       const res = await axios.get(
  //         `${baseUrl}/users/${loggedInUser}/study_list`
  //       );
  //       setStudyListResources(res.data.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchStudyList();
  // }, [refetch]);

  return (
    <>
      {isLoggedIn ? (
        studyListResources.map((resource) => {
          return (
            <>
              <div key={resource.id}>
                <ResourceCard
                  resource={resource}
                  setRefetch={setRefetch}
                  isOnStudyList={true}
                />
              </div>
            </>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default StudyList;
