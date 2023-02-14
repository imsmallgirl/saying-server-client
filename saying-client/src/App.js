import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import MySaying from "./pages/MySaying";
import Search from "./pages/Search";
import SayingProvider from "./store/SayingProvider";
import "../src/css/main.scss";
import "../src/css/common.scss";
import Member from "./pages/Member";
import Join from "./pages/Join";
import AddSaying from "./pages/AddSaying";
import SaveSaying from "./pages/SaveSaying";

function App() {
  return (
    <SayingProvider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mySaying" element={<MySaying />} />
        <Route path="/search" element={<Search />} />
        <Route path="/member" element={<Member />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </SayingProvider>
  );
}

export default App;
