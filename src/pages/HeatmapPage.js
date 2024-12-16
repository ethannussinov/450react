import React, { useState } from "react";
import StLouisMap from '../components/StLouisMap';
import 'leaflet/dist/leaflet.css';
import './HeatmapPage.css';
import FilterForm from "../components/Dashboard/FilterForm";
import Graphs from "../components/Dashboard/Graphs";
import { API_ENDPOINTS } from "../constants/constants";

const HeatmapPage = () => {
  const [data, setData] = useState([]); // To store data for the graphs
  const [metrics, setMetrics] = useState([]); // To store selected metrics
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedDistricts, setSelectedDistricts] = useState([]); // For selected district codes

  // This will handle form submission and fetch data
  const handleFilterSubmit = async (filters) => {
    console.log("Filters submitted:", filters); // Log filters received from FilterForm

    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams({
        metrics: filters.metrics.join(","),
        start_year: filters.startYear,
        end_year: filters.endYear,
        district_code: filters.districtCodes.join(","),
      }).toString();

      console.log("Generated query string:", query); // Log the query string

      const response = await fetch(`${API_ENDPOINTS.GET_DASHBOARD_DATA}?${query}`);
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
        setSelectedDistricts(filters.districtCodes); // Update selected districts
        console.log("Selected districts updated:", filters.districtCodes);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message); // Log any errors
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Heatmap</h1>
      <p>View metrics across districts in a geographical map.</p>

      {/* Pass selectedDistricts to StLouisMap */}
      {console.log("Passing selected districts to map:", selectedDistricts)}
      <StLouisMap data={data} metrics={metrics} selectedDistricts={selectedDistricts} />

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
