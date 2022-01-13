import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { IResource } from "../utils/interfaces";
import ResourceCard from "./ResourceCard";

export default function StudyList(): JSX.Element {
  const { userId } = useContext(UserContext);
  const [studyListResources, setStudyListResources] = useState<IResource[]>([]);

  useEffect(() => {
    const fetchStudyList = async () => {
      const baseUrl = process.env.REACT_APP_API_URL;
      try {
        const res = await axios.get(`${baseUrl}/users/${userId}/study_list`);
        setStudyListResources(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStudyList();
  }, [userId]);

  return (
    <>
      {userId ? (
        studyListResources.map((resource) => {
          return (
            <>
              <div key={resource.id}>
                <ResourceCard resource={resource} />
              </div>
            </>
          );
        })
      ) : (
        <>
          <h3>No items in study list</h3>
        </>
      )}
    </>
  );
}
