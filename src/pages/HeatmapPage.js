import React from "react";
import StLouisMap from '../components/StLouisMap';
import 'leaflet/dist/leaflet.css';
import './HeatmapPage.css';

const HeatmapPage = () => {
  return (
    <div className="container mt-4">
      <h1 className="text-center">Heatmap</h1>
      <p>View metrics across districts in a geographical heatmap.</p>
      <StLouisMap />
    </div>
  );
};

export default HeatmapPage;
