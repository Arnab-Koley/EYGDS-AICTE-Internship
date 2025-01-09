import React, { useState, useEffect, useRef } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";

const Map = ({ specificLocation, updateSpecificLocation }) => {
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (window.google && window.google.maps) {
      initMap();
    } else {
      console.error("Google Maps JavaScript API not loaded.");
    }
  }, []);

  const initMap = () => {
    const initialLocation = specificLocation || { lat: 28.6139, lng: 77.209 };

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: initialLocation,
      zoom: 10,
    });

    const markerInstance = new window.google.maps.Marker({
      position: initialLocation,
      map: mapInstance,
      draggable: true,
    });

    markerInstance.addListener("dragend", () => {
      const newPosition = markerInstance.getPosition();
      updateSpecificLocation({
        lat: newPosition.lat(),
        lng: newPosition.lng(),
      });
    });

    mapInstance.addListener("click", (event) => {
      const clickedPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      markerInstance.setPosition(clickedPosition);

      updateSpecificLocation(clickedPosition);
    });

    initAutocomplete(mapInstance, markerInstance);

    setMap(mapInstance);
    setMarker(markerInstance);
  };

  const initAutocomplete = (mapInstance, markerInstance) => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInputRef.current,
      {
        types: ["geocode"],
        fields: ["geometry", "name"],
      }
    );

    autocomplete.bindTo("bounds", mapInstance);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.geometry || !place.geometry.location) {
        console.error("No geometry found for the selected place.");
        return;
      }

      const newPosition = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };

      mapInstance.setCenter(newPosition);
      markerInstance.setPosition(newPosition);

      updateSpecificLocation(newPosition);
    });
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          if (map && marker) {
            map.setCenter(currentLocation);
            marker.setPosition(currentLocation);

            updateSpecificLocation(currentLocation);
          }
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          alert(
            "Unable to fetch your current location. Please enable location services."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="w-full">
      <div className="flex md:items-center justify-between mb-5 max-md:flex-col max-md:space-y-2 ">
        <div className="flex items-center space-x-3 border-2 border-gray-300 rounded-lg p-3 shadow-md outline-none">
          <FaSearchLocation size={25} />
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search for a place"
            className="outline-none max-md:w-full"
          />
        </div>
        <button
          onClick={handleUseCurrentLocation}
          className="px-4 py-2 bg-primarycolor space-x-2 text-white rounded-lg shadow-md flex items-center justify-center"
        >
          <FaLocationCrosshairs size={25} />
          <span>Current Location</span>
        </button>
      </div>

      <div ref={mapRef} className="w-full h-96 rounded-lg"></div>
    </div>
  );
};

export default Map;
