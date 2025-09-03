import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Link from 'next/link';

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
        border-radius: 20px;
        padding: 0 !important;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 32px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .leaflet-popup-content {
        margin: 0 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      }
      
      .trip-popup {
        padding: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
        border-radius: 20px;
        overflow: hidden;
        backdrop-filter: blur(20px);
        position: relative;
      }
      
      .trip-popup::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(26, 26, 46, 0.05) 0%, rgba(22, 33, 62, 0.1) 100%);
        pointer-events: none;
      }
      
      .trip-photo {
        width: 100%;
        height: 180px;
        object-fit: cover;
        display: block;
        margin: 0;
        position: relative;
        z-index: 1;
      }
      
      .trip-title {
        margin: 20px 24px 8px 24px;
        font-size: 22px;
        font-weight: 700;
        background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        position: relative;
        z-index: 2;
        text-align: center;
      }
      
      .trip-year {
        margin: 0 24px 20px 24px;
        font-size: 15px;
        color: #9ca3af;
        font-weight: 500;
        position: relative;
        z-index: 2;
        text-align: center;
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
        background: linear-gradient(135deg, #1a1a2e, #16213e);
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: normal;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .leaflet-popup-tip {
        background: white;
      }
      
      .trip-link {
        display: block;
        background: linear-gradient(135deg, #818cf8 0%, #a78bfa 100%);
        color: #ffffff;
        padding: 14px 24px;
        border-radius: 25px;
        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
        margin: 0 24px 24px 24px;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
        text-align: center;
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.3);
        position: relative;
        z-index: 2;
        backdrop-filter: blur(10px);
      }
      
      .trip-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
        color: white;
        background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
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
      style={{ height: '75vh', minHeight: '500px', width: '100%' }}
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
              <Link href={`/trip/${location.name.toLowerCase()}`} className="trip-link">
                View Trip Details →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default TourMap;