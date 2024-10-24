import { useEffect } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useMap } from "react-leaflet";
import { Event } from "../lib/data";
import { Marker } from "leaflet";

const markerClusters = L.markerClusterGroup();

type MarkerClusterProps = {
  markers: Event[];
  addMarkers: () => void;
};

function parseText(text: string) {
  // Expresión regular para encontrar espacios y puntos
  const regex = /[\s.]/g;
  // Reemplazar todas las ocurrencias por "_"
  return text.replace(regex, "_").toLowerCase();
}

const MarkerCluster = ({ markers, addMarkers }: MarkerClusterProps) => {
  const map = useMap();

  useEffect(() => {
    markerClusters.clearLayers();
    markers.forEach(
      ({ position, name, date, value, symbol, audio, video }: Event) => {
        const marker = L.marker(new L.LatLng(position.lat, position.lng), {
          icon: new L.DivIcon({
            html: `<div></div>`,
            className: `marker ${parseText(name)}`,
          }),
        }).addTo(markerClusters);

        const popup = L.popup({ className: "popup" }).setContent(`
        <div>
        <p>${date.getDate()}-${date.getMonth()}-${date.getFullYear()}</p>
        <h2>${name}</h2>
        <p>${value} ${symbol}</p>
        ${video ? `<video src="${video}" controls />` : ""}
        ${audio ? `<audio src="${audio}" controls />` : ""}


        `);
        marker.bindPopup(popup); //
        markerClusters.addLayer(marker); // Add marker with popup to the cluster
      }
    );

    // Create popup for each marker with name information

    map.addLayer(markerClusters);
  }, [markers, map]);

  map.on("moveend", () => {
    const start = window.performance.now();

    addMarkers();
    const markersToAdd: Marker<Event[]>[] = [];
    markerClusters.clearLayers();
    markers.forEach(
      ({ position, name, date, value, symbol, audio, video }: Event) => {
        const markerToAdd = L.marker(new L.LatLng(position.lat, position.lng), {
          icon: new L.DivIcon({
            html: `<div></div>`,
            className: `marker ${parseText(name)}`,
          }),
        });

        if (markerToAdd !== undefined) {
          markersToAdd.push(markerToAdd);
        }

        // Create and bind popup for dynamically added markers
        const popup = L.popup({ className: "popup" }).setContent(`
        <div>
        <p>${date.toDateString()}</p>
        <h2>${name}</h2>
        <p>${value} ${symbol}</p>
        ${video ? `<video src="${video}" controls />` : ""}
        ${audio ? `<audio src="${audio}" controls />` : ""}
        `);
        markerToAdd.bindPopup(popup);
      }
    );

    markerClusters.addLayers(markersToAdd);
    const end = window.performance.now();
    console.log(`Time of adding markers and clusters: ${end - start}ms`);
  });

  return null;
};

export default MarkerCluster;
