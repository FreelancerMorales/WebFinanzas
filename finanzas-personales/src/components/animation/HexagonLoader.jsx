import { CgBee } from "react-icons/cg";

export default function HexagonLoader({ loadingProgress = 1 }) {
  const rows = 2;
  const columns = 5;

  return (
    <div className="flex flex-col items-center gap-0">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className={`flex gap-0 ${
            rowIndex % 2 !== 0 ? "ml-10" : ""
          } transition-all`}
        >
          {Array.from({ length: columns }).map((_, colIndex) => {
            const delay = (rowIndex * columns + colIndex) * 0.15;
            return (
              <div
                key={colIndex}
                className="w-10 h-10 hexagon bg-yellow-400 animate-pulse"
                style={{
                  animationDelay: `${delay}s`,
                  animationDuration: `${1.5 / loadingProgress}s`,
                }}
              >
              </div>
            );
          })}
        </div>
      ))}
      <div className="px-2 text-2xl">
        <span className="font-semibold inline-block">Loading . . .</span>
            <CgBee className="inline-block animate-bounce rotate-90 text-yellow-400 text-3xl"/>
      </div>
    </div>
  );
}