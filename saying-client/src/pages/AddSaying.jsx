import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import CurrentSaying from "../components/mySaying/CurrentSaying";
import { authService } from "../database";
import { SayingContext } from "../store/SayingProvider";

const AddSaying = () => {
  const { addSayingData } = useContext(SayingContext);
  const [currentAddSaying, setCurrentAddSaying] = useState([]);

  const getCurrentAddSaying = () => {
    const newData = addSayingData.filter(
      (data) => data.userId === authService.currentUser.uid
    );
    setCurrentAddSaying(newData);
  };

  useEffect(() => getCurrentAddSaying(), [addSayingData]);

  return (
    <div className="add-saying">
      <h2>내가 추가한 명언</h2>
      {currentAddSaying.length <= 0 && <p>추가한 명언이 없습니다.</p>}
      {currentAddSaying.map((saying) => (
        <CurrentSaying
          key={saying.createAt}
          userId={saying.userId}
          dataId={saying.dataId}
          author={saying.author}
          message={saying.message}
          currentAddSaying={saying}
        />
      ))}
    </div>
  );
};

export default AddSaying;
