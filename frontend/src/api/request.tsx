import { type Request } from '../model/request';
import { type Response } from '../model/response';

const API_URL = 'http://dummy-url';

export async function getIntersections(query: Request): Promise<Response> {
  const params = new URLSearchParams({
    lat: query.point.lat.toString(),
    lon: query.point.lon.toString(),
    radius: query.radius.toString(),
  });

  const res = await fetch(`${API_URL}/items/search?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error(`Failed to search items: ${res.statusText}`);
  return res.json();
}
