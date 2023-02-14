import { Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchSay from "./SearchSay";

const SearchResult = ({ sayingData, isSearch, searchError, searchResult }) => {
  const [nowPage, setNowPage] = useState(1);
  const [firstData, setFirstData] = useState([]);

  const LAST_PAGE =
    sayingData.length % 10 === 0
      ? parseInt(sayingData.length / 10)
      : parseInt(sayingData.length / 10) + 1;

  useEffect(() => {
    setFirstData(sayingData);
    if (nowPage === LAST_PAGE) {
      setFirstData(sayingData.slice(10 * (nowPage - 1)));
    } else {
      setFirstData(
        sayingData.slice(10 * (nowPage - 1), 10 * (nowPage - 1) + 10)
      );
    }
  }, [LAST_PAGE, nowPage, sayingData]);

  const handlePage = (e, page) => {
    setNowPage(page);
  };
  return (
    <>
      {isSearch && searchResult.length > 0 && (
        <p className="search-name">
          <span>{searchResult}</span>에 대한 결과에요!
        </p>
      )}

      {isSearch ? (
        <Stack spacing={3}>
          <div className="search-result-div">
            {firstData.map((say) => (
              <SearchSay
                key={say.message}
                author={say.author}
                message={say.message}
              />
            ))}
          </div>
          <Pagination
            sx={{ width: "100%" }}
            count={LAST_PAGE}
            defaultPage={1}
            boundaryCount={2}
            onChange={(e, page) => handlePage(e, page)}
          />
        </Stack>
      ) : (
        searchError
      )}
    </>
  );
};

export default SearchResult;
