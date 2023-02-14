import React, { useContext, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SayingContext } from "../../store/SayingProvider";
import { debounce } from "underscore";

const MessageSearch = () => {
  const { setSearchMessage } = useContext(SayingContext);

  const [searchInput, setSearchInput] = useState("");
  const onChange = useMemo(
    () =>
      debounce((e) => {
        setSearchInput(e.target.value);
      }, 200),
    [setSearchInput]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchMessage(searchInput);
  };
  return (
    <>
      <div className="search-header">
        <h1>명언으로 검색해보세요!</h1>
        <form onSubmit={onSubmit}>
          <label>
            <CiSearch />
            <input
              type="text"
              placeholder="명언을 작성해주세요."
              onChange={onChange}
              required
            />
          </label>
        </form>
      </div>
    </>
  );
};

export default MessageSearch;
