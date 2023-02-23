import { transform } from 'ol/proj';
import { Polyline } from 'ol/format';
import 'ol/ol.css';


export function fillAddress(point) {
  if (point === null) return Promise.resolve('');
  const coordsWGS = transform(point.getCoordinates(), 'EPSG:3857', 'EPSG:4326');
  const URL = `https://nominatim.openstreetmap.org/reverse?format=json&lon=${coordsWGS[0]}&lat=${coordsWGS[1]}`;
  return fetch(URL)
    .then((r) => r.json())
    .then((data) => data.display_name)
    .catch((e) => e.message);
}

export const polyReader = new Polyline();
function parseRoute(routes) {
  if (routes && routes.length > 0) {
    const f = polyReader.readFeature(routes[0].geometry);
    f.getGeometry().transform('EPSG:4326', 'EPSG:3857');
    return f.getGeometry();
  }
  return null;
}

export function buildRoute(start, finish) {
  if (start === null || finish === null) return Promise.resolve(null);
  const startCoords = transform(start.getCoordinates(), 'EPSG:3857', 'EPSG:4326');
  const finishCoords = transform(finish.getCoordinates(), 'EPSG:3857', 'EPSG:4326');

  const URL =
    'https://router.project-osrm.org/route/v1/driving/' +
    `${startCoords[0]},${startCoords[1]};${finishCoords[0]},${finishCoords[1]}`;
  return fetch(URL)
    .then((r) => r.json())
    .then((data) => parseRoute(data.routes));
}
