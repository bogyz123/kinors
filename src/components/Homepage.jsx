import { useEffect, useState } from "react";
import KenoTable from "./KinoTabela";
import KenoAPI from "./KenoAPI";

export default function Homepage() {
  const [timeleft, setTimeleft] = useState(0);
  const [drawData, setDrawData] = useState([]);
  const API = new KenoAPI();

  useEffect(() => {
    let interval;

    const fetchTime = () => {
      API.getTimeForNextGame()
        .then((time) => {
          const inSeconds = Math.floor(time / 1000);
          setTimeleft(inSeconds + 15);
        })
        .catch((error) => {
          console.error("Error fetching time for next game:", error);
        });
    };

    const getInitialData = () => {
      API.getLastGames(10)
        .then((res) => {
          setDrawData(res);
          console.log(res);
        })
        .catch((error) => {
          console.error("Error fetching last games:", error);
        });
    };

    getInitialData();
    fetchTime();

    interval = setInterval(() => {
      setTimeleft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          fetchTime();
          getInitialData();
          return 15;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-5 bg-gray-900 text-white h-100 py-5 w-100 border-box font-mont">
      <h1 className="text-center">Poslednja izvlacenja ({timeleft}s)</h1>
      {drawData && drawData.map((draw, index) => draw.winningNumbers?.list && <KenoTable last={index === 1} key={draw.drawId} drawId={draw.drawId} drawData={draw.winningNumbers.list || []} snapshot={draw.drawTime} />)}
    </div>
  );
}
