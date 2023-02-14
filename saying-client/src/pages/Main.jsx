import React, { useContext, useEffect } from "react";
import RandomSaying from "../components/Random/RandomSaying";
import { SayingContext } from "../store/SayingProvider";
import "../css/main.scss";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";

const Main = () => {
  const { randomSaying, todaySaying } = useContext(SayingContext);

  return (
    <div className="container">
      <Header />
      <div className="wrap">
        <div className="today-saying">
          <h1>
            <span>오늘의 명언</span>을 확인하세요!
          </h1>
          <dl>
            <dt>{todaySaying.message}</dt>
            <dd>{todaySaying.author}</dd>
          </dl>
        </div>
        <div className="random-saying">
          {randomSaying.map((say) => (
            <RandomSaying
              key={say.message}
              author={say.author}
              message={say.message}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
