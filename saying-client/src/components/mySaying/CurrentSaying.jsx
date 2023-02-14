import { async } from "@firebase/util";
import axios from "axios";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useContext, useMemo, useState } from "react";
import { BsPencilSquare, BsTrash, BsCheck2Square } from "react-icons/bs";
import { debounce } from "underscore";
import { jinDB } from "../../database";
import { SayingContext } from "../../store/SayingProvider";

const CurrentSaying = ({
  author,
  message,
  userId,
  currentAddSaying,
  dataId,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState(author);
  const [newMessage, setNewMessage] = useState(message);
  const onDeleteClick = async () => {
    const deleteOk = window.confirm("명언을 삭제하시겠습니까?");
    if (deleteOk) {
      try {
        await deleteDoc(doc(jinDB, "addSaying", currentAddSaying.id));
        await axios
          .delete(`/${dataId}`)
          .then((e) => {
            console.log(e.data);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        window.alert("명언 삭제에 실패했습니다.");
        console.log(error);
      }
    }
  };

  const onChangeNewName = useMemo(
    () =>
      debounce((e) => {
        setNewName(e.target.value);
      }, 200),
    []
  );

  const onChangeNewMessage = useMemo(
    () =>
      debounce((e) => {
        setNewMessage(e.target.value);
      }, 200),
    []
  );

  const onEditClick = () => {
    setIsEdit(true);
  };

  const onClickSubmit = async () => {
    try {
      if (newName === "" || newMessage === "") {
        alert("수정할 값을 입력해주세요.");
        return;
      }
      await updateDoc(doc(jinDB, "addSaying", currentAddSaying.id), {
        author: newName,
        message: newMessage,
      });
      await axios
        .put(`${dataId}`, {
          author: newName,
          message: newMessage,
          id: dataId,
        })
        .then(async (e) => {
          console.log(e.data);
        });
    } catch (error) {
      console.log(error);
    }

    setIsEdit(false);
  };

  return (
    <div className="current-saying">
      {isEdit ? (
        <dl>
          <dt>
            <input
              type="text"
              defaultValue={author}
              onChange={onChangeNewName}
            />
          </dt>
          <dd>
            <input
              type="text"
              defaultValue={message}
              onChange={onChangeNewMessage}
            />
          </dd>
        </dl>
      ) : (
        <dl>
          <dt>{author}</dt>
          <dd>{message}</dd>
        </dl>
      )}

      <div className="current-saying-btns">
        {isEdit ? (
          <BsCheck2Square onClick={onClickSubmit} />
        ) : (
          <BsPencilSquare onClick={onEditClick} />
        )}

        <BsTrash onClick={onDeleteClick} />
      </div>
    </div>
  );
};

export default CurrentSaying;
