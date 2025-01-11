import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import { GoAlertFill } from "react-icons/go";
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

  const [reservationType, setReservationType] = useState("");
  const [isReservationUpdating, setIsReservationUpdating] = useState(false);

  const [refundPolicy, setRefundPolicy] = useState("");
  const [isPolicyUpdating,setIsPolicyUpdating] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const serverUrl =
            process.env.NODE_ENV === "development"
            ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/listing/getlistingbyid`
            : `${import.meta.env.VITE_API_PRODUCTION_URL}/listing/getlistingbyid`;

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
          setReservationType(responseData.listing.reservationType);
          setRefundPolicy(responseData.listing.refundPolicy);
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
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/listing/updatelistingstatus`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/listing/updatelistingstatus`;

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
    if (isTimeUpdating) {
      return;
    }
    const loadingToastId = toast.loading("Updating Times...");
    const start = Date.now();
    try {
      setIsTimeUpdating(true);
      const serverUrl =


          process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/listing/updatelistingtimes`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/listing/updatelistingtimes`;

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
      setIsTimeUpdating(false);
    }
  };

  const handleUpdateReservationType = async () => {
    if (isReservationUpdating) {
      return;
    }
    const loadingToastId = toast.loading("Updating Reservation Type...");
    const start = Date.now();
    try {
      setIsReservationUpdating(true);

      const serverUrl =
          process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/listing/updatereservationtype`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/listing/updatereservationtype`;

      const token = localStorage.getItem("token");

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId, reservationType }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        setListing((prevListing) => ({
          ...prevListing,
          reservationType,
        }));
        const elapsed = Date.now() - start;
        if (elapsed < 2000) {
          await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);
      } else {
        toast.error("Failed to update reservation type: " + responseData.msg);
      }
    } catch (error) {
      toast.error(error.message, { id: loadingToastId });
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < 2000) {
        await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
      }
      toast.dismiss(loadingToastId);
      setIsReservationUpdating(false);
    }
  };


  const handleUpdatePolicy = async () => {
    if (isPolicyUpdating) {
      return;
    }
    const loadingToastId = toast.loading("Updating Policy...");
    const start = Date.now();
    try {
      setIsPolicyUpdating(true);
      const serverUrl =
          process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/listing/updaterefundpolicy`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/listing/updaterefundpolicy`;

      const token = localStorage.getItem("token");

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId, refundPolicy }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        setListing((prevListing) => ({
          ...prevListing,
          refundPolicy
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
      setIsPolicyUpdating(false);
    }
  };


  if (!listing || !newStatus || !checkInTime || !checkOutTime || !reservationType || !refundPolicy) {
    return <div>Loading...</div>;
  }

  const isButtonDisabled = (newStatus === listing.status && statusMsg === listing.statusMsg  ) || isStatusUpdating  ;
  const isTimesButtonDisabled = (checkInTime === listing.checkInTime && checkOutTime === listing.checkOutTime) || checkInTime === "" || checkOutTime === "";
  const isReservationButtonDisabled = reservationType === listing.reservationType || isReservationUpdating;
  const isPolicyButtonDisabled = refundPolicy === listing.refundPolicy || isPolicyUpdating;

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
          For Basic details, Pricing update goto
          <span
            className="text-primarycolor underline cursor-pointer ml-2"
            onClick={() => navigate(`/editlisting?id=${listing._id}`)}
          >
            Edit Section
          </span>
        </div>

        <div className="border-2 rounded-lg p-5 mt-4 bg-white shadow-md">
          <div className="text-lg font-semibold text-red-600 flex items-center">
            <GoAlertFill className="mr-2" />
            Important Reminders
          </div>
          <ul className="space-y-1 font-semibold text-gray-800 text-sm list-disc list-inside mt-2">
            <li>
              Verify and ensure all details are accurate in the Edit & Manage
              sections before setting the listing status to "Available."
            </li>
            <li>
              Always switch the listing status to "Hidden" before making any
              modifications to avoid potential booking conflicts.
            </li>
            <li>
              Review reservation settings, check-in and check-out times, and
              other key details to provide a seamless experience for users.
            </li>
          </ul>
        </div>

        <div className="border-2 rounded-lg p-5 mt-4 bg-white shadow-md">
          <div className="flex items-center mt-2">
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
                Give a message for users
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

          <ul className="mt-6 space-y-1 text-sm text-gray-700 list-disc list-inside">
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
            className={`mt-4 py-2 px-4 rounded-full ${
              isTimesButtonDisabled
                ? "bg-gray-300"
                : "bg-primarycolor text-white"
            }`}
            disabled={isTimesButtonDisabled}
          >
            Update Times
          </button>
        </div>

        <div className="border-2 rounded-lg p-5 mt-4 bg-white shadow-md">
          <div className="flex items-center mt-4">
            <h3 className="mr-4 text-xl">Reservation Type</h3>
            <select
              value={reservationType}
              onChange={(e) => setReservationType(e.target.value)}
              className="p-1 border-none outline-none rounded"
            >
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <button
            onClick={handleUpdateReservationType}
            className={`mt-4 py-2 px-4 rounded-full ${
              isReservationButtonDisabled
                ? "bg-gray-300"
                : "bg-primarycolor text-white"
            }`}
            disabled={isReservationButtonDisabled}
          >
            Update Reservation Type
          </button>
          <ul className="mt-6 space-y-1 text-sm text-gray-700 list-disc list-inside">
            <li>
              <strong>Automatic:</strong> Bookings are automatically approved
              without any manual intervention.
            </li>
            <li>
              <strong>Manual:</strong> Each booking requires your manual
              approval before confirmation.
            </li>
          </ul>
        </div>

        <div className="border-2 rounded-lg p-5 mt-4 bg-white shadow-md flex flex-col">
            <h3 className="text-xl">Cancellation & Refund policy</h3>
            <textarea
              type="text"
              value={refundPolicy}
              onChange={(e) => setRefundPolicy(e.target.value)}
              className="p-2 rounded-md border-2 outline-none mt-2"
              placeholder="Ex- Free cancellation up to 7 days before check-in, 50% refund if cancelled 5 day before, 30% refund if cancelled 3 day before, and no refund within 1 day of check-in."
              rows={5}
            />

          <div className="flex">
          <button
            onClick={handleUpdatePolicy}
            className={`mt-4 py-2 px-4 rounded-full ${
              isPolicyButtonDisabled
                ? "bg-gray-300"
                : "bg-primarycolor text-white"
            }`}
            disabled={isPolicyButtonDisabled}
          >
            Update Policy
          </button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ManageListing;
