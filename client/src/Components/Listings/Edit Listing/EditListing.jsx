import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Info from "./Info";
import Location from "./Location";
import Address from "./Address";
import Amenities from "./Amenities";
import Pricing from "./Pricing";
import toast from "react-hot-toast";

const EditListing = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const listingId = params.get("id");
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch the listing data based on the listingId
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

  const updateListingData = (field, value) => {
    setListing((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    if (isUpdating) return;

    const requiredFields = {
      title: "Title",
      description: "Description",
      "address.country": "Country",
      "address.streetAddress": "Street Address",
      "address.city": "City",
      "address.state": "State/union territory",
      "address.pinCode": "Pin Code",
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      const keys = field.split(".");
      let value = listing;
      for (const key of keys) {
        value = value?.[key];
      }

      if (!value || value.trim() === "") {
        toast.error(`${label} is required.`);
        return;
      }
    }

    setIsUpdating(true);
    const loadingToastId = toast.loading("Updating Listing...");
    const serverUrl =
      process.env.NODE_ENV === "development"
        ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/listing/updatelisting`
        : `${import.meta.env.VITE_API_PRODUCTION_URL}/listing/updatelisting`;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(serverUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ listingId, listing }),
      });

      const responseData = await response.json();
      if (response.ok) {
        toast.success(responseData.msg);
        navigate(-1);
      } else {
        toast.error(responseData.msg || "Failed to update listing.");
      }
    } catch (error) {
      toast.error("Error updating listing: " + error.message);
    } finally {
      toast.dismiss(loadingToastId);
      setIsUpdating(false);
    }
  };

  if (!listing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <div className="w-full mb-5">
        <IoIosArrowRoundBack
          size={40}
          className="bg-primarycolor p-1 rounded-full text-white"
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="flex flex-col">
        <Info data={listing} updateData={updateListingData} />
        <Location data={listing} updateData={updateListingData} />
        <Address data={listing} updateData={updateListingData} />
        <Amenities data={listing} updateData={updateListingData} />
        <Pricing data={listing} updateData={updateListingData} />
      </div>

      <button
        className="bg-primarycolor py-3 px-5 text-white font-semibold rounded-lg shadow-md fixed bottom-10 right-10 z-5"
        onClick={handleUpdate}
        disabled={isUpdating}
      >
        {isUpdating ? "Updating..." : "Update"}
      </button>
    </div>
  );
};

export default EditListing;
