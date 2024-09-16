export default function KenoTable({ drawData, drawId, last, snapshot }) {
  var takenAt = null;
  const date = new Date(snapshot);
  takenAt = date.getHours() + ":" + date.getMinutes();

  return (
    <div className="bg-blue-950 p-3 flex flex-col w-10/12 md:w-1/2 mx-auto rounded-md relative">
      <code className="text-sm text-center mx-auto">#{drawId}</code>
      {last && <p className="text-center text-xs font-mont select-none text-green-300">POSLEDNJE IZVUCENO</p>}
      <div className="border-b font-normal absolute top-3 right-5 lg:font-bold text-sm">{takenAt}</div>
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
}
