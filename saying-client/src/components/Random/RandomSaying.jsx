import React from "react";

const RandomSaying = ({ author, message }) => {
  return (
    <dl className="random-say">
      <dt>{message}</dt>
      <dd>{author}</dd>
    </dl>
  );
};

export default RandomSaying;
