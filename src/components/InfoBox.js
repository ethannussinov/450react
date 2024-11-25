import React from 'react';

const InfoBox = ({ district }) => {
    if (!district) return null;

    return (
        <div className="info-box">
            <h4>District Info</h4>
            <p>Name: {district.name}</p>
        </div>
    );
};

export default InfoBox;
