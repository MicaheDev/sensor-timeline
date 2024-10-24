/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { Event } from "../lib/data";
import useEventsStore from "../context/store";
import AudioPlayer from "../components/AudioPlayer";

function getStartYearAndEndYear(events: Event[]) {
  if (!events.length) {
    return { startYear: null, endYear: null };
  }

  let startYear = events[0].date.getFullYear();
  let endYear = startYear;

  events.forEach((event) => {
    const actualYear = event.date.getFullYear();
    startYear = Math.min(startYear, actualYear);
    endYear = Math.max(endYear, actualYear);
  });

  return { startYear, endYear };
}

const Timeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const events = useEventsStore((state) => state.events);
  const [currentEvent, setCurrentEvent] = useState<Event>(events[0]);
  const [startYear, setStartYear] = useState(0);
  const [endYear, setEndYear] = useState(0);

  useEffect(() => {
    const years = getStartYearAndEndYear(events);

    if (years.startYear && years.endYear) {
      setStartYear(years.startYear);
      setEndYear(years.endYear);
    }
  }, []);

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  return (
    <main className="w-full h-full">
      <section className="w-full h-full flex flex-col items-center">
        <div className="h-[60%] w-full flex justify-center items-center gap-4">
          <div className="flex justify-center items-center flex-col gap-2">
            <span className="font-neutral-700 font-semibold">
              {currentEvent?.date.toDateString()}
            </span>

            <div className="flex flex-col items-center">
              <h3>Sensor de:</h3>
              <h2 className="font-bold uppercase text-4xl">
                {currentEvent?.name}
              </h2>
            </div>

            <div className="flex flex-col items-center ">
              <h3>Lectura:</h3>
              <h2 className="text-5xl font-bold bg-neutral-100 p-2 rounded-md border">
                {currentEvent?.value} {currentEvent?.symbol}
              </h2>
            </div>

            {currentEvent.audio && (
              <AudioPlayer audioUrl={currentEvent.audio} />
            )}
          </div>
          <div className="flex justify-center items-center">
            {currentEvent.video && (
              <video
                width={400}
                className="aspect-square rounded-lg"
                src={currentEvent.video}
                controls
              />
            )}
          </div>
        </div>
        {/* Placeholder for the rest of the content */}
        <div
          ref={timelineRef}
          className="h-[10%] w-full  relative bg-neutral-100 flex justify-start items-center"
        >
          <div className="w-full flex h-full overflow-hidden overflow-x-auto whitespace-nowrap">
            {years.map((year) => (
              <div key={year} className="min-w-max h-full flex relative">
                <span className="text-xs h-full border-l px-1 inline-flex justify-center absolute left-0 top-0 z-[1]">
                  {year}
                </span>
                {Array(12)
                  .fill(null)
                  .map((_, monthIndex) => (
                    <span
                      key={monthIndex}
                      className="h-1/3 border-r text-xs px-1 relative"
                    >
                      {events
                        .filter(
                          (event) =>
                            event.date.getFullYear() === year &&
                            event.date.getMonth() === monthIndex + 1
                        )
                        .map((filteredEvent, index) => (
                          <div
                            title={filteredEvent.date.toDateString()}
                            key={index}
                            onClick={() => setCurrentEvent(filteredEvent)}
                            className="absolute text-xs border border-black px-2 w-[10px] h-[10px] z-[1] cursor-pointer hover:scale-[1.2] transition-transform"
                            style={{
                              bottom: `-${index * 10}px`,
                              left: `${(monthIndex / 12) * 100}%`,
                              backgroundColor: filteredEvent.color,
                            }}
                          ></div>
                        ))}
                    </span>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Timeline;
