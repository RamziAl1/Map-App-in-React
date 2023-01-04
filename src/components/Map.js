import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Sidebar from "./Sidebar";
import Searchbar from "./Searchbar";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmVhbC1yYW16aSIsImEiOiJjbGNnOHFtenkwb3hlM25xaHFyYjRsMWo5In0.CVi-C6VaMqej3l0iLgVexw";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(35.9106);
  const [lat, setLat] = useState(31.9539);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  function setNewCenter(longitude, latitude) {
    setLat(latitude);
    setLng(longitude);
    map.current.setCenter([longitude, latitude]);
  }

  return (
    <div ref={mapContainer} className="map-container">
      <Sidebar longitude={lng} latitude={lat} zoom={zoom} />
      <Searchbar setNewCenter={setNewCenter} />
    </div>
  );
}

export default Map;
