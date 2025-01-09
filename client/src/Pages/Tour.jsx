import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Tour = ({ user, updateWishlist }) => {
  const [tours, setTours] = useState([]);
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

  if (isToursLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-5 p-5 flex justify-center">
      <ul className="flex flex-wrap max-md:justify-center">
        {tours.map((tour) => (
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
                          tour.rating.value) /
                        5
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
    </div>
  );
};

export default Tour;
