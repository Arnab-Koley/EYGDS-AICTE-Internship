import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack, IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { toast } from "react-hot-toast";

import { PiListHeart } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { IoMdOpen } from "react-icons/io";

const Wishlist = ({ user, updateWishlist, isLoading }) => {
  const [wishlistTours, setWishlistTours] = useState([]);
  const [isToursLoading, setIsToursLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Latest");
  const navigate = useNavigate();

  const wishlist = Array.isArray(user?.wishlist) ? user.wishlist : [];

  useEffect(() => {
    const fetchWishlistTours = async () => {
      if (isToursLoading || wishlist.length === 0) return;
      setIsToursLoading(true);
      try {
        const serverUrl =
          process.env.NODE_ENV === "development"
            ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/tour/gettoursbyids`
            : `${import.meta.env.VITE_API_PRODUCTION_URL}/tour/gettoursbyids`;
        const response = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tourIds: wishlist }),
        });
        const responseData = await response.json();
        if (responseData.success) {
          setWishlistTours(responseData.tours);
        } else {
          toast.error("Failed to fetch wishlist tours: " + responseData.msg);
        }
      } catch (error) {
        toast.error("Error fetching wishlist tours: " + error.message);
      } finally {
        setIsToursLoading(false);
      }
    };

    fetchWishlistTours();
  }, [isLoading, wishlist]);

  const filteredTours = wishlistTours.filter((tour) =>
    tour.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTours = [...filteredTours].sort((a, b) => {
    if (sortOption === "Title (A-Z)") {
      return a.title.localeCompare(b.title);
    }
    if (sortOption === "Title (Z-A)") {
      return b.title.localeCompare(a.title);
    }
    if (sortOption === "Latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortOption === "Oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return 0;
  });

  return (
    <div className="p-5">
      <div className="w-full mb-5 max-md:hidden">
        <IoIosArrowRoundBack
          size={40}
          className="bg-primarycolor p-1 rounded-full text-white"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="bg-primarycolor p-3 flex items-center justify-between">
        <div className="flex items-center text-white space-x-2 font-semibold text-lg">
          <PiListHeart size={30} />
          <h1 className="">My Wishlist ({wishlist.length})</h1>
        </div>
        <div className="flex items-center justify-center md:space-x-2 ">
          <IoFilter size={25} color="white" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-1 border-none outline-none rounded"
          >
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
            <option value="Title (A-Z)">Title (A-Z)</option>
            <option value="Title (Z-A)">Title (Z-A)</option>
          </select>
        </div>
      </div>

      <div className="flex mt-7">
        <div className="flex items-center space-x-3 rounded-lg p-3 outline-none border-2 border-gray-300">
          <IoIosSearch size={25} />
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none max-md:w-full"
          />
        </div>
      </div>

      {isToursLoading || isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className="flex flex-wrap mt-5">
          {sortedTours.length === 0 ? (
            <div>No tours in your wishlist</div>
          ) : (
            sortedTours.map((tour) => (
              <li
                key={tour._id}
                className="bg-white rounded-md flex shadow-shadow-2 w-80 m-2"
              >
                <img
                  src={tour.coverPhoto}
                  alt="cover photo"
                  className="h-32 w-2/5 object-cover bg-gray-500 rounded-l-md"
                />
                <div className="p-2 w-3/5 flex flex-col justify-between">
                  <h1>{tour.title}</h1>
                  <div className="flex w-full justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateWishlist(tour._id);
                      }}
                      className="bg-red-600 text-white flex items-center justify-center p-1 rounded-md"
                    >
                      <div>
                        <MdDelete size={20} className="mr-1" />
                      </div>
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/viewtour?id=${tour._id}`)}
                      className="border-primarycolor border-2 text-primarycolor flex items-center p-1 rounded-md"
                    >
                      <div>
                        <IoMdOpen size={20} className="mr-1" />
                      </div>
                      Open
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
