import { Routes, Route } from "react-router-dom";
import HomePage from "./screens/HomePage/HomePage";
import PageNotFound from "./screens/PageNotFound/PageNotFound";
import Register from "./screens/RegisterAndLogin/Register";
import Login from "./screens/RegisterAndLogin/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
