import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const TourMap = () => {
  const beerIcon = useMemo(() => {
    return L.divIcon({
      html: '🍺',
      className: 'custom-div-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-div-icon {
        background: none !important;
        border: none !important;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const locations = [
    {
      name: 'Belgrade',
      position: [44.8176, 20.4633],
      country: 'Serbia'
    },
    {
      name: 'Budapest',
      position: [47.4979, 19.0402],
      country: 'Hungary'
    },
    {
      name: 'Krakow',
      position: [50.0647, 19.9450],
      country: 'Poland'
    },
    {
      name: 'Bratislava',
      position: [48.1486, 17.1077],
      country: 'Slovakia'
    }
  ];

  const centerPosition = [47.5, 19.0];

  return (
    <MapContainer
      center={centerPosition}
      zoom={6}
      style={{ height: '60vh', minHeight: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker key={index} position={location.position} icon={beerIcon}>
          <Popup>
            <div>
              <strong>{location.name}</strong>
              <br />
              {location.country}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TourMap;