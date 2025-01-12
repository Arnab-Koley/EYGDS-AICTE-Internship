import React, { useState, useEffect } from "react";
import { FaRegStar } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import featuredTourIds from "../../assets/data/featuredData";

const Feature = () => {
  const [tours, setTours] = useState([]);
  const [isToursLoading, setIsToursLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedTours = async () => {
      if (isToursLoading) {
        return;
      }
      try {
        setIsToursLoading(true);
        const serverUrl =
          process.env.NODE_ENV === "development"
            ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/tour/gettoursbyids`
            : `${import.meta.env.VITE_API_PRODUCTION_URL}/tour/gettoursbyids`;

        const response = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tourIds: featuredTourIds }),
        });

        const responseData = await response.json();
        if (responseData.success) {
          setTours(responseData.tours);
        }
      } catch (error) {
        console.error("Error fetching featured tours:", error.message);
      } finally {
        setIsToursLoading(false);
      }
    };

    fetchFeaturedTours();
  }, []);

  if (isToursLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-10 mt-10 flex flex-col items-center">
      <div className="flex">
        <h1 className="text-3xl max-md:text-xl text-white px-5 py-3 rounded-lg bg-primarycolor flex">
          Our Featured Tour
        </h1>
      </div>

      <ul className="w-full flex flex-wrap items-center justify-center mt-5">
        {tours.length === 0 ? (
          <h1 className="text-xl">No featured tours available</h1>
        ) : (
          tours.map((tour) => (
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
          ))
        )}
      </ul>
    </div>
  );
};

export default Feature;
