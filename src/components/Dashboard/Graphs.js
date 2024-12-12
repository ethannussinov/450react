import React from "react";
import Plot from "react-plotly.js";
import { METRIC_CATEGORIES } from "../../constants/constants";

const Graphs = ({ data, metrics }) => {
  console.log("Data Received by Graphs Component:", data); // Log raw data passed to graphs
  console.log("Metrics Selected for Graph:", metrics);
  if (!metrics || metrics.length === 0) {
    return <p className="text-danger">No metrics selected. Please select at least one metric.</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-danger">No data available. Adjust your filters and try again.</p>;
  }

  // Check if selected metrics include demographics and a discipline metric
  const demographicMetrics = METRIC_CATEGORIES.DEMOGRAPHICS;
  const disciplineMetrics = METRIC_CATEGORIES.DISCIPLINE;

  const selectedDemographics = metrics.filter((metric) => demographicMetrics.includes(metric));
  const selectedDisciplines = metrics.filter((metric) => disciplineMetrics.includes(metric));

  // Intersection Graph: Only proceed if exactly two demographics and one discipline metric are selected
  if (selectedDemographics.length === 2 && selectedDisciplines.length === 1) {
    const [xMetric, yMetric] = selectedDemographics;
    const zMetric = selectedDisciplines[0];

    // Prepare data for the scatter plot
    const plotData = data.map((entry) => ({
      x: entry[xMetric] || 0,
      y: entry[yMetric] || 0,
      z: entry[zMetric] || 0,
      district: entry.district_name || "Unknown District",
    }));

    return (
      <div className="my-4">
        <Plot
          data={[
            {
              x: plotData.map((item) => item.x),
              y: plotData.map((item) => item.y),
              text: plotData.map((item) => `${item.district}<br>${zMetric}: ${item.z}`),
              mode: "markers",
              marker: {
                size: plotData.map((item) => Math.sqrt(item.z) * 5), // Adjust marker size based on Z metric
                color: plotData.map((item) => item.z), // Color by Z metric
                colorscale: "Viridis",
                showscale: true,
              },
              type: "scatter",
            },
          ]}
          layout={{
            title: `${xMetric.replace(/_/g, " ").toUpperCase()} vs. ${yMetric
              .replace(/_/g, " ")
              .toUpperCase()} with ${zMetric.replace(/_/g, " ").toUpperCase()}`,
            xaxis: { title: xMetric.replace(/_/g, " ").toUpperCase() },
            yaxis: { title: yMetric.replace(/_/g, " ").toUpperCase() },
            height: 600,
          }}
        />
      </div>
    );
  }

  return (
    <div>
      {metrics.map((metric) => {
        // Filter data for the current metric
        const filteredData = data.filter((entry) => entry.metric === metric);

        // Aggregate data by district
        const districtData = filteredData.reduce((acc, entry) => {
          const district = entry.district_name || "Unknown District";
          if (!acc[district]) {
            acc[district] = { x: [], y: [] };
          }
          acc[district].x.push(entry.year);
          acc[district].y.push(entry.metric_value);
          return acc;
        }, {});

        // Prepare traces for each district
        const traces = Object.entries(districtData).map(([district, values]) => ({
          x: values.x,
          y: values.y,
          type: "scatter",
          mode: "lines+markers",
          name: district,
        }));

        return (
          <div key={metric} className="my-4">
            <Plot
              data={traces}
              layout={{
                title: `${metric.replace(/_/g, " ").toUpperCase()} Over Time`,
                xaxis: { title: "Year" },
                yaxis: { title: metric.replace(/_/g, " ").toUpperCase() },
              }}
            />
          </div>
        );
      })}
    </div>
  );

};

export default Graphs;
