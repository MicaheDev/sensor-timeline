/* eslint-disable react-hooks/exhaustive-deps */

import { sensores } from "../lib/data";
import { useEffect } from "react";
import useEventsStore from "../context/store";

export default function Filters() {
  const { filterByName, setInitialEvents, activeFilters, setActiveFilters } =
    useEventsStore(); // Access state and actions

  function handleCheck(sensorName: string) {
    const newActiveFilters = new Set(activeFilters);
    setInitialEvents();

    if (activeFilters.has(sensorName)) {
      newActiveFilters.delete(sensorName);
    } else {
      newActiveFilters.add(sensorName);
    }

    setActiveFilters(newActiveFilters);
  }

  useEffect(() => {
    setInitialEvents();
    if (!(activeFilters.size === 0)) {
      filterByName(
        Array.from(activeFilters), // Combine filters with OR operator
      );
    }
  }, [activeFilters]); // Dependency on activeFilters

  function disableAll() {
    const newActiveFilters = new Set<string>();

    setActiveFilters(newActiveFilters);
    setInitialEvents();
  }
  return (
    <div className="h-[10%] w-full border-b flex justify-center items-center gap-4 fixed bottom-0 inset-x-0 z-[1000]">
      <div className="inline-flex justify-center items-center gap-1 p-2 rounded-md bg-neutral-100">
        <input
          type="checkbox"
          value="all"
          checked={activeFilters.size <= 0}
          onChange={disableAll}
        />
        <label htmlFor="" className="text-sm">
          Todos
        </label>
      </div>
      {sensores.map((sensor, index) => (
        <div
          key={index}
          className="inline-flex justify-center items-center gap-1 p-2 rounded-md"
          style={{ backgroundColor: sensor.color }}
        >
          <input
            type="checkbox"
            value={sensor.name}
            checked={activeFilters.has(sensor.name)}
            onChange={() => handleCheck(sensor.name)}
          />
          <label htmlFor="" className="text-sm">
            {sensor.name}
          </label>
        </div>
      ))}
    </div>
  );
}
