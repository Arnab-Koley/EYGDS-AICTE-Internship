
// import React, { useState, useEffect, useRef } from "react";
// import { FaLocationCrosshairs } from "react-icons/fa6";
// import { FaSearchLocation } from "react-icons/fa";

// const Map = ({ specificLocation, updateSpecificLocation }) => {
//   const mapRef = useRef(null); // Reference for the map container
//   const searchInputRef = useRef(null); // Reference for the search input
//   const [map, setMap] = useState(null);
//   const [marker, setMarker] = useState(null);

//   useEffect(() => {
//     if (window.google && window.google.maps) {
//       initMap();
//     } else {
//       console.error("Google Maps JavaScript API not loaded.");
//     }
//   }, []);

//   const initMap = () => {
//     const initialLocation = specificLocation || { lat: 28.6139, lng: 77.209 }; // Default to New Delhi

//     // Initialize map
//     const mapInstance = new window.google.maps.Map(mapRef.current, {
//       center: initialLocation,
//       zoom: 10,
//     });

//     // Initialize marker
//     const markerInstance = new window.google.maps.Marker({
//       position: initialLocation,
//       map: mapInstance,
//       draggable: true,
//     });

//     // Add a listener to the marker for drag events
//     markerInstance.addListener("dragend", () => {
//       const newPosition = markerInstance.getPosition();
//       updateSpecificLocation({
//         lat: newPosition.lat(),
//         lng: newPosition.lng(),
//       });
//     });

//     // Add a click listener to the map
//     mapInstance.addListener("click", (event) => {
//       const clickedPosition = {
//         lat: event.latLng.lat(),
//         lng: event.latLng.lng(),
//       };

//       // Update marker position
//       markerInstance.setPosition(clickedPosition);

//       // Update location
//       updateSpecificLocation(clickedPosition);
//     });

//     // Initialize Places Autocomplete
//     initAutocomplete(mapInstance, markerInstance);

//     setMap(mapInstance);
//     setMarker(markerInstance);
//   };

//   const initAutocomplete = (mapInstance, markerInstance) => {
//     const autocomplete = new window.google.maps.places.Autocomplete(
//       searchInputRef.current,
//       {
//         types: ["geocode"], // Optional: Restrict suggestions to geographical locations
//         fields: ["geometry", "name"], // Fields to fetch
//       }
//     );

//     // Bias the search results towards the current map bounds
//     autocomplete.bindTo("bounds", mapInstance);

//     // When a place is selected from the autocomplete suggestions
//     autocomplete.addListener("place_changed", () => {
//       const place = autocomplete.getPlace();

//       if (!place.geometry || !place.geometry.location) {
//         console.error("No geometry found for the selected place.");
//         return;
//       }

//       const newPosition = {
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       };

//       // Update marker and map position
//       mapInstance.setCenter(newPosition);
//       markerInstance.setPosition(newPosition);

//       // Save the updated position
//       updateSpecificLocation(newPosition);
//     });
//   };

//   const handleUseCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const currentLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };

//           if (map && marker) {
//             // Move the marker and center the map
//             map.setCenter(currentLocation);
//             marker.setPosition(currentLocation);

//             // Update the location
//             updateSpecificLocation(currentLocation);
//           }
//         },
//         (error) => {
//           console.error("Error fetching location:", error.message);
//           alert("Unable to fetch your current location. Please enable location services.");
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by your browser.");
//     }
//   };

//   return (
//     <div className="w-full">
//       {/* Search Bar and Current Location Button */}
//       <div className="flex md:items-center justify-between mb-5 max-md:flex-col max-md:space-y-2 ">
//         <div className="flex items-center space-x-3 border-2 border-gray-300 rounded-lg p-3  shadow-md outline-none ">
//           <FaSearchLocation size={25} />
//           <input
//             type="text"
//             ref={searchInputRef}
//             placeholder="Search for a place"
//             className="outline-none max-md:w-full "
//           />
//         </div>
//         <button
//           onClick={handleUseCurrentLocation}
//           className="px-4 py-2 bg-primarycolor space-x-2 text-white rounded-lg shadow-md flex items-center justify-center"
//         >
//           <FaLocationCrosshairs size={25} />
//           <span>Current Location</span>
//         </button>
//       </div>

//       <div ref={mapRef} className="w-full h-96 rounded-lg"></div>
//     </div>
//   );
// };

// export default Map;



import React, { useState, useEffect, useRef } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaSearchLocation } from "react-icons/fa";

const Map = ({ specificLocation, updateSpecificLocation }) => {
  const mapRef = useRef(null); // Reference for the map container
  const searchInputRef = useRef(null); // Reference for the search input
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
    const initialLocation = specificLocation || { lat: 28.6139, lng: 77.209 }; // Default to New Delhi

    // Initialize map
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: initialLocation,
      zoom: 10,
    });

    // Initialize marker
    const markerInstance = new window.google.maps.Marker({
      position: initialLocation,
      map: mapInstance,
      draggable: true,
    });

    // Add a listener to the marker for drag events
    markerInstance.addListener("dragend", () => {
      const newPosition = markerInstance.getPosition();
      updateSpecificLocation({
        lat: newPosition.lat(),
        lng: newPosition.lng(),
      });
    });

    // Add a click listener to the map
    mapInstance.addListener("click", (event) => {
      const clickedPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      // Update marker position
      markerInstance.setPosition(clickedPosition);

      // Update location
      updateSpecificLocation(clickedPosition);
    });

    // Initialize Places Autocomplete
    initAutocomplete(mapInstance, markerInstance);

    setMap(mapInstance);
    setMarker(markerInstance);
  };

  const initAutocomplete = (mapInstance, markerInstance) => {
    const autocomplete = new window.google.maps.places.Autocomplete(
      searchInputRef.current,
      {
        types: ["geocode"], // Optional: Restrict suggestions to geographical locations
        fields: ["geometry", "name"], // Fields to fetch
      }
    );

    // Bias the search results towards the current map bounds
    autocomplete.bindTo("bounds", mapInstance);

    // When a place is selected from the autocomplete suggestions
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

      // Update marker and map position
      mapInstance.setCenter(newPosition);
      markerInstance.setPosition(newPosition);

      // Save the updated position
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
            // Move the marker and center the map
            map.setCenter(currentLocation);
            marker.setPosition(currentLocation);

            // Update the location
            updateSpecificLocation(currentLocation);
          }
        },
        (error) => {
          console.error("Error fetching location:", error.message);
          alert("Unable to fetch your current location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="w-full">
      {/* Search Bar and Current Location Button */}
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
