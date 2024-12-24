import { useEffect, useState } from "react";
import KenoAPI from "./KenoAPI";

export default function Stats() {
  useEffect(() => {
    document.title = "Grcki Kino | Statistike brojeva";
  }, []);
  const API = new KenoAPI();
  const numbers = Array.from({ length: 81 }, (_, index) => index != 0 && index);
  const [myNumbers, setMyNumbers] = useState([]); // numbers that user clicks
  const [displayedDraws, setDisplayedDraws] = useState([]);
  const [last50Draws, setLast50Draws] = useState(null);

  const handleAdd = async (number, event) => {
    if (myNumbers.length < 8) {
      if (myNumbers.includes(number)) {
        event.currentTarget.classList.remove("bg-gradient-to-r", "from-gray-900", "to-gray-700");
        const removed = [...myNumbers.filter((item) => item !== number)];
        setMyNumbers([...removed]);
        const newData = API.getTimesDisplayed(last50Draws, removed);
        setDisplayedDraws([...newData]);
        return;
      }
      event.currentTarget.className += " bg-gradient-to-r from-gray-900 to-gray-700";

      const updatedNumbers = [...myNumbers, number];
      setMyNumbers(updatedNumbers);

      if (last50Draws) {
        const winners = API.getTimesDisplayed(last50Draws, updatedNumbers);
        setDisplayedDraws([...winners]);
      }
    }
  };
  useEffect(() => {
    // when the component loads, we get last 50 draws that we will use for these stats, not a state, they dont change.
    API.getLastGames(50).then((json) => {
      if (json) {
        setLast50Draws([...json]);
      }
    });
  }, []);

  return (
    <div className="text-white  w-full h-full font-mont flex flex-col font-kanit">
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
              je izašla <span className="text-red-500 text-center">{displayedDraws.length}</span> puta u zadnjih <span className="text-blue-500 font-bold">50</span> izvlačenja. (POSLEDNJI PRE <span className="font-bold text-blue-600">{displayedDraws.length > 0 ? last50Draws[0].drawId - displayedDraws[0].drawId : "N/A"}</span> KOLA)
            </span>

            {displayedDraws.length > 0 && (
              <span className="text-center uppercase font-bold pt-5">
                U proseku izlazi svakih <span className="text-red-500">{Math.floor(50 / displayedDraws.length)}</span> izvlačenja.
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}