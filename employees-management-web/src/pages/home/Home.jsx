import Navbarr from "../../components/Navbarr";
import Employees from "../../components/Employees";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbarr />
      <Employees />
    </div>
  );
};

export default Home;
