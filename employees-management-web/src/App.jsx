import { Route, Routes } from "react-router-dom";
import Register from "./pages/signup/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectRouter from "./utils/ProtectRouter";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectRouter />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
