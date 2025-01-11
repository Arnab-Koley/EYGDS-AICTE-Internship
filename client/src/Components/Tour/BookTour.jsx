import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import BasicDetails from "./BasicDetails";
import Address from "./Address";
import TourDetails from "./TourDetails";

const BookTour = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const tourId = params.get("id");
  const [tour, setTour] = useState(null);
  const [hostId, setHostId] = useState("");
  const [host, setHost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHostLoading, setIsHostLoading] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    tourId: tourId,
    title: "",
    name: "",
    primaryPhoneNo: "",
    secondaryPhoneNo: "",
    primaryEmail: "",
    secondaryEmail: "",
    address: {
      country: "India",
      flatHouse: "",
      streetAddress: "",
      landmark: "",
      districtLocality: "",
      city: "",
      state: "",
      pinCode: "",
    },
    guests: {
      adult: 1,
      teen: 0,
      child: 0,
      infant: 0,
      pet: 0,
    },
    checkInDate: "",
    checkOutDate: "",
    price: 0,
  });

  const [pricing, setPricing] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      if (isLoading) {
        return;
      }
      try {
        setIsLoading(true);
        const serverUrl =
          process.env.NODE_ENV === "development"
            ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/tour/gettourbyid`
            : `${import.meta.env.VITE_API_PRODUCTION_URL}/tour/gettourbyid`;

        const response = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tourId }),
        });

        const responseData = await response.json();
        if (responseData.success) {
          setTour(responseData.tour);
          setHostId(responseData.tour.owner);
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

  useEffect(() => {
    const fetchHost = async () => {
      if (isHostLoading) return;
      try {
        setIsHostLoading(true);
        const serverUrl =
          process.env.NODE_ENV === "development"
            ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/user/gethost`
            : `${import.meta.env.VITE_API_PRODUCTION_URL}/user/gethost`;

        const response = await fetch(serverUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hostId }),
        });

        const responseData = await response.json();
        if (responseData.success) {
          setHost(responseData.host);
        } else {
          console.error("Failed to fetch host: " + responseData.msg);
        }
      } catch (error) {
        console.error("Error fetching host: " + error.message);
      } finally {
        setIsHostLoading(false);
      }
    };

    if (hostId) {
      fetchHost();
    }
  }, [hostId]);

  const handleInputChange = (field, value) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);
    setPricing(calculateTotalPrice(updatedFormData)); // Recalculate pricing
  };

  const handleAddressChange = (field, value) => {
    setFormData({
      ...formData,
      address: { ...formData.address, [field]: value },
    });
  };

  const handleGuestChange = (field, value) => {
    const updatedFormData = {
      ...formData,
      guests: { ...formData.guests, [field]: value },
    };
    setFormData(updatedFormData);
    setPricing(calculateTotalPrice(updatedFormData));
  };



  const calculateTotalPrice = (formData) => {
    const checkInDate = new Date(formData.checkInDate);
    const checkOutDate = new Date(formData.checkOutDate);
    const numberOfNights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

    if (isNaN(numberOfNights) || numberOfNights <= 0) return null;

    const priceBreakdown = [
      { type: "Adult", count: formData.guests.adult, price: tour.price.adult },
      { type: "Teen", count: formData.guests.teen, price: tour.price.teen },
      { type: "Child", count: formData.guests.child, price: tour.price.child },
      {
        type: "Infant",
        count: formData.guests.infant,
        price: tour.price.infant,
      },
      { type: "Pet", count: formData.guests.pet, price: tour.price.pet },
    ];

    const totalPrices = priceBreakdown.map(({ type, count, price }) => ({
      type,
      pricePerNight: price,
      total: count * price * numberOfNights,
    }));

    return { numberOfNights, totalPrices };
  };

  const isFormValid = () => {
    const {
      tourId,
      name,
      primaryPhoneNo,
      primaryEmail,
      checkInDate,
      checkOutDate,
      address,
      guests,
    } = formData;

    return (
      tourId &&
      name &&
      primaryPhoneNo &&
      primaryEmail &&
      checkInDate &&
      checkOutDate &&
      termsAccepted &&
      address.country &&
      address.streetAddress &&
      address.city &&
      address.state &&
      address.pinCode &&
      guests.adult >= 1
    );
  };


  const handleSubmit = async () => {
    if(isSubmitting){
      return;
    }

    const totalPrice = pricing.totalPrices.reduce((acc, { total }) => acc + total, 0);

    const updatedFormData = {
      ...formData,
      price: totalPrice,
      title: `Trip to ${tour.address.state}`
    };

    const loadingToastId = toast.loading("Submitting...");
    const start = Date.now();

    try {
      setIsSubmitting(true);
      const serverUrl =
          process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/reservation/createreservation`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/reservation/createreservation`;

      const token = localStorage.getItem("token");

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      });

      const responseData = await response.json();
      if (responseData.success) {
        const elapsed = Date.now() - start;
        if (elapsed < 2000) {
          await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);
        navigate('/mytours');
        setFormData({
          tourId: tourId,
          title: "",
          name: "",
          primaryPhoneNo: "",
          secondaryPhoneNo: "",
          primaryEmail: "",
          secondaryEmail: "",
          address: {
            country: "India",
            flatHouse: "",
            streetAddress: "",
            landmark: "",
            districtLocality: "",
            city: "",
            state: "",
            pinCode: "",
          },
          guests: {
            adult: 1,
            teen: 0,
            child: 0,
            infant: 0,
            pet: 0,
          },
          checkInDate: "",
          checkOutDate: "",
          price: 0,
        });
      } else {
        toast.error("Failed to booking tour: " + responseData.msg);
      }
    } catch (error) {
      toast.error(error.message, { id: loadingToastId });
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < 2000) {
        await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
      }
      toast.dismiss(loadingToastId);
      setIsSubmitting(false);
    }
  };

      
  if (isLoading || isHostLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <div className="w-full mb-5">
        <IoIosArrowRoundBack
          size={40}
          className="bg-primarycolor p-1 rounded-full text-white cursor-pointer"
          onClick={() => navigate(`/viewtour?id=${tourId}`)}
        />
      </div>

      <div className="flex justify-center">
        <div className="shadow-md  rounded-md">
          <div className="bg-primarycolor relative rounded-t-md">
            <h1 className="text-2xl w-full text-center text-white font-semibold py-2">
              Booking Form
            </h1>
            <div className="relative">
              {tour && (
                <div className="w-full relative">
                  <div className="relative">
                    <img
                      src={tour.coverPhoto}
                      alt=""
                      className="h-40 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  </div>
                  <div className="absolute inset-0 flex flex-col p-4 justify-center">
                    <h3 className="text-2xl text-white font-bold">
                      {tour.title}
                    </h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <img
                        src={host.profileImg}
                        alt=""
                        className="h-12 w-12 rounded-full border-2 object-cover"
                      />
                      <h3 className="text-lg text-white">{host.name}</h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="px-10 max-sm:px-5 pb-10">
            <h1 className="text-center text-xl mt-10 font-semibold">
              Basic Details
            </h1>
            <BasicDetails
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <h1 className="text-center text-xl mt-10 font-semibold">Address</h1>
            <Address
              formData={formData}
              handleAddressChange={handleAddressChange}
            />
            <h1 className="text-center text-xl mt-10 font-semibold">
              Tour Details
            </h1>
            <TourDetails
              formData={formData}
              handleInputChange={handleInputChange}
              handleGuestChange={handleGuestChange}
              tour={tour}
            />
            <h1 className="text-center text-xl mt-10 font-semibold">Pricing</h1>
            {pricing ? (
              <div>
                <h3 className="text-lg">
                  No of nights:
                  <span className="font-semibold ml-2">
                    {pricing.numberOfNights}
                  </span>
                </h3>
                <table className="w-full text-left mt-2">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="border-2 border-gray-300 py-2 px-4">
                        Guest Type
                      </th>
                      <th className="border-2 border-gray-300 py-2 px-4">
                        Price/night
                      </th>
                      <th className="border-2 border-gray-300 py-2 px-4">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricing.totalPrices.map(
                      ({ type, pricePerNight, total }) => (
                        <tr key={type}>
                          <td className="border-2 border-gray-300 py-2 px-4 bg-gray-50">
                            {type}
                          </td>
                          <td className="border-2 border-gray-300 py-2 px-4 bg-gray-50">
                            ₹{pricePerNight}
                          </td>
                          <td className="border-2 border-gray-300 py-2 px-4 bg-gray-50">
                            ₹{total}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
                <h3 className="text-lg mt-2">
                  Total Price:
                  <span className="font-semibold ml-2">
                    ₹
                    {pricing.totalPrices.reduce(
                      (acc, { total }) => acc + total,
                      0
                    )}
                  </span>
                </h3>
              </div>
            ) : (
              <h1 className="text-gray-500 mt-2">
                Fill the check-in check-out date to see price
              </h1>
            )}
            <div className="flex mt-4">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="mr-2"
              />
              <label className="text-sm">
                I accept the{" "}
                <span
                onClick={() => {
                  navigate(`/viewtour?id=${tourId}#house-rule-policy`);
                }}
                className="text-primarycolor underline">house rules, cancellation & refund policy</span> and
                confirm that all details are correct.
              </label>
            </div>
            <div className="w-full flex justify-center mt-5">
              <button
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                className={`px-6 py-3 rounded-lg ${
                  isFormValid()
                    ? "bg-primarycolor text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                } text-lg`}
              >
                Confirm Reservation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTour;
