import React, { useState, useEffect } from "react";

const FilterForm = ({ onSubmit }) => {
  const [metrics, setMetrics] = useState([]);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [districtCodes, setDistrictCodes] = useState("");
  const [urbanRuralStatus, setUrbanRuralStatus] = useState("");
  const [schoolType, setSchoolType] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);
  const [metricsOptions, setMetricsOptions] = useState([]);
  const [selectedCounty, setSelectedCounty] = useState(""); // To store the selected district's county

  useEffect(() => {
    // Fetch data from the Django backend
    fetch("http://127.0.0.1:8000/api/get_district_data/")
      .then((response) => response.json())
      .then((data) => {
        setDistrictOptions(data.districts);
        setMetricsOptions(data.metrics);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleMetricsChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setMetrics(options);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictCodes = e.target.value.split(",").map((code) => code.trim());
    setDistrictCodes(selectedDistrictCodes);

    // Find the first selected district and set its county name (assuming all selected districts have the same county)
    const selectedDistrict = districtOptions.find((district) =>
      selectedDistrictCodes.includes(district.county_district_code)
    );
    if (selectedDistrict) {
      setSelectedCounty(selectedDistrict.county_name); // Set county name for the selected district
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      metrics: metrics.join(","), // Combine metrics as a comma-separated string
      startYear,
      endYear,
      districtCodes: districtCodes,
      urbanRuralStatus,
      schoolType,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 my-3">
      <div className="col-md-4">
        <label htmlFor="districtCodes" className="form-label">
          Select District Code
        </label>
        <select
          id="districtCodes"
          name="districtCodes"
          className="form-select"
          multiple
          value={districtCodes}
          onChange={handleDistrictChange}
        >
          {districtOptions.map((district) => (
            <option key={district.county_district_code} value={district.county_district_code}>
              {district.county_district_code}: {district.district_name}
            </option>
          ))}
        </select>
        <small className="form-text text-muted">Hold Ctrl (Cmd on Mac) to select multiple.</small>
      </div>

      <div className="col-md-4">
        <label htmlFor="metrics" className="form-label">
          Select Metrics
        </label>
        <select
          id="metrics"
          name="metrics"
          multiple
          className="form-select"
          onChange={handleMetricsChange}
        >
          {metricsOptions.map((metric) => (
            <option key={metric} value={metric}>
              {metric.replace(/_/g, " ").toUpperCase()}
            </option>
          ))}
        </select>
        <small className="form-text text-muted">Hold Ctrl (Cmd on Mac) to select multiple.</small>
      </div>

      <div className="col-md-4">
        <label htmlFor="startYear" className="form-label">
          Start Year
        </label>
        <input
          type="text"
          id="startYear"
          name="startYear"
          className="form-control"
          placeholder="e.g., 2015"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
        />
      </div>

      <div className="col-md-4">
        <label htmlFor="endYear" className="form-label">
          End Year
        </label>
        <input
          type="text"
          id="endYear"
          name="endYear"
          className="form-control"
          placeholder="e.g., 2020"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
        />
      </div>

      <div className="col-md-4">
        <label htmlFor="urbanRuralStatus" className="form-label">
          Urban/Rural Status
        </label>
        <select
          id="urbanRuralStatus"
          name="urbanRuralStatus"
          className="form-select"
          value={urbanRuralStatus}
          onChange={(e) => setUrbanRuralStatus(e.target.value)}
        >
          <option value="">Any</option>
          <option value="Suburban">Suburban</option>
          <option value="Urban">Urban</option>
        </select>
      </div>

      <div className="col-md-4">
        <label htmlFor="schoolType" className="form-label">
          School Type
        </label>
        <select
          id="schoolType"
          name="schoolType"
          className="form-select"
          value={schoolType}
          onChange={(e) => setSchoolType(e.target.value)}
        >
          <option value="">Any</option>
          <option value="public">Public</option>
          <option value="charter">Charter</option>
        </select>
      </div>

      <div className="col-12 text-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>

      {/* Display the selected county info box after submission */}
      {selectedCounty && (
        <div className="col-12 mt-3">
          <div className="alert alert-info">
            <strong>Selected District County:</strong> {selectedCounty}
          </div>
        </div>
      )}
    </form>
  );
};

export default FilterForm;
