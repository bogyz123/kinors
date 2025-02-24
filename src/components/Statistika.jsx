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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    amount: 1,
    byFrequency: null,
  });
  const [modalResult, setModalResult] = useState([]);
  //#endregion


  const API = new KenoAPI();

  useEffect(() => {
    // when the component loads, we get last 50 draws that we will use for these stats, not a state, they dont change.
    document.title = "Grcki Kino | Statistike brojeva";
    API.getLastGames(50).then((json) => {
      if (json) {
        setLast50Draws([...json]);
      }
    });
  }, []);
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
  const handleGenerate = () => {
    if (modalData.amount) {
    const data = API.generateRandomCombination(modalData.amount, (modalData.byFrequency) && last50Draws);
    if (data) {
      setModalResult([...data]);
    }
    }
  }
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
  const closeModal = () => {
    setIsModalOpen(false);
    setModalData({amount: null, byFrequency: null});
    setModalResult([]);
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
      <div className="flex mx-auto py-5 flex-col  w-full place-items-center">
      <p>{translations["statistics"].title[language]}</p>
      <button onClick={() => setIsModalOpen(!isModalOpen)} className="bg-blue-900 p-2 rounded-md hover:bg-blue-800 transition-colors duration-300">{language === "sr" ? "Generisati nasumično" : "Generate Random"}</button>
      </div>

      <div className="w-[90%] md:w-auto mx-auto text-center">
        {myNumbers.length > 0 && <button className="mx-auto w-full text-center bg-red-500 rounded-md p-2 hover:opacity-80 transition-opacity duration-150" onClick={clearNumbers}>{translations["statistics"].clearButton[language]}</button>}
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
        <div className="flex gap-2 items-center flex-col">
       <div className="flex place-items-center gap-2">
       <label htmlFor="enableTemperature" className="text-lg font-medium text-gray-900 dark:text-gray-100">
       {translations["statistics"].hotCold[language]}
      </label>
        <input type="checkbox" id="enableTemperature" className="w-4 h-4 md:w-6 md:h-6 accent-red-500 focus:ring focus:ring-blue-950 cursor-pointer"  defaultChecked={false} onChange={(e) => handleTemperature(e)} />
       </div>
        {showHotCold && <div>
          <span className="border-b border-blue-500">🔵 = 0-10/50</span> <span className="border-b border-yellow-500">🟡 = 5-15/50</span> <span className="border-b border-red-500">🔴 = 15+/50</span>
          </div>}
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
      <div>
        {isModalOpen && <div className="bg-blue-900 w-[90%]  mx-auto rounded-md p-4 absolute  transition-transform duration-500 backdrop-blur-md bg-black/50" id="modal">
        <div className="absolute top-2 right-2 cursor-pointer text-xl" onClick={closeModal}>X</div>
        <span className="mx-auto font-kanit text-xl">{translations["statistics"].modal?.title[language]}</span>
        <div className="my-4 flex flex-col">
        <span className="mr-2">{translations["statistics"].modal?.amount[language]}:</span>
        <input 
  type="number" 
  className="w-full max-w-xs px-4 py-2 text-white bg-blue-800 border border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 placeholder-gray-300 shadow-md transition duration-300 ease-in-out appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" 
  defaultValue={1} 
  min="1"
  max="80"
  placeholder="Amount of numbers to generate"
  onChange={(e) => e.target.value && e.target.value > 1 && e.target.value <= 80 && setModalData((prev) => ({...prev, amount: e.target.value}))}
/>
<div className="flex gap-2 place-items-center mt-2">
  <span>{translations["statistics"].modal.byFrequent[language]}</span>
  <input 
  type="checkbox" 
  defaultChecked={false} 
  onChange={(e) => setModalData((prev) => ({...prev, byFrequency: e.target.checked}))}
  className="w-6 h-6 text-blue-500 bg-blue-900 border border-blue-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ease-in-out checked:bg-blue-500 checked:border-blue-500 hover:scale-105 cursor-pointer"
/>

</div>


  {modalResult.length > 0 && <div className="flex bg-blue-800 justify-center mx-auto rounded-md w-full p-4 text-xl md:text-2xl">{modalResult + ""}</div>}

<button className="bg-blue-800 rounded-md p-2 mt-2 hover:bg-blue-700 transition-colors duration-200 ease" onClick={handleGenerate}>Generate</button>



        </div>
        </div>}
      </div>
    </div>
  );
}
