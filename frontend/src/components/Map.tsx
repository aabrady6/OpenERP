import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents,
} from 'react-leaflet';
import L, { type LatLngExpression } from 'leaflet';
import { useState } from 'react';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const defaultCenter: LatLngExpression = [53.5461, -113.4938]; // Edmonton
const defaultZoom = 6; // Alberta-wide view

const Map = () => {
  const [markerPosition, setMarkerPosition] = useState<LatLngExpression | null>(null);
  const [radius, setRadius] = useState<number>(1000);

  // Handle map clicks to place marker
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition([e.latlng.lat, e.latlng.lng]);
        // LAT AND LON 
        console.log('Selected Location:', e.latlng.lat, e.latlng.lng, 'Selected Radius:', radius);
      },
    });
    return null;
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler />

        {markerPosition && (
          <>
            <Marker position={markerPosition} />
            <Circle center={markerPosition} radius={radius} pathOptions={{ color: 'blue' }} />
          </>
        )}
      </MapContainer>

      {/* Radius Slider */}
      {markerPosition && (
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            background: 'white',
            padding: '10px 15px',
            borderRadius: '8px',
            boxShadow: '0 0 8px rgba(0,0,0,0.2)',
            zIndex: 1000,
          }}
        >
          <label>
            Radius: {radius} meters
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default Map;
