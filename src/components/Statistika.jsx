import { useState } from "react";
import KenoAPI from "./KenoAPI";

export default function Stats() {
  const API = new KenoAPI();
  const numbers = Array.from({ length: 81 }, (_, index) => index != 0 && index);
  const [myNumbers, setMyNumbers] = useState([]);
  const [displayedDraws, setDisplayedDraws] = useState([]);
  const [currentDrawId, setCurrentDrawId] = useState(0);
  const handleAdd = async (number, event) => {
    if (myNumbers.length < 8) {
      if (myNumbers.includes(number)) {
        event.currentTarget.classList.remove("bg-gradient-to-r", "from-gray-900", "to-gray-700");
        setMyNumbers((oldArray) => oldArray.filter((num) => num !== number));
        console.log("Y");
        return;
      }
      event.currentTarget.className += " bg-gradient-to-r from-gray-900 to-gray-700";

      const updatedNumbers = [...myNumbers, number];
      setMyNumbers(updatedNumbers);

      const draws = await API.getTimesDisplayed(updatedNumbers, 50);

      setDisplayedDraws(draws);
      const currentDraw = await API.getLastGames(1);
      const drawId = await currentDraw[0].drawId;
      setCurrentDrawId(drawId);
    }
  };

  return (
    <div className="text-white  w-full h-full font-mont flex flex-col ">
      <p className="text-center py-5">Moja kombinacija</p>
      <div className="grid grid-cols-8 grid-flow-row-dense md:grid-cols-8 grid-rows-max  gap-2 p-5 justify-center font-mont">
        {numbers.map(
          (number) =>
            number > 0 && (
              <button onClick={(e) => handleAdd(number, e)} key={number} className="bg-inherit border-b text-white p-2 rounded font-bold hover:bg-gradient-to-r from-gray-900 to-gray-700">
                {number}
              </button>
            )
        )}
      </div>
      <div className=" flex flex-col w-100 font-mont px-5">
        {myNumbers.length > 0 && (
          <>
            <span className="text-center uppercase py-5 font-bold">Moja kombinacija</span>
            <div className="flex gap-2 justify-center p-3">
              {myNumbers.map((num, index) => (
                <p key={num} className="font-bold text-2xl">
                  {num}
                  {index < myNumbers.length - 1 && ","}
                </p>
              ))}
            </div>
            <span className="text-center">
              je izasla <span className="text-red-500 text-center">{displayedDraws.length}</span> puta u zadnjih <span className="text-blue-500 font-bold">50</span> izvlacenja. (POSLEDNJI PRE <span className="font-bold text-blue-600">{currentDrawId && displayedDraws.length > 0 ? currentDrawId - displayedDraws[0].drawId : "N/A"}</span> KOLA)
            </span>

            {displayedDraws.length > 0 && (
              <span className="text-center uppercase font-bold pt-5">
                U proseku izlazi svakih <span className="text-red-500">{Math.floor(50 / displayedDraws.length)}</span> izvlacenja.
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
