import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { IoIosSearch } from "react-icons/io";
import { IoFilter } from "react-icons/io5";

const MyListings = () => {
  const [mylistings, setMyListing] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Latest");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const serverUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000/api/listing/getmylistings"
            : "https://link2me-server.vercel.app/api/listing/getmylistings";

        const token = localStorage.getItem("token");

        const response = await fetch(serverUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        if (responseData.success) {
          setMyListing(responseData.listings);
        }
      } catch (error) {
        console.error("Error fetching listings:", error.message);
      }
    };

    fetchListings();
  }, []);

  // Filter and sort the listings
  const filteredAndSortedListings = [...mylistings]
    .filter((listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "Latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOption === "Oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortOption === "Title (A-Z)") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "Title (Z-A)") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

  return (
    <div className="px-5 mt-10">
      <div className="bg-primarycolor p-3 flex items-center justify-between ">
        <h1 className=" text-white font-semibold text-xl">
          {" "}
          My Listings ({filteredAndSortedListings.length})
        </h1>
        <div className="flex items-center justify-center space-x-2">
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
      {filteredAndSortedListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-gray-500 text-center my-5 md:text-xl">No listings found. Create a new one.</h3>
          <button
            onClick={() => navigate("/newlisting")}
            className="bg-white rounded-md flex flex-col items-center justify-center border-2 border-gray-400 h-32 w-64"
          >
            <FaPlus size={40} className="text-slate-300" />
            <h1 className="text-xl text-slate-400">Create new</h1>
          </button>
        </div>
      ) : (
        <ul className="gap-3 grid lg:grid-cols-4 grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 mt-3">
          <button
            onClick={() => navigate("/newlisting")}
            className="bg-white rounded-md flex flex-col items-center justify-center border-2 border-gray-400 h-32"
          >
            <FaPlus size={40} className="text-slate-300" />
            <h1 className="text-xl text-slate-400">Create new</h1>
          </button>

          {filteredAndSortedListings.map((listing) => (
            <li
              key={listing._id}
              className="bg-white rounded-md flex border-2 border-gray-400"
            >
              <img
                src={listing.coverPhoto}
                alt="cover photo"
                className="h-32 w-32 object-cover bg-gray-500 rounded-l-md"
              />
              <div className="w-full p-2 flex flex-col justify-between overflow-auto">
                <h3 className="font-semibold text-dark-1 truncate">
                  {listing.title}
                </h3>
                <div className="flex flex-col space-y-1 text-white font-semibold">
                  <button
                    onClick={() => navigate(`/editlisting?id=${listing._id}`)}
                    className="bg-primarycolor p-1 w-full"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/managelisting?id=${listing._id}`)}
                    className="bg-primarycolor p-1 w-full"
                  >
                    Manage
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyListings;
