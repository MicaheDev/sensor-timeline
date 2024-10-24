"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import useEventsStore from "../context/store"; // Assuming your events store
import "leaflet/dist/leaflet.css";
import { Event } from "../lib/data";
import MarkerCluster from "../components/MarkerCluster";

export default function Map() {
  const events = useEventsStore((state) => state.events); // Access events from your context

  let markers!: Event[];

  const addMarkers = () => {
    markers = [];

    for (const event of events) {
      markers.push(event);
    }
  };

  addMarkers();

  return (
    <div className="w-full h-full flex justify-center items-center">
      <MapContainer
        className="w-full h-full"
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerCluster markers={markers} addMarkers={addMarkers} />
      </MapContainer>
    </div>
  );
}
