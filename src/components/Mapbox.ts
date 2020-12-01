import styled from "@emotion/styled";
import { captureException } from "@sentry/browser";
import mapboxgl, { LngLatBoundsLike, LngLatLike } from "mapbox-gl";
import * as React from "react";
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE } from "../constants";

/**
 * Given an address string, return the geocode provided by mapbox API
 */
export const geocode = async (query: string) => {
  const uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;
  const result = await fetch(uri);
  return (await result.json()) as {
    features: ({ bbox: LngLatBoundsLike; center: LngLatLike } | undefined)[];
  };
};

export const Mapbox = styled.div`
  border-radius: 8px;
  /* 
   * This specific color is not part of the theme but matches mapbox loading
   * color
   */
  background-color: #ece1cb;
  flex: 1;
  overflow: hidden;
  position: relative;

  canvas {
    outline: none;
  }
  .mapboxgl-ctrl-attrib {
    display: none;
  }
`;

/**
 * Provides an html ref under which a mapbox map will be created. A marker will
 * be added to that map depending on the address provided in query
 * @param query
 */
export const useMapbox = (query: string | null) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const mapboxRef = React.useRef<mapboxgl.Map>();
  const markerRef = React.useRef<mapboxgl.Marker>();

  React.useEffect(() => {
    const update = async () => {
      try {
        if (!query) return;
        const location = (await geocode(query)).features[0];
        if (location) {
          const element = ref.current;
          if (element && !element.children.length) {
            const container = document.createElement("div");
            const { style } = container;
            // These styles are needed inline so mapbox can pick them
            style.position = "absolute";
            style.top = style.right = style.bottom = style.left = "0";
            element.appendChild(container);
            mapboxRef.current = new mapboxgl.Map({
              accessToken: MAPBOX_ACCESS_TOKEN,
              container,
              style: MAPBOX_STYLE,
              center: location.center,
              zoom: 10,
            });
            markerRef.current = new mapboxgl.Marker()
              .setLngLat(location.center)
              .addTo(mapboxRef.current);
          }
          mapboxRef.current?.setCenter(location.center);
          markerRef.current?.setLngLat(location.center);
          if (location.bbox) {
            mapboxRef.current?.fitBounds(location.bbox);
          } else {
            mapboxRef.current?.setZoom(13);
          }
        }
      } catch (e) {
        captureException(e, { extra: { query } });
      }
    };

    // Debounce requests to mapbox
    const timeout = setTimeout(() => void update(), 500);
    return () => clearTimeout(timeout);
  }, [query]);

  return ref;
};
