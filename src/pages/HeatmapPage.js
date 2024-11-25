import React, { useState, useEffect } from "react";
import StLouisMap from '../components/StLouisMap';
import 'leaflet/dist/leaflet.css';
import './HeatmapPage.css';
import FilterForm from "../components/Dashboard/FilterForm";
import Graphs from "../components/Dashboard/Graphs";

const HeatmapPage = () => {
  const [metrics, setMetrics] = useState([]); // To store selected metrics
  const [selectedCounty, setSelectedCounty] = useState(""); // For storing selected county
  const [pinnedInfoBoxes, setPinnedInfoBoxes] = useState([]); // Array of pinned info boxes
  const [latestData, setLatestData] = useState(null); // To hold the latest data for pinning

  // This will handle form submission and pin the info box
  const handleFilterSubmit = async (filters) => {
    try {
      // Update county and fetch the district data
      setSelectedCounty(filters.county);

      const query = new URLSearchParams({
        metrics: filters.metrics,
        start_year: filters.startYear,
        end_year: filters.endYear,
        district_code: filters.districtCodes.join(","),
      }).toString();

      console.log(`http://127.0.0.1:8000/api/dashboard-data/?${query}`);
      const response = await fetch(`http://127.0.0.1:8000/api/dashboard-data/?${query}`);
      const result = await response.json();

      if (result.error) {
        alert(result.error);
      } else {
        // Update metrics when the filters are applied
        setMetrics(filters.metrics.split(","));

        // After receiving data, store the result for pinning
        console.log("fetched result:", result); // Debugging log to see the district data
        setLatestData({
          metadata: result.metadata,
          data: result.data,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Pin a new info box for the selected district after data and metrics are updated
  useEffect(() => {
    if (latestData && metrics.length > 0) {
      const { metadata, data } = latestData;
      pinInfoBox(metadata, data);
    }
  }, [latestData, metrics]); // Trigger effect when latestData or metrics change

  // Pin the info box
  const pinInfoBox = (metadata, data) => {
    console.log("Pinning district metadata:", metadata); // Debugging log to see the district data
    setPinnedInfoBoxes((prevState) => [
      ...prevState,
      {
        districtName: metadata.district_name,
        districtCode: metadata.county_district_code,
        countyName: metadata.county_name,
        urbanRuralStatus: metadata.urban_rural_status,
        schoolType: metadata.school_type,
        data: data, // Store the specific data for this info box
        metrics: metrics, // Store the selected metrics for this info box
      },
    ]);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Heatmap</h1>
      <p>View metrics across districts in a geographical heatmap.</p>
      <StLouisMap />

      {/* Filter Form for user input */}
      <FilterForm onSubmit={handleFilterSubmit} />

      {/* Show selected county name */}
      {selectedCounty && (
        <div className="alert alert-info mt-3">
          <strong>Selected County:</strong> {selectedCounty}
        </div>
      )}

      {/* Render pinned info boxes */}
      {pinnedInfoBoxes.length > 0 && (
        <div className="pinned-info-boxes">
          {pinnedInfoBoxes.map((infoBox, index) => (
            <div className="pinned-info-box" key={index}>
              <div className="info-box-header">
                <h5>{infoBox.districtName} ({infoBox.districtCode})</h5>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setPinnedInfoBoxes(pinnedInfoBoxes.filter((_, i) => i !== index));
                  }}
                >
                  Unpin
                </button>
              </div>
              <div className="info-box-details">
                <p><strong>County:</strong> {infoBox.countyName}</p>
                <p><strong>Urban/Rural Status:</strong> {infoBox.urbanRuralStatus}</p>
                <p><strong>School Type:</strong> {infoBox.schoolType}</p>
              </div>
              {/* Pass the specific data and metrics for this info box */}
              <Graphs data={infoBox.data} metrics={infoBox.metrics} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeatmapPage;
