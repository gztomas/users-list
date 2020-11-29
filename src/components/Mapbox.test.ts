import { ACCESS_TOKEN, geocode } from "./Mapbox";

const fetchMock = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve({}) } as Response)
);
test("geocode", async () => {
  window.fetch = fetchMock;
  await geocode("query");
  expect(fetchMock).toHaveBeenCalledWith(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/query.json?access_token=${ACCESS_TOKEN}`
  );
});