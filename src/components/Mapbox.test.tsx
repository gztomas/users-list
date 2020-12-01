import { captureException } from "@sentry/browser";
import { render, waitFor } from "@testing-library/react";
import mapboxgl from "mapbox-gl";
import * as React from "react";
import { MAPBOX_ACCESS_TOKEN } from "../constants";
import { useMapbox } from "./Mapbox";

jest.mock("@sentry/browser");
jest.useFakeTimers();

const fetchMock = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        features: [{ bbox: [1, 2, 3, 4], center: [1, 2] }],
      }),
  } as Response)
);

test("useMapbox", async () => {
  window.fetch = fetchMock;

  const Component = () => {
    const ref = useMapbox("London");
    return <div ref={ref}>map here</div>;
  };

  const { container } = render(<Component />);

  expect(fetchMock).not.toHaveBeenCalled();
  expect(mapboxgl.Map).not.toHaveBeenCalledWith();
  expect(mapboxgl.Marker).not.toHaveBeenCalledWith();

  jest.runAllTimers();

  expect(captureException).not.toHaveBeenCalled();
  expect(fetchMock).toHaveBeenCalledWith(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/London.json?access_token=${MAPBOX_ACCESS_TOKEN}`
  );

  // Promises need to be resolved
  await waitFor(() => {
    expect(mapboxgl.Map).toHaveBeenCalledWith(
      expect.objectContaining({
        accessToken: MAPBOX_ACCESS_TOKEN,
        center: [1, 2],
        style: "mapbox://styles/gztomas/cki0qq81t40f619n23yfhor92",
        zoom: 10,
      })
    );
    expect(mapboxgl.Marker).toHaveBeenCalled();
  });

  expect(container).toMatchSnapshot();
});
