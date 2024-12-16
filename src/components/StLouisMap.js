import React, { useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import districtData from '../data/stl_districts.json'; // Import the GeoJSON file

const StLouisMap = ({ data, metrics, selectedDistricts = [] }) => {
    const [currentYear, setCurrentYear] = React.useState(1991); // Default year for the slider
    const geoJsonLayerRef = useRef(null); // Reference for the GeoJSON layer
    const isDebug = false;

    // Utility: Get metric value for a district and year
    const getMetricValue = useCallback(
        (districtCode) => {
            if (isDebug) console.log('Fetching Metric Value:', { districtCode, currentYear });

            const districtData = data.find(
                (item) => Number(item.district_code) === Number(districtCode) && Number(item.year) === currentYear
            );
            if (!districtData && isDebug) {
                console.warn('No data found for districtCode:', districtCode, 'year:', currentYear);
            }
            return districtData ? districtData.metric_value : null;
        },
        [data, currentYear, isDebug]
    );

    // Function to calculate color based on metric value
    const getHeatmapColor = useCallback((value, min, max) => {
        if (isDebug) console.log('Color Calculation:', { value, min, max });
        if (value === null || value === undefined) return "#e0e0e0"; // Gray for no data
        const ratio = (value - min) / (max - min);
        return `rgba(${255 - ratio * 255}, ${ratio * 255}, 0, 0.8)`; // Gradient from red to green
    }, [isDebug]);

    // Memoized function to style districts
    const styleDistrict = useCallback(
        (district) => {
            const districtCode = district.properties.county_district_code;
            if (isDebug) console.log('Styling District:', { districtCode, properties: district.properties });
            const metricValue = getMetricValue(districtCode);

            const minValue = Math.min(...data.map((item) => item.metric_value)); // Minimum metric value
            const maxValue = Math.max(...data.map((item) => item.metric_value)); // Maximum metric value

            return {
                fillColor: getHeatmapColor(metricValue, minValue, maxValue),
                weight: 2,
                opacity: 1,
                color: "#000",
                fillOpacity: 0.7,
            };
        },
        [data, getMetricValue, getHeatmapColor, isDebug]
    );

    // Update styles on `selectedDistricts` or `currentYear` change
    useEffect(() => {
        if (geoJsonLayerRef.current) {
            geoJsonLayerRef.current.eachLayer((layer) => {
                layer.setStyle(styleDistrict(layer.feature));
            });
        }
    }, [selectedDistricts, currentYear, styleDistrict]);

    // Function for slider change
    const handleYearChange = (event) => {
        setCurrentYear(parseInt(event.target.value, 10));
    };

    // Function to handle interactions and tooltips for each district
    const onEachDistrict = (district, layer) => {
        const districtName = district.properties.SCHOOL_DISTRICT;
        const districtCode = district.properties.county_district_code;
        if (isDebug) console.log('Interacting with District:', { districtCode, district });

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

    // // Update GeoJSON styles and tooltips when selectedDistricts changes
    // useEffect(() => {
    //     if (geoJsonLayerRef.current) {
    //         geoJsonLayerRef.current.eachLayer((layer) => {
    //             const districtCode = layer.feature.properties.county_district_code;
    //             const isSelected = districtCode && selectedDistricts.includes(districtCode.toString());

    //             const tooltip = layer.getTooltip();
    //             if (tooltip) {
    //                 // Dynamically update tooltip visibility based on selection
    //                 tooltip.options.permanent = isSelected;
    //                 tooltip.update();
    //             }

    //             // Also update the style of the layer
    //             layer.setStyle(styleDistrict(layer.feature));
    //         });
    //     }
    // }, [selectedDistricts, styleDistrict]); // Include styleDistrict in dependencies

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
                        geoJsonLayerRef.current = layer;
                    }}
                />
            </MapContainer>
            <div className="slider-container">
                <label htmlFor="year-slider">Year: {currentYear}</label>
                <input
                    id="year-slider"
                    type="range"
                    min={1991}
                    max={2023}
                    value={currentYear}
                    onChange={handleYearChange}
                    step={1}
                />
            </div>
        </div>
    );
};

export default StLouisMap;
