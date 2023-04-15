
import Navbar from "./components/Navbar/Navbar";
import Jsonformatter from "./pages/JsonFormatter/Jsonformatter";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import style from "./App.module.scss";
import Base64Decode from "./pages/Base64Decode/Base64Decode";
function App() {
  return (
    <BrowserRouter>
      <div className={style.app}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Jsonformatter/>}/>
          <Route path="/json" element={<Jsonformatter/>}/>
          <Route path="/base64" element={<Base64Decode/>} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
