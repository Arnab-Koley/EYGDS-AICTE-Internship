import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Tour = () => {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const serverUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000/api/tour/getalltour"
            : "https://link2me-server.vercel.app/api/tour/getalltour";

        const response = await fetch(serverUrl, {
          method: "GET", 
        });

        const responseData = await response.json();
        if (responseData.success) {
          setTours(responseData.tours); 
        }
      } catch (error) {
        console.error("Error fetching tours:", error.message);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="mt-5 p-5">
      {/* <div className="">
        {tours.map((tour) => (
          <li
            key={tour._id} 
            className=" border-2 w-72 list-none"
          >
            <div className="w-full flex justify-between bg-green-400">
              <div className="relative top-10 left-3 z-10 flex items-center justify-center space-x-1 bg-white rounded-full px-2">
                <FaRegStar size={15} color="black" />
                <span className="text-black text-sm">{tour.rating}</span>
              </div>
              <FaHeart
                size={25}
                className="text-black opacity-70 z-10 top-10 right-5 relative"
              />
            </div>
            <img src={tour.coverPhoto} alt={tour.title} className="h-64 w-72 object-cover bg-gray-500" />
            <h2 className="font-semibold text-dark-1  mt-2">{tour.title}</h2>
            <h3 className="text-sm">{tour.address.city}, {tour.address.state}</h3>
            <div className="flex items-center"><MdCurrencyRupee size={20} /><h3 className="font-semibold">{tour.price.adult}</h3><h3 className="ml-2">night</h3></div>
          </li>
        ))}
      </div> */}

      <ul className=" grid grid-cols-5">
        {tours.map((tour) => (
          <li
            key={tour._id}
            onClick={() => navigate(`/viewtour?id=${tour._id}`)}
            className="rounded-md w-72 list-none relative shadow-shadow-2 m-2"
          >
            <div className="relative">
              {/* Image */}
              <img
                src={tour.coverPhoto}
                alt={tour.title}
                className="h-64 w-72 object-cover bg-gray-500 rounded-t-lg"
              />

              {/* Star and Heart Icons */}
              <div className="absolute top-2 left-2 flex items-center space-x-1 bg-white rounded-full px-2 py-1 z-10">
                <FaRegStar size={15} color="black" />
                <span className="text-black text-sm">
                  {tour.rating
                    ? (
                        (tour.rating.cleanliness +
                          tour.rating.accuracy +
                          tour.rating.communication +
                          tour.rating.location +
                          tour.rating.value) /
                        5
                      ).toFixed(1)
                    : "N/A"}
                </span>
              </div>
              <FaHeart
                size={25}
                className="absolute top-2 right-2 text-black opacity-70 z-10"
              />
            </div>

            {/* Content Below Image */}
            <div className="p-3">
              <h2 className="font-semibold text-dark-1">{tour.title}</h2>
              <h3 className="text-sm">
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
    </div>
  );
};

export default Tour;
