import { useState, useEffect } from "react";
import HeatmapCalendar from "./HeatmapCalendar";
import { getHabitHistory } from "../../api/habitHistory";
import { generateYearOptions } from "./heatmapUtils";


const HeatmapSelector = () => {
  const [selectedYear, setSelectedYear] = useState("current");
  const [heatmapData, setHeatmapData] = useState({});
  const options = generateYearOptions();

useEffect(() => {
  const fetchHabitHistory = async () => {
    const data = await getHabitHistory(selectedYear);

    if (!data || data.length === 0) {
      setHeatmapData([]); // empty heatmap
      return;
    }

    setHeatmapData(data);
  };

  fetchHabitHistory();
}, [selectedYear]);
console.log(heatmapData);

  return (
    <div className="flex flex-col justify-end items-center p-4 space-y-6 w-full">
      {/* Dropdown */}
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="border p-2 rounded w-fit self-end"
      >
        <option className="bg-black text-white" value="current">Last 365 Days</option>
        {options.map((y) => (
          <option className="bg-black text-white"  key={y} value={y}>{y}</option>
        ))}
      </select>

      {/* Heatmap */}
      <HeatmapCalendar
        data={heatmapData}
        year={selectedYear}
      />
    </div>
  );
};

export default HeatmapSelector;
