import React, { useState, useEffect } from "react";

const Host = () => {
  const [mylistings, setMyListing] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const serverUrl =
          process.env.NODE_ENV === "development"
            ? `${
                import.meta.env.VITE_API_DEVELOPMENT_URL
              }/listing/getmylistings`
            : `${
                import.meta.env.VITE_API_PRODUCTION_URL
              }/listing/getmylistings`;

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

  return (
    <div className="p-5">
      <h1 className="text-3xl text-dark-1 font-semibold text-center mt-5">
        Host Dashboard
      </h1>

      {mylistings && (
        <div className="flex mt-5">
          <div className="bg-white border-2 shadow-md p-3 rounded-md text-xl">
            Total Hostings : {mylistings.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default Host;
