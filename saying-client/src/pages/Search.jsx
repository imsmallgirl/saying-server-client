import React, { useContext, useEffect } from "react";
import Header from "../components/Header/Header";
import MessageSearch from "../components/Search/MessageSearch";
import NameSearch from "../components/Search/NameSearch";
import SearchResult from "../components/Search/SearchResult";
import "../css/search.scss";
import { SayingContext } from "../store/SayingProvider";

const Search = () => {
  const {
    nowSearchTheme,
    setNowSearchTheme,
    setSearchMessageSaying,
    searchMessageSaying,
    searchNameSaying,
    setSearchNameSaying,
    setSearchMessage,
    setSearchName,
    isSearch,
    searchError,
    searchName,
    searchMessage,
  } = useContext(SayingContext);
  const onClickTheme = () => {
    setNowSearchTheme((prev) => !prev);
  };

  useEffect(() => {
    if (nowSearchTheme) {
      setSearchNameSaying([]);
      setSearchName("");
    } else {
      setSearchMessageSaying([]);
      setSearchMessage("");
    }
  }, [nowSearchTheme]);

  return (
    <>
      <div className="container">
        <Header />
        <div className="wrap">
          <button className="search-btn" onClick={onClickTheme}>
            {nowSearchTheme ? "이름 검색" : "명언 검색"}
          </button>
          {nowSearchTheme ? <MessageSearch /> : <NameSearch />}
        </div>
        <div>
          <SearchResult
            sayingData={nowSearchTheme ? searchMessageSaying : searchNameSaying}
            isSearch={isSearch}
            searchError={searchError}
            searchResult={nowSearchTheme ? searchMessage : searchName}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
