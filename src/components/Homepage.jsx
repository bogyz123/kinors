import { useEffect, useState } from "react";
import KenoAPI from "./KenoAPI";
import KenoTable from "./KinoTabela";
import ParticlesComponent from "./Particles";


export default function Homepage({language}) {
  const [timeleft, setTimeleft] = useState(null);
  const [drawData, setDrawData] = useState([]);
  const API = new KenoAPI();

  useEffect(() => {
    document.title = "Grčki kino | Rezultati | Statistika";
    let interval;
    const fetchTime = () => {
      // this function gets the time until next draw in ms, converts it to seconds and updates the state.
      API.getTimeForNextGame()
        .then((time) => {
          const inSeconds = Math.floor(time / 1000);
          setTimeleft(inSeconds);
        })
        .catch((error) => {
          console.error("Error fetching time for next game: ", error);
        });
    };
   

    const getInitialData = () => {
      API.getLastGames(10)
        .then((res) => {
         if(res) {
          setDrawData([...res]);
         }
        })
        .catch((error) => {
          console.error("Error fetching last games:", error);
        });
    };

    getInitialData();
    fetchTime();

    interval = setInterval(() => {
      setTimeleft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          API.getTimeForNextGame().then((time) => {
            const seconds = Math.floor(time / 1000);
            setTimeleft(seconds);
            setTimeout(() => {
              getInitialData();
            }, 15000);
          });
          return prev;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-5 bg-[rgb(14,11,29)] text-white h-100 py-5 w-100 border-box font-kanit">
      <h1 className="text-center font-semibold">{`${language === "en" ? "LAST DRAWS" : "POSLEDNJA IZVLAČENJA"}`} ({timeleft}s)</h1>
      {drawData && drawData.map((draw, index) => draw.winningNumbers?.list && <KenoTable language={language} last={index === 1} key={draw.drawId} drawId={draw.drawId} drawData={draw.winningNumbers.list || []} snapshot={draw.drawTime} />)}
      <ParticlesComponent id="particles"/>
    </div>
  );
}
