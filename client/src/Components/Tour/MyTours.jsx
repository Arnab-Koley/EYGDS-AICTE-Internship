import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BounceLoader from "../../Loaders/BounceLoader";

const MyTours = () => {
  const navigate = useNavigate();
  const [myTours, setMyTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Latest");

  useEffect(() => {
    const fetchMyTours = async () => {
      setLoading(true);
      try {
        const serverUrl =
          process.env.NODE_ENV === "development"
            ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/tour/getmytours`
            : `${import.meta.env.VITE_API_PRODUCTION_URL}/tour/getmytours`;

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
          setMyTours(responseData.myTours);
        }
      } catch (error) {
        console.error("Error fetching tours:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTours();
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const filteredTours =
    selectedFilter === "All"
      ? myTours
      : myTours.filter((tour) => tour.status === selectedFilter);

  const sortedTours = [...filteredTours].sort((a, b) => {
    if (sortOrder === "Latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  if (loading) {
    return <BounceLoader/>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl text-primarycolor text-center font-bold">My Tours</h1>
      <div className="flex justify-center gap-3 flex-wrap mt-5">
        {["All", "Pending", "Approved", "Rejected", "Checked In", "Checked Out"].map((filter) => (
          <div
            key={filter}
            className={`border-2 px-5 py-1 rounded-full cursor-pointer ${
              selectedFilter === filter ? "bg-primarycolor border-primarycolor text-white" : "border-dark-1"
            }`}
            onClick={() => handleFilterChange(filter)}
          >
            {filter}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center  my-5"><div className="h-[1px] w-[90%] lg:w-[70%] bg-gray-400"></div></div>
      <div className="flex justify-center gap-3 flex-wrap">
        {["Latest", "Oldest"].map((order) => (
          <div
            key={order}
            className={`border-2 px-5 py-1 rounded-full cursor-pointer ${
              sortOrder === order ? "bg-primarycolor border-primarycolor text-white" : "border-dark-1"
            }`}
            onClick={() => handleSortChange(order)}
          >
            {order}
          </div>
        ))}
      </div>
      {sortedTours.length > 0 ? (
        <ul className="flex flex-col items-center mt-10">
          {sortedTours.map((tour) => (
            <li key={tour._id}
             onClick={() => navigate(`/viewmytour?id=${tour._id}`)}
             className="flex m-2 w-[600px] max-md:w-[80%] max-sm:w-full cursor-pointer"
             >
              <div className="bg-blue-100 border-r-4 border-y-2 border-l-2 border-dashed border-dark-1 rounded-lg w-3/4 p-3 flex flex-col justify-between">
                <h1 className="font-bold text-xl text-primarycolor uppercase truncate">{tour.title}</h1>
                <div className="font-semibold my-3">
                  <h3 className="truncate">{tour.name}</h3>
                  <h3 className="truncate">{tour.primaryPhoneNo}</h3>
                  <h3 className="truncate">{tour.primaryEmail}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="bg-primarycolor rounded-lg px-5 text-lg text-white font-bold py-1">₹ {tour.price}</h3>
                  <h3 className={`text-lg ${tour.status === "Pending" || tour.status === "Rejected" ? "text-red-600" : "text-green-600"} font-bold`}>
                    {tour.status}
                  </h3>
                </div>
              </div>
              <div className="bg-primarycolor border-l-4 border-dashed border-dark-1 rounded-lg w-1/4 flex"></div>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="text-center text-xl mt-10 text-gray-500 font-semibold">No tours found</h1>
      )}
    </div>
  );
};

export default MyTours;
