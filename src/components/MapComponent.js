import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

// Fix para os ícones do Leaflet no React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  position: relative;

  .leaflet-container {
    height: 100%;
    width: 100%;
    border-radius: 15px;
  }

  .leaflet-popup-content-wrapper {
    background: rgba(26, 26, 26, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(74, 144, 226, 0.3);
    border-radius: 10px;
    color: #fff;
  }

  .leaflet-popup-content {
    margin: 15px;
    line-height: 1.6;
  }

  .leaflet-popup-tip {
    background: rgba(26, 26, 26, 0.95);
    border: 1px solid rgba(74, 144, 226, 0.3);
  }

  .leaflet-control-zoom a {
    background: rgba(26, 26, 26, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    backdrop-filter: blur(10px);
  }

  .leaflet-control-zoom a:hover {
    background: rgba(74, 144, 226, 0.8);
    border-color: rgba(74, 144, 226, 0.5);
  }

  .leaflet-control-attribution {
    background: rgba(26, 26, 26, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: rgba(255, 255, 255, 0.7);
  }

  .leaflet-control-attribution a {
    color: #4a90e2;
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const PopupContent = styled.div`
  text-align: center;
  min-width: 200px;
`;

const PopupTitle = styled.h3`
  color: #4a90e2;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const PopupInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.9rem;
`;

const PopupItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    color: #17a2b8;
    margin-right: 0.5rem;
  }
`;

const AccuracyBadge = styled.div`
  background: ${props =>
    props.accuracy < 100
      ? '#28a745'
      : props.accuracy < 1000
      ? '#ffc107'
      : '#dc3545'};
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

// Ícone customizado para localização do usuário
const userLocationIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#28a745" width="30" height="30">
      <circle cx="12" cy="12" r="8" fill="#28a745" stroke="#fff" stroke-width="2"/>
      <circle cx="12" cy="12" r="3" fill="#fff"/>
    </svg>
  `)}`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15],
});

// Ícone customizado para IP
const ipLocationIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4a90e2" width="30" height="30">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#4a90e2" stroke="#fff" stroke-width="1"/>
    </svg>
  `)}`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const MapComponent = ({
  latitude,
  longitude,
  city,
  country,
  ip,
  userLocation = false,
  accuracy = null,
}) => {
  const mapRef = useRef();

  // Validar coordenadas
  const validLat = latitude && !isNaN(latitude) ? parseFloat(latitude) : 0;
  const validLng = longitude && !isNaN(longitude) ? parseFloat(longitude) : 0;

  // Determinar zoom baseado na precisão
  const getZoomLevel = () => {
    if (accuracy) {
      if (accuracy < 100) return 15;
      if (accuracy < 1000) return 13;
      if (accuracy < 5000) return 11;
      return 9;
    }
    return userLocation ? 13 : 10;
  };

  const formatAccuracy = acc => {
    if (!acc) return null;
    if (acc < 1000) return `${Math.round(acc)}m`;
    return `${(acc / 1000).toFixed(1)}km`;
  };

  useEffect(() => {
    // Invalidar o tamanho do mapa após renderização
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 100);
    }
  }, [latitude, longitude]);

  return (
    <MapWrapper>
      <MapContainer
        center={[validLat, validLng]}
        zoom={getZoomLevel()}
        ref={mapRef}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker
          position={[validLat, validLng]}
          icon={userLocation ? userLocationIcon : ipLocationIcon}
        >
          <Popup>
            <PopupContent>
              <PopupTitle>
                {userLocation ? '📍 Sua Localização' : '🌐 Localização do IP'}
              </PopupTitle>

              <PopupInfo>
                <PopupItem>
                  <strong>IP:</strong>
                  <span>{ip}</span>
                </PopupItem>

                {city && city !== '-' && (
                  <PopupItem>
                    <strong>Cidade:</strong>
                    <span>{city}</span>
                  </PopupItem>
                )}

                {country && country !== '-' && (
                  <PopupItem>
                    <strong>País:</strong>
                    <span>{country}</span>
                  </PopupItem>
                )}

                <PopupItem>
                  <strong>Coordenadas:</strong>
                  <span>
                    {validLat.toFixed(6)}, {validLng.toFixed(6)}
                  </span>
                </PopupItem>

                {accuracy && (
                  <AccuracyBadge accuracy={accuracy}>
                    Precisão: ±{formatAccuracy(accuracy)}
                  </AccuracyBadge>
                )}
              </PopupInfo>
            </PopupContent>
          </Popup>
        </Marker>

        {/* Círculo de precisão para localização do usuário */}
        {userLocation && accuracy && (
          <Circle
            center={[validLat, validLng]}
            radius={accuracy}
            pathOptions={{
              color: '#28a745',
              fillColor: '#28a745',
              fillOpacity: 0.1,
              weight: 2,
              opacity: 0.6,
            }}
          />
        )}
      </MapContainer>
    </MapWrapper>
  );
};

export default MapComponent;
