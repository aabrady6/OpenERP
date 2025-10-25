import React from 'react';
import { Marker, Circle } from 'react-leaflet';
import L from 'leaflet';
import { type Point } from '../../model/point';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Create a default icon
const defaultIcon = new L.Icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Props {
  center: [number, number] | null;
  radius: number;
  points: Point[];
}

const MarkerLayer: React.FC<Props> = ({ center, radius, points }) => {
  if (!center) return null;

  return (
    <>
      {/* User marker + radius */}
      <Marker position={center} icon={defaultIcon} />
      <Circle center={center} radius={radius} pathOptions={{ color: 'blue' }} />

      {/* API points */}
      {points.map((p) => (
        <Marker key={`${p.lat}-${p.lon}`} position={[p.lat, p.lon]} icon={defaultIcon} />
      ))}
    </>
  );
};

export default MarkerLayer;
