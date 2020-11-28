import styled from "@emotion/styled";
import mapboxgl from "mapbox-gl";
import * as React from "react";

const accessToken =
  "pk.eyJ1IjoiZ3p0b21hcyIsImEiOiJja2h6OGZuczkwaXNzMnNsMmw3dnk5bmxzIn0.QO9AD8ynVhAuNnjCKGLzVw";
const mapboxStyle = "mapbox://styles/gztomas/cki0qq81t40f619n23yfhor92";

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
`;

export const useMapbox = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const element = ref.current;
    if (element && !element.children.length) {
      const container = document.createElement("div");
      const { style } = container;
      // These styles are needed inline so mapbox can pick them
      style.position = "absolute";
      style.top = style.right = style.bottom = style.left = "0";
      element.appendChild(container);
      new mapboxgl.Map({ accessToken, container, style: mapboxStyle });
    }
  });
  return ref;
};
