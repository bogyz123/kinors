import { useEffect, useState } from "react";
import translations from "../components/translations";
import KenoAPI from "./KenoAPI";

export default function Stats({language}) {
 

  const numbers = Array.from({ length: 81 }, (_, index) => index != 0 && index);
  //#region states
  const [myNumbers, setMyNumbers] = useState([]); // numbers that user clicks
  const [displayedDraws, setDisplayedDraws] = useState([]);
  const [last50Draws, setLast50Draws] = useState(null);
  const [showHotCold, setShowHotCold] = useState(false);
  const [frequencyObj, setFrequencyObj] = useState(null);
  //#endregion

  useEffect(() => {
    document.title = "Grcki Kino | Statistike brojeva";
  }, []);

  const API = new KenoAPI();


  const handleAdd = async (number, event) => {
    if (myNumbers.length < 10) {
      if (myNumbers.includes(number)) {
        event.currentTarget.classList.remove("bg-gradient-to-r", "from-blue-900", "to-purple-900");
        const removed = [...myNumbers.filter((item) => item !== number)];
        setMyNumbers([...removed]);
        const newData = API.getTimesDisplayed(last50Draws, removed);
        setDisplayedDraws([...newData]);
        return;
      }
      event.currentTarget.classList.add("bg-gradient-to-r", "from-blue-900", "to-purple-950");

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
  const clearNumbers = () => {
    const selectedNumbers = document.querySelectorAll(".bg-gradient-to-r");
    selectedNumbers.forEach((e) => e.classList.remove("bg-gradient-to-r"));
    setMyNumbers([]);
  }
  const handleTemperature = (e) => {
  
    if (e.target.checked) {
      if (!frequencyObj) {
        getNumberFrequency();
      }
      setShowHotCold(true);
    }
    else {
      setShowHotCold(false);
    }
  }
  const getNumberFrequency = () => {

    // Okay, so for this my idea is to create an object of numbers and the key is 1 to 80 and value is being incremented every time we spot the number has been drawn.
    // 1:0
    // 2:5
    // 3:1
    // Then we just sort the numbers descending and for the first 25 numbers they are cold, 25-50 = warmer 50-75 warm 75-100 hot and we memoize function w/ useCallback and voila
   if (frequencyObj === null) {
    const frequency = API.getNumbersFrequency(last50Draws);
   if (frequency) {
    setFrequencyObj(frequency);
   }
   }
  }
  const declareNumberTemperatureByFrequency = (number) => {

    // i love naming functions :D
    if (frequencyObj && number) {
      const freqOfNumber = frequencyObj[number];

     
      if (freqOfNumber <= 10) {
        return "blue";
      }
      else if (freqOfNumber >= 5 && freqOfNumber <= 15) {
        return "yellow";
      }
      else if (freqOfNumber >= 15) {
        return "red";
      }
    }
  }
  

  return (
    <div className="text-white  w-full h-full font-mont flex flex-col font-kanit">
      <p className="text-center py-5">{translations["statistics"].title[language]}</p>
      <div>
        {myNumbers.length > 0 && <button className="mx-auto bg-red-500 flex rounded-md p-2 hover:opacity-80 transition-opacity duration-150" onClick={clearNumbers}>{translations["statistics"].clearButton[language]}</button>}
      </div>
      <div className="grid grid-cols-8 grid-flow-row-dense md:grid-cols-8 grid-rows-max  gap-2 p-5 justify-center font-mont">
        {numbers.map(
          (number) =>
            number > 0 && (
              <button onClick={(e) => handleAdd(number, e)} key={number} style={{color:`${showHotCold ? declareNumberTemperatureByFrequency(number) : 'white'}`}} className={`bg-inherit border-b text-white p-2 rounded font-bold hover:bg-gradient-to-r from-blue-900 to-purple-950`}>
                {number}
              </button>
            )
        )}
      </div>
      <div className="flex w-[90%] mx-auto items-center justify-end">
        <div className="flex gap-2">
        <label htmlFor="enableTemperature">{translations["statistics"].hotCold[language]}</label>
        <input type="checkbox" id="enableTemperature" defaultChecked={false} onChange={(e) => handleTemperature(e)} />
        </div>
      </div>
      <div className="flex flex-col w-100 font-mont px-5">
        {myNumbers.length > 0 && (
          <>
            <span className="text-center uppercase py-5 font-bold">{translations["statistics"].title[language]}</span>
            <div className="flex gap-2 justify-center p-3">
              {myNumbers.map((num, index) => (
                <p key={num} className="font-bold text-2xl ">
                 {num}
                  {index < myNumbers.length - 1 && ","}
                </p>
              ))}
            </div>
            <span className="text-center">
            {translations["statistics"].lastDrawn[language]({times: displayedDraws.length, last: last50Draws[0]?.drawId - displayedDraws[0]?.drawId })}
            </span>

            {displayedDraws.length > 0 && (
              <span className="text-center uppercase font-bold pt-5">
                {translations["statistics"].average[language]({avg: Math.floor(50 / displayedDraws.length)})}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
