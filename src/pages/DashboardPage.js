import React, { useState } from "react";
import FilterForm from "../components/Dashboard/FilterForm";
import Graphs from "../components/Dashboard/Graphs";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState([]);

  const handleFilterSubmit = async (filters) => {
    try {
      const response = await fetch(
        `/api/dashboard-data/?metrics=${filters.metrics}&start_year=${filters.startYear}&end_year=${filters.endYear}&district_code=${filters.districtCodes.join(",")}`
      );
      const result = await response.json();
      if (result.error) {
        alert(result.error);
      } else {
        setData(result.data);
        setMetrics(filters.metrics.split(","));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Dashboard</h1>
      <FilterForm onSubmit={handleFilterSubmit} />
      <Graphs data={data} metrics={metrics} />
    </div>
  );
};

export default DashboardPage;
