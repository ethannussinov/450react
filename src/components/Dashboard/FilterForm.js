import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Select from "react-select";
import { API_ENDPOINTS, METRIC_CATEGORIES, ERROR_MESSAGES, DEFAULTS } from "../../constants/constants";

const FilterForm = ({ onSubmit }) => {
  const [districtMetrics, setDistrictMetrics] = useState([]);
  const [disciplineMetrics, setDisciplineMetrics] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedDistrictMetrics, setSelectedDistrictMetrics] = useState([]);
  const [selectedDisciplineMetrics, setSelectedDisciplineMetrics] = useState([]);
  const [yearRange, setYearRange] = useState(DEFAULTS.YEAR_RANGE);
  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(() => {
    fetch(API_ENDPOINTS.GET_DISTRICT_DATA)
      .then((response) => response.json())
      .then((data) => {
        const knownDisciplineMetrics = METRIC_CATEGORIES.DISCIPLINE_RATE;

        setDistrictOptions(
          data.districts.map((district) => ({
            value: district.county_district_code,
            label: `${district.county_district_code}: ${district.district_name}`,
          }))
        );

        setDistrictMetrics(
          data.metrics
            .filter((metric) => (!knownDisciplineMetrics.includes(metric) && !METRIC_CATEGORIES.DISCIPLINE_NUMBER.includes(metric)))
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
      alert(ERROR_MESSAGES.MULTIPLE_SELECTION);
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
          min={DEFAULTS.YEAR_RANGE[0]}
          max={DEFAULTS.YEAR_RANGE[1]}
          value={yearRange}
          onChange={(value) => setYearRange(value)}
          className="year-range-slider"
          trackStyle={DEFAULTS.SLIDER_STYLE.trackStyle}
          handleStyle={DEFAULTS.SLIDER_STYLE.handleStyle}
          railStyle={DEFAULTS.SLIDER_STYLE.railStyle}
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
