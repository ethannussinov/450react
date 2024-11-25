import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import districtData from '../data/stl_districts.json';  // Import the GeoJSON file

const StLouisMap = () => {
    const [activeDistrict, setActiveDistrict] = useState(null);

    // This function will handle interactions for each district (hover, click)
    const onEachDistrict = (district, layer) => {
        const districtName = district.properties.SCHOOL_DISTRICT;

        layer.on({
            click: () => {
                setActiveDistrict(districtName);
            }
        });
    };

    return (
        <div>
            <MapContainer className="map-container" center={[38.6270, -90.1994]} zoom={11}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                {/* Load the GeoJSON data into the map */}
                <GeoJSON data={districtData} onEachFeature={onEachDistrict} />
            </MapContainer>

            {/* Display the clicked district's name */}
            {activeDistrict && <div className="info-box">District: {activeDistrict}</div>}
        </div>
    );
};

export default StLouisMap;
