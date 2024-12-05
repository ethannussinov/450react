import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "react-select";

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

        setDistrictOptions(
          data.districts.map((district) => ({
            value: district.county_district_code,
            label: `${district.county_district_code}: ${district.district_name}`,
          }))
        );

        setDistrictMetrics(
          data.metrics
            .filter((metric) => !knownDisciplineMetrics.includes(metric))
            .map((metric) => ({ value: metric, label: metric.replace(/_/g, " ").toUpperCase() }))
        );

        setDisciplineMetrics(
          data.metrics
            .filter((metric) => knownDisciplineMetrics.includes(metric))
            .map((metric) => ({ value: metric, label: metric.replace(/_/g, " ").toUpperCase() }))
        );
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
      districtCodes: selectedDistricts.map((district) => district.value),
      metrics: [...selectedDistrictMetrics, ...selectedDisciplineMetrics].map((metric) => metric.value),
      startYear: yearRange[0],
      endYear: yearRange[1],
    };
    console.log("Filters Submitted to DashboardPage:", filters); // Log user filters

    onSubmit(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3 my-3">
      {/* District Selector */}
      <div className="col-md-4">
        <label htmlFor="districts" className="form-label">
          Select Districts
        </label>
        <Select
          id="districts"
          options={districtOptions}
          isMulti
          placeholder="Select Districts"
          value={selectedDistricts}
          onChange={(selectedOptions) => setSelectedDistricts(selectedOptions || [])}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      {/* District Metrics */}
      <div className="col-md-4">
        <label htmlFor="districtMetrics" className="form-label">
          Select District Metrics
        </label>
        <Select
          id="districtMetrics"
          options={districtMetrics}
          isMulti
          placeholder="Select District Metrics"
          value={selectedDistrictMetrics}
          onChange={(selectedOptions) => setSelectedDistrictMetrics(selectedOptions || [])}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      {/* Discipline Metrics */}
      <div className="col-md-4">
        <label htmlFor="disciplineMetrics" className="form-label">
          Select Discipline Metrics
        </label>
        <Select
          id="disciplineMetrics"
          options={disciplineMetrics}
          isMulti
          placeholder="Select Discipline Metrics"
          value={selectedDisciplineMetrics}
          onChange={(selectedOptions) => setSelectedDisciplineMetrics(selectedOptions || [])}
          className="react-select-container"
          classNamePrefix="react-select"
        />
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
          className="year-range-slider"
          trackStyle={[{ backgroundColor: "#007bff" }]}
          handleStyle={[
            { borderColor: "#007bff", backgroundColor: "#fff" },
            { borderColor: "#007bff", backgroundColor: "#fff" },
          ]}
          railStyle={{ backgroundColor: "#ddd" }}
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
