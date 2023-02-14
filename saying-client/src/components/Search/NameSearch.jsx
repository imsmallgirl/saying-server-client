import React, { useContext, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SayingContext } from "../../store/SayingProvider";
import { debounce } from "underscore";

const NameSearch = () => {
  const { setSearchName } = useContext(SayingContext);

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
    setSearchName(searchInput);
  };

  return (
    <>
      <div className="search-header">
        <h1>이름으로 검색해보세요!</h1>
        <form onSubmit={onSubmit}>
          <label>
            <CiSearch />
            <input
              type="text"
              placeholder="이름을 작성해주세요."
              onChange={onChange}
              required
            />
          </label>
        </form>
      </div>
    </>
  );
};

export default NameSearch;
