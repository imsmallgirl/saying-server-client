import React, { useState } from "react";
import Header from "../components/Header/Header";
import CreateNew from "../components/mySaying/CreateNew";
import "../css/mySaying.scss";
import { BsPlus } from "react-icons/bs";
import { Link, NavLink, useLocation } from "react-router-dom";
import AddSaying from "./AddSaying";
import SaveSaying from "./SaveSaying";

const MySaying = () => {
  const [isCreate, setIsCreate] = useState(false);

  const onClickCreateNew = () => {
    setIsCreate(true);
  };
  const location = useLocation();

  return (
    <>
      <div className="container">
        <Header />
        <div className="mySaying-wrap">
          <nav>
            <button onClick={onClickCreateNew}>
              <BsPlus fontSize={"24px"} />
              Create New
            </button>
          </nav>
          <div>
            <AddSaying />
          </div>
        </div>
      </div>
      {isCreate && <CreateNew setIsCreate={setIsCreate} />}
    </>
  );
};

export default MySaying;
