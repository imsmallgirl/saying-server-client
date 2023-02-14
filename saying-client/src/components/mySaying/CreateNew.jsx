import React, { useContext, useMemo, useState } from "react";
import { debounce } from "underscore";
import { SayingContext } from "../../store/SayingProvider";

const CreateNew = ({ setIsCreate }) => {
  const { setPostData } = useContext(SayingContext);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const onClickCancel = () => {
    setIsCreate(false);
  };

  const onChangeName = useMemo(
    () =>
      debounce((e) => {
        setAuthor(e.target.value);
      }, 200),
    []
  );

  const onChangeMessage = useMemo(
    () =>
      debounce((e) => {
        setMessage(e.target.value);
      }, 200),
    []
  );

  const onCreateSubmit = (e) => {
    e.preventDefault();
    setPostData([author, message]);
    setAuthor("");
    setMessage("");
    setIsCreate(false);
  };
  return (
    <div className="create-new-wrap">
      <form className="createNewForm" onSubmit={onCreateSubmit}>
        <h3>명언 등록하기</h3>
        <label>
          이름
          <input onChange={onChangeName} type="text" required />
        </label>
        <label>
          명언 내용
          <textarea onChange={onChangeMessage} type="text" required />
        </label>
        <div className="create-new-btns">
          <button onClick={onClickCancel}>Cancel</button>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateNew;
