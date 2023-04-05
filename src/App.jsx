
import Navbar from "./components/Navbar/Navbar";
import Jsonformatter from "./pages/JsonFormatter/Jsonformatter";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import style from "./App.module.scss";
function App() {
  return (
    <BrowserRouter>
      <div className={style.app}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Jsonformatter/>}/>
          <Route path="/json" element={<Jsonformatter/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
