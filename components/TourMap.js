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
      
      .leaflet-popup-content-wrapper {
        border-radius: 12px;
        padding: 0 !important;
        overflow: hidden;
      }
      
      .leaflet-popup-content {
        margin: 0 !important;
        font-family: "Aldrich", sans-serif;
      }
      
      .trip-popup {
        padding: 0;
        background: white;
        border-radius: 12px;
        overflow: hidden;
      }
      
      .trip-photo {
        width: 100%;
        height: 150px;
        object-fit: cover;
        display: block;
        margin: 0;
      }
      
      .trip-title {
        margin: 12px 16px 8px 16px;
        font-size: 18px;
        font-weight: bold;
        color: #02334e;
      }
      
      .trip-year {
        margin: 0 16px 12px 16px;
        font-size: 14px;
        color: #666;
        font-weight: bold;
      }
      
      .trip-participants {
        padding: 0 16px 16px 16px;
      }
      
      .trip-participants strong {
        display: block;
        margin-bottom: 8px;
        color: #02334e;
        font-size: 14px;
      }
      
      .participants-list {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      
      .participant-tag {
        background: linear-gradient(135deg, #02334e, #41beaf);
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: normal;
      }
      
      .leaflet-popup-tip {
        background: white;
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
      country: 'Serbia',
      year: 2018,
      participants: ['Max', 'Wilhelm', 'Truls', 'Emil'],
      photo: '/belgrade.png'
    },
    {
      name: 'Budapest',
      position: [47.4979, 19.0402],
      country: 'Hungary',
      year: 2019,
      participants: ['Emil', 'Max', 'Jens', 'Wilhelm', 'Nils', 'Truls', 'Otto', 'Hampus'],
      photo: '/budapest.png'
    },
    {
      name: 'Krakow',
      position: [50.0647, 19.9450],
      country: 'Poland',
      year: 2023,
      participants: ['Wilhelm', 'Jens', 'Otto', 'Kullberg', 'Max', 'Emil', 'Truls'],
      photo: '/krakow.jpg'
    },
    {
      name: 'Bratislava',
      position: [48.1486, 17.1077],
      country: 'Slovakia',
      year: 2024,
      participants: ['Wilhelm', 'Jens', 'Otto', 'Kullberg', 'Max', 'Emil', 'Micke', 'Hampus', 'Truls'],
      photo: '/bratislava.jpg'
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
          <Popup maxWidth={320} className="custom-popup">
            <div className="trip-popup">
              <img 
                src={location.photo} 
                alt={`${location.name} trip`}
                className="trip-photo"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200/41beaf/ffffff?text=' + location.name;
                }}
              />
              <h3 className="trip-title">{location.name}, {location.country}</h3>
              <p className="trip-year">Year: {location.year}</p>
              <div className="trip-participants">
                <strong>Participants:</strong>
                <div className="participants-list">
                  {location.participants.map((participant, idx) => (
                    <span key={idx} className="participant-tag">
                      {participant}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TourMap;