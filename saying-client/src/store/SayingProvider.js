import React, { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { authService, jinDB } from "../database";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const SayingContext = createContext({});

const SayingProvider = ({ children }) => {
  const [todaySaying, setTodaySaying] = useState({
    author: "익명",
    message:
      "가장 어리석은 미신의 하나는, 과학자들이 인간은 신앙이 없이도 살아갈 수 있다고 잘못 믿고 있는 일이다.",
  });
  const [randomSaying, setRandomSaying] = useState([]);
  const [searchName, setSearchName] = useState("기본값");
  const [searchMessage, setSearchMessage] = useState("기본값");
  const [searchNameSaying, setSearchNameSaying] = useState([]);
  const [searchMessageSaying, setSearchMessageSaying] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [nowSearchTheme, setNowSearchTheme] = useState(false);
  const [postData, setPostData] = useState(["", ""]);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  const [addSayingData, setAddSayingData] = useState([]);
  const [userObj, setUserObj] = useState(null);
  const location = useLocation();

  axios.defaults.baseURL = "http://localhost:4000";

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        if (user.displayName === null) {
          const userName = user.email.split("@");
          user.displayName = userName[0];
        }
        setUserObj(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const getRandomSaying = async () => {
    try {
      const randomResponse = await axios.get("/3");
      const randomObj = randomResponse.data;

      setRandomSaying(randomObj);
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchSaying = async () => {
    try {
      if (nowSearchTheme) {
        await axios.get(`/?author=&message=${searchMessage}`).then((e) => {
          setSearchMessageSaying(e.data);
          setIsSearch(true);
          return;
        });

        return;
      } else {
        await axios.get(`/?author=${searchName}&message=`).then((e) => {
          setSearchNameSaying(e.data);
          setIsSearch(true);
          return;
        });

        return;
      }
    } catch (error) {
      setSearchError(error.response.data.error);
      setIsSearch(false);
    }
  };

  // 명언 추가하기
  const postSaying = async () => {
    await axios
      .post("/", {
        author: postData[0],
        message: postData[1],
        id: uuidv4(),
      })
      .then(async (e) => {
        const newAddSaying = {
          author: e.data.author,
          message: e.data.message,
          dataId: e.data.id,
          userId: userObj.uid,
          createAt: Date.now(),
        };
        const docRef = await addDoc(
          collection(jinDB, "addSaying"),
          newAddSaying
        );
      })
      .catch((error) => console.log(error));
  };

  // addSaying 데이터 갖고오기
  const getAddSaying = () => {
    const q = query(
      collection(jinDB, "addSaying"),
      orderBy("createAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const addSayingArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAddSayingData(addSayingArray);
    });
  };

  // 오늘의 명언 가져오기
  const getTodaySaying = async () => {
    await axios.get("/todaySaying").then((e) => setTodaySaying(e.data));
  };

  useEffect(() => {
    if (location.pathname === "/") {
      getRandomSaying();
    }
  }, [location.pathname]);

  useEffect(() => {
    getSearchSaying();
  }, [searchName, searchMessage, nowSearchTheme]);

  useEffect(() => {
    getTodaySaying();
  }, [todaySaying]);

  useEffect(() => {
    postSaying();
  }, [postData]);

  useEffect(() => {
    getAddSaying();
  }, [jinDB]);

  return (
    <SayingContext.Provider
      value={{
        todaySaying,
        randomSaying,
        setSearchName,
        searchName,
        searchNameSaying,
        searchMessageSaying,
        setSearchMessageSaying,
        setSearchNameSaying,
        searchError,
        isSearch,
        setSearchMessage,
        searchMessage,
        setNowSearchTheme,
        nowSearchTheme,
        userObj,
        isLoggedIn,
        setIsLoggedIn,
        setPostData,
        addSayingData,
      }}
    >
      {children}
    </SayingContext.Provider>
  );
};

export default SayingProvider;
