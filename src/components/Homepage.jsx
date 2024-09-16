import { useEffect, useState } from "react";
import KenoAPI from "./KenoAPI";
import KenoTable from "./KinoTabela";

export default function Homepage() {
  const API = new KenoAPI();
  const [latest, setLatest] = useState(null);
  const [timeleft, setTimeleft] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await API.getLastGames("15");
        setLatest([...res]);
      } catch (error) {
        console.error("Failed to fetch latest games", error);
      }
    };

    const getTimeLeft = async () => {
      try {
        const time = await API.getTimeForNextGame();
        if (time) {
          setTimeleft(time / 1000);
        }
      } catch (error) {
        console.error("Failed to fetch time left", error);
      }
    };

    getTimeLeft();
    getData();

    const interval = setInterval(() => {
      setTimeleft((prevTimeLeft) => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          setTimeleft(307);
          getData();
          return 307;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col space-y-5 bg-gray-900 text-white h-100 py-5 w-100 border-box">
      <h2 className="text-center text-2xl">Poslednja izvlacenja ({Math.floor(timeleft)}s)</h2>
      {latest ? (
        latest.map(
          (game, index) =>
            game.winningNumbers && (
              <div key={index} className="text-red-500 box-border">
                {index === 1 ? <KenoTable snapshot={game.drawTime} drawData={game.winningNumbers.list} drawId={game.drawId} last /> : <KenoTable snapshot={game.drawTime} drawData={game.winningNumbers.list} drawId={game.drawId} />}
              </div>
            )
        )
      ) : (
        <div className="w-screen h-screen flex justify-center items-center">
          <p className="text-center uppercase text-white">Ucitavanje...</p>
        </div>
      )}
    </div>
  );
}
