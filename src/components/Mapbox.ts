import styled from "@emotion/styled";
import mapboxgl, { LngLatBoundsLike, LngLatLike } from "mapbox-gl";
import * as React from "react";

const accessToken =
  "pk.eyJ1IjoiZ3p0b21hcyIsImEiOiJja2h6OGZuczkwaXNzMnNsMmw3dnk5bmxzIn0.QO9AD8ynVhAuNnjCKGLzVw";
const mapboxStyle = "mapbox://styles/gztomas/cki0qq81t40f619n23yfhor92";

export const geocode = async (query: string) => {
  const uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}`;
  const result = await fetch(uri);
  const json = (await result.json()) as {
    features: ({ bbox: LngLatBoundsLike; center: LngLatLike } | undefined)[];
  };
  return json;
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

export const useMapbox = (query: string | null) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const mapboxRef = React.useRef<mapboxgl.Map>();

  React.useEffect(() => {
    const element = ref.current;
    if (element && !element.children.length) {
      const container = document.createElement("div");
      const { style } = container;
      // These styles are needed inline so mapbox can pick them
      style.position = "absolute";
      style.top = style.right = style.bottom = style.left = "0";
      element.appendChild(container);
      mapboxRef.current = new mapboxgl.Map({
        accessToken,
        container,
        style: mapboxStyle,
      });
    }
  });

  React.useEffect(() => {
    const locate = async () => {
      if (!query) return;
      const location = (await geocode(query)).features[0];
      if (location) {
        mapboxRef.current?.setCenter(location.center);
        mapboxRef.current?.setMaxBounds(location.bbox);
      }
    };
    const timeout = setTimeout(() => void locate(), 500);
    return () => clearTimeout(timeout);
  }, [query]);

  return ref;
};
