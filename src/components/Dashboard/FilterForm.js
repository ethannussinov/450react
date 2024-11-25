import React, { useState } from "react";

const FilterForm = ({ onSubmit }) => {
  const [metrics, setMetrics] = useState([]);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [districtCodes, setDistrictCodes] = useState("");
  const [county, setCounty] = useState("");
  const [urbanRuralStatus, setUrbanRuralStatus] = useState("");
  const [schoolType, setSchoolType] = useState("");

  const handleMetricsChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setMetrics(options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      metrics: metrics.join(","), // Combine metrics as a comma-separated string
      startYear,
      endYear,
      districtCodes: districtCodes.split(",").map((code) => code.trim()),
      county,
      urbanRuralStatus,
      schoolType,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 my-3">
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
          <option value="graduation_rate">Graduation Rate</option>
          <option value="act_score_avg">ACT Score Avg</option>
          <option value="student_teacher_ratio">Student-Teacher Ratio</option>
          <option value="free_reduced_lunch_pct">Free Reduced Lunch %</option>
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
        <label htmlFor="districtCodes" className="form-label">
          District Codes
        </label>
        <input
          type="text"
          id="districtCodes"
          name="districtCodes"
          className="form-control"
          placeholder="e.g., 96088, 96089"
          value={districtCodes}
          onChange={(e) => setDistrictCodes(e.target.value)}
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="county" className="form-label">
          County
        </label>
        <input
          type="text"
          id="county"
          name="county"
          className="form-control"
          placeholder="e.g., County Name"
          value={county}
          onChange={(e) => setCounty(e.target.value)}
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
    </form>
  );
};

export default FilterForm;
