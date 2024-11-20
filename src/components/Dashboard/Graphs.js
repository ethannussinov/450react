import React from "react";
import Plot from "react-plotly.js";

const Graphs = ({ data, metrics }) => {
  if (!data || data.length === 0) {
    return <p className="text-danger">No data available. Adjust your filters and try again.</p>;
  }

  return (
    <div>
      {metrics.map((metric) => {
        const metricData = data.map((entry) => ({
          x: entry.year,
          y: entry[metric] || 0,
          type: "scatter",
          mode: "lines+markers",
          name: metric.replace(/_/g, " ").toUpperCase(),
        }));

        return (
          <div key={metric} className="my-4">
            <Plot
              data={metricData}
              layout={{
                title: `${metric.replace(/_/g, " ").toUpperCase()} Over Time`,
                xaxis: { title: "Year" },
                yaxis: { title: metric.replace(/_/g, " ").toUpperCase() },
              }}
              style={{ width: "100%", height: "500px" }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Graphs;
