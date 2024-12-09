import React, { useState } from "react";
import StLouisMap from '../components/StLouisMap';
import 'leaflet/dist/leaflet.css';
import './HeatmapPage.css';
import FilterForm from "../components/Dashboard/FilterForm";
import Graphs from "../components/Dashboard/Graphs";

const HeatmapPage = () => {
  const [data, setData] = useState([]); // To store data for the graphs
  const [metrics, setMetrics] = useState([]); // To store selected metrics
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // This will handle form submission and fetch data
  const handleFilterSubmit = async (filters) => {
    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams({
        metrics: filters.metrics.join(","),
        start_year: filters.startYear,
        end_year: filters.endYear,
        district_code: filters.districtCodes.join(","),
      }).toString();

      const response = await fetch(`http://127.0.0.1:8080/api/dashboard-data/?${query}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Fetched Data from Backend:", result);

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
      <h1 className="text-center">Heatmap</h1>
      <p>View metrics across districts in a geographical map.</p>

      {/* Map Above the Filter Form */}
      <StLouisMap />

      {/* Filter Form for user input */}
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

export default HeatmapPage;
