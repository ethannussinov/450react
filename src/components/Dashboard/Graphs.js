import React from "react";
import Plot from "react-plotly.js";

const Graphs = ({ data, metrics }) => {
  if (!metrics || metrics.length === 0) {
    return <p className="text-danger">No metrics selected. Please select at least one metric.</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-danger">No data available. Adjust your filters and try again.</p>;
  }

  // Group data by district and metric
  const groupedData = data.reduce((acc, entry) => {
    const key = `${entry.district_name}_${entry.metric}`;
    if (!acc[key]) {
      acc[key] = { x: [], y: [], name: `${entry.district_name} (${entry.metric.replace(/_/g, " ").toUpperCase()})` };
    }
    acc[key].x.push(entry.year);
    acc[key].y.push(entry.metric_value);
    return acc;
  }, {});

  // Convert grouped data to traces
  const traces = Object.values(groupedData).map((group) => ({
    x: group.x,
    y: group.y,
    type: "scatter",
    mode: "lines+markers",
    name: group.name,
  }));

  return (
    <div>
      <Plot
        data={traces}
        layout={{
          title: "Metrics Over Time",
          xaxis: { title: "Year" },
          yaxis: { title: "Metric Value" },
          showlegend: true,
        }}
        style={{ width: "100%", height: "500px" }}
      />
    </div>
  );
};

export default Graphs;
