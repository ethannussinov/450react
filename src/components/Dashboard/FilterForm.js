import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const FilterForm = ({ onSubmit }) => {
  const [districtMetrics, setDistrictMetrics] = useState([]);
  const [disciplineMetrics, setDisciplineMetrics] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedDistrictMetrics, setSelectedDistrictMetrics] = useState([]);
  const [selectedDisciplineMetrics, setSelectedDisciplineMetrics] = useState([]);
  const [yearRange, setYearRange] = useState([1991, 2023]);
  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/get_district_data/")
      .then((response) => response.json())
      .then((data) => {
        const knownDisciplineMetrics = [
          "discipline_incidents_rate",
          "discipline_removal_in_schl_susp_rate",
          "discipline_removal_out_schl_susp_rate",
          "discipline_removal_expulsion_rate",
          "discipline_more_10_days_rate",
        ];

        setDistrictOptions(data.districts);
        setDistrictMetrics(data.metrics.filter((metric) => !knownDisciplineMetrics.includes(metric)));
        setDisciplineMetrics(data.metrics.filter((metric) => knownDisciplineMetrics.includes(metric)));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedDistricts.length > 1 && [...selectedDistrictMetrics, ...selectedDisciplineMetrics].length > 1) {
      alert("You can select multiple districts OR multiple metrics, but not both.");
      return;
    }

    const filters = {
      districtCodes: selectedDistricts,
      metrics: [...selectedDistrictMetrics, ...selectedDisciplineMetrics],
      startYear: yearRange[0],
      endYear: yearRange[1],
    };
    onSubmit(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 my-3">
      {/* District Selector */}
      <div className="col-md-4">
        <label htmlFor="districts" className="form-label">
          Select Districts
        </label>
        <select
          id="districts"
          className="form-select"
          multiple
          value={selectedDistricts}
          onChange={(e) =>
            setSelectedDistricts(Array.from(e.target.selectedOptions, (option) => option.value))
          }
        >
          {districtOptions.map((district) => (
            <option key={district.county_district_code} value={district.county_district_code}>
              {district.county_district_code}: {district.district_name}
            </option>
          ))}
        </select>
      </div>

      {/* District Metrics */}
      <div className="col-md-4">
        <label htmlFor="districtMetrics" className="form-label">
          Select District Metrics
        </label>
        <select
          id="districtMetrics"
          className="form-select"
          multiple
          value={selectedDistrictMetrics}
          onChange={(e) =>
            setSelectedDistrictMetrics(Array.from(e.target.selectedOptions, (option) => option.value))
          }
        >
          {districtMetrics.map((metric) => (
            <option key={metric} value={metric}>
              {metric.replace(/_/g, " ").toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Discipline Metrics */}
      <div className="col-md-4">
        <label htmlFor="disciplineMetrics" className="form-label">
          Select Discipline Metrics
        </label>
        <select
          id="disciplineMetrics"
          className="form-select"
          multiple
          value={selectedDisciplineMetrics}
          onChange={(e) =>
            setSelectedDisciplineMetrics(Array.from(e.target.selectedOptions, (option) => option.value))
          }
        >
          {disciplineMetrics.map((metric) => (
            <option key={metric} value={metric}>
              {metric.replace(/_/g, " ").toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Year Range Slider */}
      <div className="col-md-12">
        <label htmlFor="yearRange" className="form-label">
          Select Year Range: {yearRange[0]} - {yearRange[1]}
        </label>
        <Slider
          range
          min={1991}
          max={2023}
          value={yearRange}
          onChange={(value) => setYearRange(value)}
        />
      </div>

      {/* Submit */}
      <div className="col-12 text-center">
        <button type="submit" className="btn btn-primary">
          Apply Filters
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
