

// import React, { useState, useEffect } from "react";
// import { FaHeart, FaRegStar, FaSearchLocation } from "react-icons/fa";
// import { MdCurrencyRupee } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

// import geographyOptions from "../assets/data/geographydData";
// import propertyTypeOptions from "../assets/data/propertyTypeData";

// const Tour = ({ user, updateWishlist }) => {
//   const [tours, setTours] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const navigate = useNavigate();
//   const [isToursLoading, setIsToursLoading] = useState(false);

//   useEffect(() => {
//     const fetchTours = async () => {
//       if (isToursLoading) {
//         return;
//       }
//       try {
//         setIsToursLoading(true);
//         const serverUrl =
//           process.env.NODE_ENV === "development"
//             ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/tour/getalltour`
//             : `${import.meta.env.VITE_API_PRODUCTION_URL}/tour/getalltour`;

//         const response = await fetch(serverUrl, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const responseData = await response.json();
//         if (responseData.success) {
//           setTours(responseData.tours);
//         }
//       } catch (error) {
//         console.error("Error fetching tours:", error.message);
//       } finally {
//         setIsToursLoading(false);
//       }
//     };

//     fetchTours();
//   }, []);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase().replace(/\s+/g, ""));
//   };

//   const handleOptionClick = (optionName) => {
//     setSelectedOptions((prev) => {
//       if (prev.includes(optionName)) {
//         return prev.filter((opt) => opt !== optionName);
//       }
//       return [...prev, optionName];
//     });
//   };

//   const filteredTours = tours.filter((tour) => {
//     const {
//       country,
//       flatHouse,
//       streetAddress,
//       landmark,
//       districtLocality,
//       city,
//       state,
//     } = tour.address;
//     const combinedAddress =
//       `${country} ${flatHouse} ${streetAddress} ${landmark} ${districtLocality} ${city} ${state}`
//         .toLowerCase()
//         .replace(/\s+/g, "");
//     const matchesSearch = combinedAddress.includes(searchQuery);

//     const matchesGeography =
//       selectedOptions.length === 0 ||
//       selectedOptions.some((option) => tour.geography.includes(option));

//     return matchesSearch && matchesGeography;
//   });

//   if (isToursLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col justify-center mt-10">
//       <div className="w-full flex justify-center">
//         <div className="flex items-center space-x-3 border-2 border-gray-300 rounded-full p-3 shadow-md outline-none">
//           <FaSearchLocation size={25} />
//           <input
//             type="text"
//             placeholder="Search by location"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="outline-none max-md:w-full"
//           />
//         </div>
//       </div>

//       <div className="flex justify-center w-full p-5">
//         <div className="flex space-x-2 overflow-x-auto">
//           {geographyOptions.map((option) => (
//             <div
//               key={option.name}
//               onClick={() => handleOptionClick(option.name)}
//               className={`flex border-2 rounded-lg items-center cursor-pointer ${
//                 selectedOptions.includes(option.name)
//                   ? "border-primarycolor"
//                   : "border-gray-500"
//               }`}
//             >
//               <div className="w-12">
//                 <img
//                   src={option.imgSrc}
//                   alt={option.name}
//                   className="h-12 w-12 object-cover rounded-l-lg "
//                 />
//               </div>
//               <h1
//                 className={`px-2 border-l-2 h-full flex items-center justify-center  ${
//                   selectedOptions.includes(option.name)
//                     ? "border-primarycolor bg-primarycolor text-white"
//                     : "border-gray-500"
//                 } `}
//               >
//                 {option.name}
//               </h1>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-5 p-5 flex justify-center">
//         {filteredTours.length === 0 ? (
//           <h1 className="text-xl">No tours available</h1>
//         ) : (
//           <ul className="flex flex-wrap max-md:justify-center">
//             {filteredTours.map((tour) => (
//               <li
//                 key={tour._id}
//                 onClick={() => navigate(`/viewtour?id=${tour._id}`)}
//                 className="rounded-md list-none relative shadow-shadow-2 m-2 cursor-pointer w-64"
//               >
//                 <div className="relative">
//                   <img
//                     src={tour.coverPhoto}
//                     alt={tour.title}
//                     className="h-64 w-64 object-cover bg-gray-500 rounded-t-lg"
//                   />
//                   <div className="absolute top-2 left-2 flex items-center space-x-1 bg-white rounded-full px-2 py-1 z-10">
//                     <FaRegStar size={15} color="black" />
//                     <span className="text-black text-sm">
//                       {tour.rating
//                         ? (
//                             (tour.rating.cleanliness +
//                               tour.rating.accuracy +
//                               tour.rating.communication +
//                               tour.rating.location +
//                               tour.rating.value) /
//                             5
//                           ).toFixed(1)
//                         : "N/A"}
//                     </span>
//                   </div>
//                   <FaHeart
//                     size={25}
//                     className={`absolute shadow-inner top-2 right-2 z-10 ${
//                       user.wishlist.includes(tour._id)
//                         ? "text-red-600"
//                         : "text-black opacity-70"
//                     }`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       updateWishlist(tour._id);
//                     }}
//                   />
//                 </div>
//                 <div className="p-3">
//                   <h2 className="font-semibold text-dark-1 truncate">
//                     {tour.title}
//                   </h2>
//                   <h3 className="text-sm truncate">
//                     {tour.address.city}, {tour.address.state}
//                   </h3>
//                   <div className="flex items-center">
//                     <MdCurrencyRupee size={20} />
//                     <h3 className="font-semibold">{tour.price.adult}</h3>
//                     <h3 className="ml-2">night</h3>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Tour;

import React, { useState, useEffect } from "react";
import { FaHeart, FaRegStar, FaSearchLocation } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import geographyOptions from "../assets/data/geographydData";
import propertyTypeOptions from "../assets/data/propertyTypeData";
import PropertyTypeSelector from "../Components/Tour/PropertyTypeSelector";
import GeographyTypeSelector from "../Components/Tour/GeographyTypeSelector";

const Tour = ({ user, updateWishlist }) => {
  const [tours, setTours] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGeographyOptions, setSelectedGeographyOptions] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const navigate = useNavigate();
  const [isToursLoading, setIsToursLoading] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      if (isToursLoading) {
        return;
      }
      try {
        setIsToursLoading(true);
        const serverUrl =
          process.env.NODE_ENV === "development"
            ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/tour/getalltour`
            : `${import.meta.env.VITE_API_PRODUCTION_URL}/tour/getalltour`;

        const response = await fetch(serverUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        if (responseData.success) {
          setTours(responseData.tours);
        }
      } catch (error) {
        console.error("Error fetching tours:", error.message);
      } finally {
        setIsToursLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase().replace(/\s+/g, ""));
  };

  const handleGeographyOptionClick = (optionName) => {
    setSelectedGeographyOptions((prev) => {
      if (prev.includes(optionName)) {
        return prev.filter((opt) => opt !== optionName);
      }
      return [...prev, optionName];
    });
  };

  const handlePropertyTypeClick = (optionName) => {
    setSelectedPropertyType((prev) => (prev === optionName ? null : optionName));
  };

  const filteredTours = tours.filter((tour) => {
    const {
      country,
      flatHouse,
      streetAddress,
      landmark,
      districtLocality,
      city,
      state,
    } = tour.address;
    const combinedAddress =
      `${country} ${flatHouse} ${streetAddress} ${landmark} ${districtLocality} ${city} ${state}`.toLowerCase().replace(/\s+/g, "");
    const matchesSearch = combinedAddress.includes(searchQuery);

    const matchesGeography =
      selectedGeographyOptions.length === 0 ||
      selectedGeographyOptions.some((option) => tour.geography.includes(option));

    const matchesPropertyType =
      !selectedPropertyType || tour.propertyType === selectedPropertyType;

    return matchesSearch && matchesGeography && matchesPropertyType;
  });

  if (isToursLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col sticky top-16 z-20 p-5  bg-white">
      <div className="w-full flex justify-center">
        <div className="flex items-center space-x-3 border-2 border-gray-300 rounded-full p-3 shadow-md outline-none">
          <FaSearchLocation size={25} />
          <input
            type="text"
            placeholder="Search by location"
            value={searchQuery}
            onChange={handleSearchChange}
            className="outline-none max-md:w-full"
          />
        </div>
      </div>

      <GeographyTypeSelector
        geographyOptions={geographyOptions}
        selectedGeographyOptions={selectedGeographyOptions}
        handleGeographyOptionClick={handleGeographyOptionClick}
      />

      <PropertyTypeSelector
        propertyTypeOptions={propertyTypeOptions}
        selectedPropertyType={selectedPropertyType}
        handlePropertyTypeClick={handlePropertyTypeClick}
      />
      </div>

      <div className="mt-5 p-5 flex justify-center">
        {filteredTours.length === 0 ? (
          <h1 className="text-xl">No tours available</h1>
        ) : (
          <ul className="flex flex-wrap max-md:justify-center">
            {filteredTours.map((tour) => (
              <li
                key={tour._id}
                onClick={() => navigate(`/viewtour?id=${tour._id}`)}
                className="rounded-md list-none relative shadow-shadow-2 m-2 cursor-pointer w-64"
              >
                <div className="relative">
                  <img
                    src={tour.coverPhoto}
                    alt={tour.title}
                    className="h-64 w-64 object-cover bg-gray-500 rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2 flex items-center space-x-1 bg-white rounded-full px-2 py-1 z-10">
                    <FaRegStar size={15} color="black" />
                    <span className="text-black text-sm">
                      {tour.rating
                        ? (
                            (tour.rating.cleanliness +
                              tour.rating.accuracy +
                              tour.rating.communication +
                              tour.rating.location +
                              tour.rating.value) / 5
                          ).toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                  <FaHeart
                    size={25}
                    className={`absolute shadow-inner top-2 right-2 z-10 ${
                      user.wishlist.includes(tour._id)
                        ? "text-red-600"
                        : "text-black opacity-70"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      updateWishlist(tour._id);
                    }}
                  />
                </div>
                <div className="p-3">
                  <h2 className="font-semibold text-dark-1 truncate">
                    {tour.title}
                  </h2>
                  <h3 className="text-sm truncate">
                    {tour.address.city}, {tour.address.state}
                  </h3>
                  <div className="flex items-center">
                    <MdCurrencyRupee size={20} />
                    <h3 className="font-semibold">{tour.price.adult}</h3>
                    <h3 className="ml-2">night</h3>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Tour;