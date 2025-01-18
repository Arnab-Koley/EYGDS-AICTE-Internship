import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { formatDate } from "../../Utils/formatDate";

import BounceLoader from "../../Loaders/BounceLoader"


const ViewMyReservation = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reservationId = params.get("id");
  const navigate = useNavigate();

  const [reservation, setReservation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStatusChanging, setIsStatusChanging] = useState(false);

  useEffect(() => {
    const fetchReservation = async () => {
      if (isLoading) {
        return;
      }
      try {
        setIsLoading(true);
        const serverUrl =
          process.env.NODE_ENV === "development"
            ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/reservation/getmyreservationbyid`
            : `${import.meta.env.VITE_API_PRODUCTION_URL}/reservation/getmyreservationbyid`;

        const token = localStorage.getItem("token");

        const response = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reservationId }),
        });

        const responseData = await response.json();
        if (responseData.success) {
          setReservation(responseData.reservation);
        } else {
          toast.error("Failed to fetch reservation: " + responseData.msg);
        }
      } catch (error) {
        toast.error("Error fetching reservation: " + error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (reservationId) {
      fetchReservation();
    }
  }, [reservationId]);


  const handleStatusChange = async (status) => {
    if(isStatusChanging){
        return;
    }
    const loadingToastId = toast.loading("Loading...");
    const start = Date.now();
    try {
        setIsStatusChanging(true);
      const serverUrl =
        process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/reservation/updatestatus`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/reservation/updatestatus`;

      const token = localStorage.getItem("token");

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reservationId, status }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        const elapsed = Date.now() - start;
        if (elapsed < 2000) {
          await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);
        setReservation({ ...reservation, status });
        navigate('/reservations');
      } else {
        toast.error("Failed to update status: " + responseData.msg);
      }
    } catch (error) {
    toast.error(error.message, { id: loadingToastId });
    } finally {
        const elapsed = Date.now() - start;
      if (elapsed < 2000) {
        await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
      }
      toast.dismiss(loadingToastId);
      setIsStatusChanging(false);
    }
  };

  if (isLoading) {
    return <BounceLoader/>;
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
      {reservation ? (
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-primarycolor text-center">Reservation Details of {reservation.title}</h3>
          <div className="w-full flex justify-center">
            <button
              onClick={() => navigate(`/managelisting?id=${reservation.tourId}`)}
              className="bg-primarycolor rounded-full px-5 py-2 mt-3 font-semibold text-white"
            >
              Manage Listing
            </button>
          </div>
          <div className="flex flex-wrap mt-5">
            <div className="m-2">
              <div className="bg-white p-3 rounded-lg shadow-md border-2 font-semibold">
                <h3>Name:<span className="font-normal ml-2">{reservation.name}</span></h3>
                <h3>Primary Phone:<span className="font-normal ml-2">{reservation.primaryPhoneNo}</span></h3>
                <h3>Secondary Phone:<span className="font-normal ml-2">{reservation.secondaryPhoneNo || "N/A"}</span></h3>
                <h3>Primary Email:<span className="font-normal ml-2">{reservation.primaryEmail}</span></h3>
                <h3>Secondary Email:<span className="font-normal ml-2">{reservation.secondaryEmail || "N/A"}</span></h3>
              </div>
            </div>

            <div className="m-2">
              <div className="bg-white p-3 rounded-lg shadow-md border-2 font-semibold">
                <h3>Country:<span className="font-normal ml-2">{reservation.address.country}</span></h3>
                <h3>Flat/House:<span className="font-normal ml-2">{reservation.address.flatHouse || "N/A"}</span></h3>
                <h3>Street Address:<span className="font-normal ml-2">{reservation.address.streetAddress}</span></h3>
                <h3>Nearby Landmark:<span className="font-normal ml-2">{reservation.address.landmark || "N/A"}</span></h3>
                <h3>District/Locality:<span className="font-normal ml-2">{reservation.address.districtLocality || "N/A"}</span></h3>
                <h3>City:<span className="font-normal ml-2">{reservation.address.city}</span></h3>
                <h3>State:<span className="font-normal ml-2">{reservation.address.state}</span></h3>
                <h3>Pin Code:<span className="font-normal ml-2">{reservation.address.pinCode}</span></h3>
              </div>
            </div>

            <div className="m-2">
              <div className="bg-white p-3 rounded-lg shadow-md border-2 font-semibold">
                <h3>Adults:<span className="font-normal ml-2">{reservation.guests.adult}</span></h3>
                <h3>Teens:<span className="font-normal ml-2">{reservation.guests.teen}</span></h3>
                <h3>Children:<span className="font-normal ml-2">{reservation.guests.child}</span></h3>
                <h3>Infants:<span className="font-normal ml-2">{reservation.guests.infant}</span></h3>
                <h3>Pets:<span className="font-normal ml-2">{reservation.guests.pet}</span></h3>
              </div>
            </div>

            <div className="m-2">
              <div className="bg-white p-3 rounded-lg shadow-md border-2 font-semibold">
                <h3>Check-in Date:<span className="font-normal ml-2">{formatDate(reservation.checkInDate)}</span></h3>
                <h3>Check-out Date:<span className="font-normal ml-2">{formatDate(reservation.checkOutDate)}</span></h3>
              </div>
            </div>

            <div className="m-2">
              <div className="bg-white p-3 rounded-lg shadow-md border-2 font-semibold">
                <h3>Price:<span className="font-normal ml-2">₹{reservation.price}</span></h3>
              </div>
            </div>
          </div>

          <div className="w-full flex mt-5">
            <div className={`bg-white p-5 rounded-lg border-2 border-primarycolor`}>
              <h2 className="font-semibold text-lg">
                Status:
                <span className={`ml-2 ${reservation.status === "Pending" || reservation.status === "Rejected" ? "text-red-600" : "text-green-600"}`}>
                  {reservation.status}
                </span>
              </h2>
            </div>
          </div>

          {reservation.status === "Pending" && (
            <div className="flex mt-5 justify-center space-x-4">
              <button
                onClick={() => handleStatusChange("Approved")}
                className={`${
                  isStatusChanging ? "bg-gray-400" : "bg-green-600"
                } rounded-md p-3 text-white`}
                disabled={isStatusChanging}
              >
                Approve
              </button>
              <button
                onClick={() => handleStatusChange("Rejected")}
                className={`${
                  isStatusChanging ? "bg-gray-400" : "bg-red-600"
                } rounded-md p-3 text-white`}
                disabled={isStatusChanging}
              >
                Reject
              </button>
            </div>
          )}
          {reservation.status === "Paid" && (
            <div className="flex flex-col mt-5 justify-center items-center">
              <h3>Please confirm if the guest has checked in</h3>
              <h4 className="text-sm text-red-600 font-semibold">( NOTE: This action is irreversible )</h4>
              <button
                onClick={() => handleStatusChange("Checked In")}
                className={`${
                  isStatusChanging ? "bg-gray-400" : "bg-primarycolor"
                } rounded-md p-3 text-white mt-2`}
                disabled={isStatusChanging}
              >
                 Confirm Check-In
              </button>
            </div>
          )}
          {reservation.status === "Checked In" && (
            <div className="flex flex-col mt-5 justify-center items-center">
              <h3>Please confirm if the guest has checked out</h3>
              <h4 className="text-sm text-red-600 font-semibold">( NOTE: This action is irreversible )</h4>
              <button
                onClick={() => handleStatusChange("Checked Out")}
                className={`${
                  isStatusChanging ? "bg-gray-400" : "bg-primarycolor"
                } rounded-md p-3 text-white mt-2`}
                disabled={isStatusChanging}
              >
                 Confirm Check-Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Reservation not found</p>
      )}
    </div>
  );
};

export default ViewMyReservation;
