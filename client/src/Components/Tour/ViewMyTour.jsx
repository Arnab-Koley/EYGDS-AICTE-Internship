import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { formatDate } from "../../Utils/formatDate";

const ViewMyTour = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tourId = params.get("id");
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      if (isLoading) {
        return;
      }
      try {
        setIsLoading(true);
        const serverUrl =
          process.env.NODE_ENV === "development"
            ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/tour/getmytourbyid`
            : `${import.meta.env.VITE_API_PRODUCTION_URL}/tour/getmytourbyid`;

        const token = localStorage.getItem("token");

        const response = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tourId }),
        });

        const responseData = await response.json();
        if (responseData.success) {
          setTour(responseData.tour);
        } else {
          toast.error("Failed to fetch tour: " + responseData.msg);
        }
      } catch (error) {
        toast.error("Error fetching tour: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (tourId) {
      fetchTour();
    }
  }, [tourId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <div className="w-full mb-5">
        <IoIosArrowRoundBack
          size={40}
          className="bg-primarycolor p-1 rounded-full text-white cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>
      {tour ? (
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-primarycolor mb-4">{tour.title}</h3>
          <div className="space-y-3">
            <p><strong>Name:</strong> {tour.name}</p>
            <p><strong>Primary Phone:</strong> {tour.primaryPhoneNo}</p>
            <p><strong>Secondary Phone:</strong> {tour.secondaryPhoneNo || "N/A"}</p>
            <p><strong>Primary Email:</strong> {tour.primaryEmail}</p>
            <p><strong>Secondary Email:</strong> {tour.secondaryEmail || "N/A"}</p>
            <div>
              <strong>Address:</strong>
              <p>{tour.address}</p>
              <p>{tour.address.flatHouse && `Flat/House: ${tour.address.flatHouse}`}</p>
              <p>Street Address: {tour.address.streetAddress}</p>
              <p>{tour.address.landmark && `Landmark: ${tour.address.landmark}`}</p>
              <p>{tour.address.districtLocality && `District/Locality: ${tour.address.districtLocality}`}</p>
              <p>City: {tour.address.city}</p>
              <p>State: {tour.address.state}</p>
              <p>Country: {tour.address.country}</p>
              <p>Pin Code: {tour.address.pinCode}</p>
            </div>
            <div>
              <strong>Guests:</strong>
              <p>Adults: {tour.guests.adult}</p>
              <p>Teens: {tour.guests.teen}</p>
              <p>Children: {tour.guests.child}</p>
              <p>Infants: {tour.guests.infant}</p>
              <p>Pets: {tour.guests.pet}</p>
            </div>
            <p>Check-in Date: {formatDate(tour.checkInDate)}</p>
          <p>Check-out Date: {formatDate(tour.checkOutDate)}</p>
            <p><strong>Price:</strong> ₹{tour.price}</p>
            <p><strong>Status:</strong> {tour.status}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Tour not found</p>
      )}
    </div>
  );
};

export default ViewMyTour;
