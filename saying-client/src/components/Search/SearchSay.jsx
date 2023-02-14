import React from "react";

const SearchSay = ({ author, message }) => {
  return (
    <dl className="search-say">
      <dt>{author}</dt>
      <dd>{message}</dd>
    </dl>
  );
};

export default SearchSay;
