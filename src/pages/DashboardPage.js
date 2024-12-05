import React, { useState } from "react";
import FilterForm from "../components/Dashboard/FilterForm";
import Graphs from "../components/Dashboard/Graphs";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState([]);
  // const [selectedCounty, setSelectedCounty] = useState(""); // To store the selected county
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilterSubmit = async (filters) => {
    setLoading(true);
    setError(null);
  
    try {
      const query = new URLSearchParams({
        metrics: filters.metrics.join(","),
        start_year: filters.startYear,
        end_year: filters.endYear,
        district_code: filters.districtCodes.join(","),
        urban_rural_status: filters.urbanRuralStatus,
        school_type: filters.schoolType,
      }).toString();
  
      const response = await fetch(`http://127.0.0.1:8080/api/dashboard-data/?${query}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Fetched Data from Backend:", result); // Log API response

      if (result.error) {
        setError(result.error);
      } else {
        setData(result.data); // Pass data as-is to Graphs
        setMetrics(filters.metrics); // Set metrics for filtering
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="container mt-4">
      <h1 className="text-center">Dashboard</h1>

      <FilterForm onSubmit={handleFilterSubmit} />

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Graphs */}
      {!loading && !error && data.length > 0 && <Graphs data={data} metrics={metrics} />}
    </div>
  );
};

export default DashboardPage;
