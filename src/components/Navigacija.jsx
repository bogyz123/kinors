import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { data } from "./NavOptions";

export default function Navbar() {
  const nav = useNavigate();
  return (
    <div className="font-kanit backdrop-filter z-50 backdrop-blur-lg bg-opacity-30 flex items-center justify-between p-2 sm:p-4 border-b border-gray-500 bg-gray-900 text-white sticky top-0 left-0 w-full">
      <img src={logo} className="select-none absolute md:w-20 w-16 cursor-pointer" onClick={() => nav("/")} alt="Kino.RS" draggable={false} />
      <div className="flex-grow flex justify-center">
        <div className="flex  text-wrap text-center items-center justify-center space-x-2 sm:space-x-4">
          {data.map((item, index) => (
            <Link to={item.href} key={index} title={item.meta} className="text-sm sm:text-base lg:text-lg hover:underline px-2 sm:px-4 py-1 sm:py-2 rounded-md transition-colors duration-300">
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
