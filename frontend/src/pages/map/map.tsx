import React from 'react';

const Map: React.FC = () => {
  const mapStyle: React.CSSProperties = {

position: 'absolute',
width: '100%',
height: '100%',
left: '0px',
    top: '0px',
    backgroundImage: 'url(/fighting_town.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

  };

  return (
    <div style={mapStyle}>
        <div className = "snow">
            
        </div>
    </div>
  );
};

export default Map;