import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import { CiEdit } from "react-icons/ci";

const ManageListing = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const listingId = params.get("id");
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [isTimeUpdating, setIsTimeUpdating] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const serverUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000/api/listing/getlistingbyid"
            : "https://link2me-server.vercel.app/api/listing/getlistingbyid";

        const token = localStorage.getItem("token");

        const response = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ listingId }),
        });

        const responseData = await response.json();
        if (responseData.success) {
          setListing(responseData.listing);
          setNewStatus(responseData.listing.status);
          setStatusMsg(responseData.listing.statusMsg || "");
          setCheckInTime(responseData.listing.checkInTime);
          setCheckOutTime(responseData.listing.checkOutTime);
        } else {
          toast.error("Failed to fetch listing: " + responseData.msg);
        }
      } catch (error) {
        toast.error("Error fetching listing: " + error.message);
      }
    };

    if (listingId) {
      fetchListing();
    }
  }, [listingId]);

  const handleUpdateStatus = async () => {
    const loadingToastId = toast.loading("Updating Status...");
    const start = Date.now();
    try {
      if (isStatusUpdating) {
        return;
      }
      setIsStatusUpdating(true);

      const serverUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000/api/listing/updatelistingstatus"
          : "https://link2me-server.vercel.app/api/listing/updatelistingstatus";

      const token = localStorage.getItem("token");

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId, status: newStatus, statusMsg }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        setListing((prevListing) => ({
          ...prevListing,
          status: newStatus,
          statusMsg: statusMsg,
        }));
        const elapsed = Date.now() - start;
        if (elapsed < 2000) {
          await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);
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
      setIsStatusUpdating(false);
    }
  };


  const handleUpdateTimes = async () => {
    const loadingToastId = toast.loading("Updating Times...");
    const start = Date.now();
    try {
      const serverUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:5000/api/listing/updatelistingtimes"
          : "https://link2me-server.vercel.app/api/listing/updatelistingtimes";

      const token = localStorage.getItem("token");

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId, checkInTime, checkOutTime }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        setListing((prevListing) => ({
          ...prevListing,
          checkInTime,
          checkOutTime,
        }));
        const elapsed = Date.now() - start;
        if (elapsed < 2000) {
          await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);
      } else {
        toast.error("Failed to update times: " + responseData.msg);
      }
    } catch (error) {
      toast.error(error.message, { id: loadingToastId });
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < 2000) {
        await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
      }
      toast.dismiss(loadingToastId);
    }
  };



  if (!listing) {
    return <div>Loading...</div>;
  }

  const isButtonDisabled = newStatus === listing.status || isStatusUpdating;
  const isTimesButtonDisabled = (checkInTime === listing.checkInTime && checkOutTime === listing.checkOutTime) || checkInTime==="" || checkOutTime==="";

  return (
    <div className="p-5">
      <div className="w-full mb-5">
        <IoIosArrowRoundBack
          size={40}
          className="bg-primarycolor p-1 rounded-full text-white"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="md:px-20">
      <div className="flex flex-wrap items-center text-xl max-md:text-lg">
    For Basic details update goto
    <span
      className="text-primarycolor underline cursor-pointer ml-2"
      onClick={() => navigate(`/editlisting?id=${listing._id}`)}
    >
      Edit Section
    </span>
  </div>

        <div className="border-2 rounded-lg p-5 mt-4 bg-white shadow-md">
          <div className="flex items-center mt-4">
            <h3 className="mr-4 text-xl">Listing Status</h3>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="p-1 border-none outline-none rounded"
            >
              <option value="Hidden">Hidden</option>
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </div>

          {newStatus === "Unavailable" && (
            <div className="mt-4">
              <label className="block text-gray-700">
                Do you want to give a message?
              </label>
              <input
                type="text"
                value={statusMsg}
                onChange={(e) => setStatusMsg(e.target.value)}
                placeholder="Ex- booking closed until tomorrow 12:00 PM"
                className="w-full mt-2 p-2 border border-gray-300 rounded"
              />
            </div>
          )}

          <button
            onClick={handleUpdateStatus}
            className={`mt-4 py-2 px-4 rounded-full ${
              isButtonDisabled ? "bg-gray-300" : "bg-primarycolor text-white"
            }`}
            disabled={isButtonDisabled}
          >
            Update Status
          </button>

          <ul className="mt-6 space-y-2 text-sm text-gray-700 list-disc list-inside">
            <li>
              <strong>Hidden:</strong> No user can see your listing.
            </li>
            <li>
              <strong>Available:</strong> Users can see your listing and book
              tours.
            </li>
            <li>
              <strong>Unavailable with message:</strong> Users can see your
              listing but cannot book tours. (Your message will be shown to the
              user.)
            </li>
          </ul>
        </div>

       
        <div className="border-2 rounded-lg p-5 mt-4 bg-white shadow-md">
          <div className="flex md:items-center max-md:flex-col">
            <h3 className="">Check-in Time</h3>
            <input
              type="text"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
              className="p-1 md:ml-2 rounded-md bg-gray-200"
              placeholder="08:00 AM - 08:00 PM"
            />
          </div>
          <div className="flex md:items-center max-md:flex-col mt-2">
            <h3 className="">Check-out Time</h3>
            <input
              type="text"
              value={checkOutTime}
              onChange={(e) => setCheckOutTime(e.target.value)}
              className="p-1 md:ml-2 rounded-md bg-gray-200"
              placeholder="08:00 AM - 04:00 PM"
            />
          </div>

          <button
            onClick={handleUpdateTimes}
            className={`mt-4 py-2 px-4 rounded-full ${isTimesButtonDisabled ? "bg-gray-300" : "bg-primarycolor text-white"}`}
            disabled={isTimesButtonDisabled}
          >
            Update Times
          </button>
        </div>

        
      </div>
    </div>
  );
};

export default ManageListing;
