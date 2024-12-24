import React, { memo } from "react";

const KenoTable = memo(function KenoTable({ drawData, drawId, last, snapshot }) {
  var takenAt = null;
  const date = new Date(snapshot);
  takenAt = date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0");

  return (
    <div className="bg-blue-950 p-3 flex flex-col w-10/12 md:w-1/2 mx-auto rounded-md relative shadow-lg shadow-blue-900 zoom opacity-[20%] scale-[0.9]">
      <code className="text-sm text-center mx-auto">#{drawId}</code>
      {last && <p className="text-center text-xs font-mont select-none text-green-300">POSLEDNJE IZVUČENO</p>}
      <div className="font-normal absolute top-3 right-5 lg:font-bold text-md after:content-[''] after:absolute after:bg-blue-500 after:w-full after:h-[2px] after:left-0 after:bottom-0 after:-rotate-3">{takenAt}</div>
      {drawData && (
        <div className="flex justify-center items-start flex-wrap p-5 gap-3">
          {drawData.map((item, index) => (
            <p key={index} className="text-white select-none rounded-full bg-blue-500 text-center text-lg" style={{ padding: "10px", width: "45px", height: "45px" }}>
              {item}
            </p>
          ))}
        </div>
      )}
    </div>
  );
});

export default KenoTable;
