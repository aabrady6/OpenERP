import {
  MapContainer,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import { type LatLngExpression } from 'leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { getIntersections } from '../../api/request';
import RadiusSlider from './RadiusSlider';
import LoadingIndicator from '../Utils/Loading';
import MarkerLayer from './MarkerLayer';

const defaultCenter: LatLngExpression = [53.5461, -113.4938];
const defaultZoom = 6;
export const radiusOptions = [50, 100, 500, 1000, 5000, 10000];

const MapClickHandler = ({ onClick }: { onClick: (lat: number, lon: number) => void }) => {
  useMapEvents({
    click(e) {
      console.log('Map clicked at:', e.latlng.lat, e.latlng.lng);
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const Map = () => {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [radius, setRadius] = useState<number>(1000);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!markerPosition) return;

    const fetchItems = async () => {
      setLoading(true);
      try {
        const query = { point: { lat: markerPosition[0], lon: markerPosition[1] }, radius };
        console.log('Fetching items for:', query);
        const result = await getIntersections(query);
        console.log('API result:', result);
        setItems(result.Points || []);
      } catch (err) {
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [markerPosition, radius]);

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <MapContainer center={defaultCenter} zoom={defaultZoom} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onClick={(lat, lon) => setMarkerPosition([lat, lon])} />

        {/* Render all markers and circles via MarkerLayer */}
        <MarkerLayer center={markerPosition} radius={radius} points={items} />
      </MapContainer>

      {markerPosition && <RadiusSlider radius={radius} radiusOptions={radiusOptions} onChange={setRadius} />}
      {loading && <LoadingIndicator />}
    </div>
  );
};

export default Map;
