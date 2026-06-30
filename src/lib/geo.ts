/** Equirectangular projection — full canvas used for coordinate math */
export const MAP_WIDTH = 2000;
export const MAP_HEIGHT = 1000;

/**
 * Regional viewBox: Africa, Europe and Asia — China–Europe trade corridor.
 * Approx. lng −20°…142°, lat −30°…70° (no Americas / Australia).
 */
export const MAP_VIEW_X = 889;
export const MAP_VIEW_Y = 111;
export const MAP_VIEW_WIDTH = 901;
export const MAP_VIEW_HEIGHT = 556;
export const MAP_VIEW_BOX = `${MAP_VIEW_X} ${MAP_VIEW_Y} ${MAP_VIEW_WIDTH} ${MAP_VIEW_HEIGHT}`;
export const MAP_ASPECT_RATIO = MAP_VIEW_WIDTH / MAP_VIEW_HEIGHT;

export function projectLngLat(lng: number, lat: number): [number, number] {
  const x = ((lng + 180) / 360) * MAP_WIDTH;
  const y = ((90 - lat) / 180) * MAP_HEIGHT;
  return [x, y];
}

/** Build a viewBox string that frames all supplied lng/lat points with padding */
export function getBoundsViewBox(
  points: [number, number][],
  padding = { lng: 6, lat: 4 },
): string {
  if (points.length === 0) return MAP_VIEW_BOX;

  const lngs = points.map(([lng]) => lng);
  const lats = points.map(([, lat]) => lat);
  const minLng = Math.min(...lngs) - padding.lng;
  const maxLng = Math.max(...lngs) + padding.lng;
  const minLat = Math.min(...lats) - padding.lat;
  const maxLat = Math.max(...lats) + padding.lat;

  const [x1, y1] = projectLngLat(minLng, maxLat);
  const [x2, y2] = projectLngLat(maxLng, minLat);

  return `${x1.toFixed(0)} ${y1.toFixed(0)} ${(x2 - x1).toFixed(0)} ${(y2 - y1).toFixed(0)}`;
}

export function buildRoutePath(waypoints: [number, number][]): string {
  if (waypoints.length === 0) return "";

  const [x0, y0] = projectLngLat(waypoints[0][0], waypoints[0][1]);
  let d = `M ${x0.toFixed(2)} ${y0.toFixed(2)}`;

  for (let i = 1; i < waypoints.length; i++) {
    const [x, y] = projectLngLat(waypoints[i][0], waypoints[i][1]);
    d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }

  return d;
}

type PolygonCoords = number[][][];
type MultiPolygonCoords = number[][][][];

function ringToPath(ring: number[][]): string {
  if (!ring.length) return "";
  const [x0, y0] = projectLngLat(ring[0][0], ring[0][1]);
  let d = `M ${x0.toFixed(2)} ${y0.toFixed(2)}`;
  for (let i = 1; i < ring.length; i++) {
    const [x, y] = projectLngLat(ring[i][0], ring[i][1]);
    d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
  }
  return `${d} Z`;
}

export type PolygonGeometry = {
  type: "Polygon";
  coordinates: number[][][];
};

export type MultiPolygonGeometry = {
  type: "MultiPolygon";
  coordinates: number[][][][];
};

export function geometryToPaths(
  geometry: PolygonGeometry | MultiPolygonGeometry,
): string[] {
  if (geometry.type === "Polygon") {
    return (geometry.coordinates as PolygonCoords).map(ringToPath);
  }

  const paths: string[] = [];
  for (const polygon of geometry.coordinates as MultiPolygonCoords) {
    for (const ring of polygon) {
      paths.push(ringToPath(ring));
    }
  }
  return paths;
}
