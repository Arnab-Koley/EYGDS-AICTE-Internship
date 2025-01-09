import React, { useEffect, useRef } from "react";

const ViewMap = ({ specificLocation }) => {
  const mapRef = useRef(null);

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

    new window.google.maps.Marker({
      position: initialLocation,
      map: mapInstance,
      draggable: false,
    });
  };

  return (
    <div className="w-full">
      <div ref={mapRef} className="w-full h-96 rounded-lg"></div>
    </div>
  );
};

export default ViewMap;
