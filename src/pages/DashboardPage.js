import React, { useState } from "react";
import FilterForm from "../components/Dashboard/FilterForm";
import Graphs from "../components/Dashboard/Graphs";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState(""); // To store the selected county

  const handleFilterSubmit = async (filters) => {
    try {
      // Update selected county state after filter submission
      setSelectedCounty(filters.county); // Update county after form submission

      const query = new URLSearchParams({
        metrics: filters.metrics,
        start_year: filters.startYear,
        end_year: filters.endYear,
        district_code: filters.districtCodes.join(","), // Send district codes
        urban_rural_status: filters.urbanRuralStatus,
        school_type: filters.schoolType,
      }).toString();

      console.log(`http://127.0.0.1:8000/api/dashboard-data/?${query}`);
      const response = await fetch(`http://127.0.0.1:8000/api/dashboard-data/?${query}`);
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

      {/* Show county name as info box */}
      {selectedCounty && (
        <div className="alert alert-info mt-3">
          <strong>Selected County:</strong> {selectedCounty}
        </div>
      )}

      <Graphs data={data} metrics={metrics} />
    </div>
  );
};

export default DashboardPage;
