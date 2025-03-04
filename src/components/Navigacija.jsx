import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import sr from "../assets/serbia.png";
import en from "../assets/uk.png";
import translations from "../components/translations";

export default function Navbar({ setLanguage, language }) {
  const nav = useNavigate();
  const handleClick = () => {
    if (language === "sr") {
      setLanguage("en");
      localStorage.setItem("kino-language", "en");
    }
    else {
      setLanguage("sr");
      localStorage.setItem("kino-language", "sr");
    }
  }
  return (
    <div className="font-kanit backdrop-filter z-50 justify-center items-center backdrop-blur-lg bg-opacity-30 flex p-2 sm:p-4 border-b border-gray-500 bg-gray-900 text-white sticky top-0 left-0 w-full">
      <img src={logo} className="select-none left-2 absolute md:w-20 w-16 hidden md:block  cursor-pointer" onClick={() => nav("/")} alt="Kino.RS" draggable={false} />
      <div className="flex-grow flex justify-center">
        <div className="flex text-wrap text-center items-center justify-center space-x-2 sm:space-x-4">
          {translations["navbar"].data.map((item, index) => (
            <Link to={item.href} key={index} title={item.meta[language]} className="text-sm sm:text-base lg:text-lg hover:underline px-2 sm:px-4 py-1 sm:py-2 rounded-md transition-colors duration-300">
              {item.title[language]}
            </Link>
          ))}
        </div>
        <div className="absolute right-2">
          <img src={language === "en" ? en : sr} className="w-6 md:w-8 lg:w-12 cursor-pointer" onClick={handleClick}/>
        </div>
      </div>
    </div>
  );
}
