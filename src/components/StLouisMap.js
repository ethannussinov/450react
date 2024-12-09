import React, { useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import districtData from '../data/stl_districts.json'; // Import the GeoJSON file

const StLouisMap = ({ selectedDistricts = [] }) => {
    const geoJsonLayerRef = useRef(null); // Reference for the GeoJSON layer

    // Memoized function to dynamically style districts
    const styleDistrict = useCallback(
        (district) => {
            const districtCode = district.properties.county_district_code;
            const isSelected = districtCode && selectedDistricts.includes(districtCode.toString());

            return {
                fillColor: isSelected ? "#ff7800" : "#3388ff", // Highlight selected districts
                weight: 2,
                opacity: 1,
                color: "#000",
                fillOpacity: isSelected ? 0.5 : 0.3,
            };
        },
        [selectedDistricts] // Dependencies for memoization
    );

    // Function to handle interactions and tooltips for each district
    const onEachDistrict = (district, layer) => {
        const districtName = district.properties.SCHOOL_DISTRICT;
        const districtCode = district.properties.county_district_code;

        // Check if the district is selected
        const isSelected = districtCode && selectedDistricts.includes(districtCode.toString());

        // Add a title attribute (tooltip) to the district
        layer.bindTooltip(districtName, {
            permanent: isSelected,  // true: visible all the time; false: visible when hover
            direction: "center", // Center it on the district
            className: isSelected ? "district-tooltip-selected" : "district-tooltip", // Optional: add different classes for styling
        });

        // Update tooltip visibility when `selectedDistricts` changes
        layer.on('add', () => {
            const tooltip = layer.getTooltip();
            if (tooltip) {
                tooltip.options.permanent = isSelected; // Update tooltip visibility dynamically
                tooltip.update();
            }
        });
    };

    // Update GeoJSON styles and tooltips when selectedDistricts changes
    useEffect(() => {
        if (geoJsonLayerRef.current) {
            geoJsonLayerRef.current.eachLayer((layer) => {
                const districtCode = layer.feature.properties.county_district_code;
                const isSelected = districtCode && selectedDistricts.includes(districtCode.toString());

                const tooltip = layer.getTooltip();
                if (tooltip) {
                    // Dynamically update tooltip visibility based on selection
                    tooltip.options.permanent = isSelected;
                    tooltip.update();
                }

                // Also update the style of the layer
                layer.setStyle(styleDistrict(layer.feature));
            });
        }
    }, [selectedDistricts, styleDistrict]); // Include styleDistrict in dependencies

    return (
        <div>
            <MapContainer className="map-container" center={[38.6270, -90.1994]} zoom={11}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <GeoJSON
                    data={districtData}
                    style={styleDistrict}
                    onEachFeature={onEachDistrict}
                    ref={(layer) => {
                        geoJsonLayerRef.current = layer; // Store reference to the GeoJSON layer
                    }}
                />
            </MapContainer>
        </div>
    );
};

export default StLouisMap;
