import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { formatDate } from "../../Utils/formatDate";

import { MdDelete } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";

const ViewMyTour = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tourId = params.get("id");
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [user, setUser] = useState(null);
  const [transaction, setTransaction] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const statusDescriptions = {
    Pending: "Waiting for the host to approve your booking.",
    Approved: "Congratulations! Your booking is approved.",
    Rejected: "Your booking has been rejected.",
    Paid: "Congratulations! Your payment is completed.",
    "Checked In": "You have successfully checked in.",
    "Checked Out": "You have successfully checked out.",
  };

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

  useEffect(() => {
    const fetchTransaction = async () => {
      if (isTransactionLoading) {
        return;
      }
      try {
        setIsTransactionLoading(true);
        const serverUrl =
          process.env.NODE_ENV === "development"
            ? `${
                import.meta.env.VITE_API_DEVELOPMENT_URL
              }/transaction/getdetails`
            : `${
                import.meta.env.VITE_API_PRODUCTION_URL
              }/transaction/getdetails`;

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
          setTransaction(responseData.transaction);
        } else {
          console.error("Failed to fetch transaction: " + responseData.msg);
        }
      } catch (error) {
        console.error("Error fetching transaction: " + error.message);
      } finally {
        setIsTransactionLoading(false);
      }
    };

    if (tourId) {
      fetchTransaction();
    }
  }, [tourId]);


  useEffect(() => {
    const fetchUser = async () => {
      if (isUserLoading) return;

      try {
        setIsUserLoading(true);
        const serverUrl =
          process.env.NODE_ENV === "development"
            ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/user/getuser`
            : `${import.meta.env.VITE_API_PRODUCTION_URL}/user/getuser`;
        const token = localStorage.getItem("token");

        const response = await fetch(serverUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        if (response.ok) {
          setUser(responseData.user);
        } else {
          console.error("Error fetching user data:", responseData.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handlePayment = async () => {
    if (!tour || !user) {
      toast.error("Tour or user details missing.");
      return;
    }

    try {

      const token = localStorage.getItem("token");
      const serverUrl =
        process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/transaction/createorder`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/transaction/createorder`;

      const response = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: tour.price,
          currency: "INR",
          reservationId: tourId,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        const { order } = responseData;

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "Tour Payment",
          description: `Payment for ${tour.title}`,
          order_id: order.id,
          handler: async function (response) {
            await verifyPayment(response, order.id);
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.mobile,
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error("Failed to create payment order.");
      }
    } catch (error) {
      toast.error("Error initiating payment: " + error.message);
    }
  };

  const verifyPayment = async (response, orderId) => {
    try {
      const token = localStorage.getItem("token");
      const serverUrl =
        process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/transaction/verify`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/transaction/verify`;

      const verificationResponse = await fetch(serverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          reservationId: tourId,
          amount: tour.price,
        }),
      });

      const verificationData = await verificationResponse.json();

      if (verificationData.success) {
        toast.success("Payment successfully verified!");
        window.location.reload();
      } else {
        toast.error("Payment verification failed.");
      }
    } catch (error) {
      toast.error("Error verifying payment: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }
    const loadingToastId = toast.loading("Canceling...");
    const start = Date.now();
    try {
      setIsDeleting(true);
      const serverUrl =
        process.env.NODE_ENV === "development"
          ? `${
              import.meta.env.VITE_API_DEVELOPMENT_URL
            }/reservation/deletereservation`
          : `${
              import.meta.env.VITE_API_PRODUCTION_URL
            }/reservation/deletereservation`;

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
        const elapsed = Date.now() - start;
        if (elapsed < 2000) {
          await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
        }
        toast.success(responseData.msg);
        navigate("/mytours");
      } else {
        toast.error("Failed to cancel booking: " + responseData.msg);
      }
    } catch (error) {
      toast.error(error.message, { id: loadingToastId });
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < 2000) {
        await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
      }
      toast.dismiss(loadingToastId);
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <div className="w-full mb-5">
        <IoIosArrowRoundBack
          size={40}
          className="bg-primarycolor p-1 rounded-full text-white cursor-pointer"
          onClick={() => navigate('/mytours')}
        />
      </div>
      {tour ? (
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-primarycolor text-center">
            Details of {tour.title}
          </h3>
          <div className="w-full flex justify-center">
            <button
              onClick={() => navigate(`/viewtour?id=${tour.tourId}`)}
              className="bg-primarycolor rounded-full px-5 py-2 mt-3 font-semibold text-white"
            >
              View Destination
            </button>
          </div>
          <div className="flex flex-wrap mt-5">
            <div className="m-2">
              <div className="bg-white p-3 rounded-lg shadow-md border-2 font-semibold">
                <h3>
                  Name:<span className="font-normal ml-2">{tour.name}</span>
                </h3>
                <h3>
                  Primary Phone:
                  <span className="font-normal ml-2">
                    {tour.primaryPhoneNo}
                  </span>
                </h3>
                <h3>
                  Secondary Phone:
                  <span className="font-normal ml-2">
                    {tour.secondaryPhoneNo || "N/A"}
                  </span>
                </h3>
                <h3>
                  Primary Email:
                  <span className="font-normal ml-2">{tour.primaryEmail}</span>
                </h3>
                <h3>
                  Secondary Email:
                  <span className="font-normal ml-2">
                    {tour.secondaryEmail || "N/A"}
                  </span>
                </h3>
              </div>
            </div>

            <div className="m-2">
              <div className="bg-white p-3 rounded-lg shadow-md border-2 font-semibold">
                <h3>
                  Country:
                  <span className="font-normal ml-2">
                    {tour.address.country}
                  </span>
                </h3>
                <h3>
                  Flat/House:
                  <span className="font-normal ml-2">
                    {tour.address.flatHouse || "N/A"}
                  </span>
                </h3>
                <h3>
                  Street Address:
                  <span className="font-normal ml-2">
                    {tour.address.streetAddress}
                  </span>
                </h3>
                <h3>
                  Nearby Landmark
                  <span className="font-normal ml-2">
                    {tour.address.landmark || "N/A"}
                  </span>
                </h3>
                <h3>
                  District/Locality:
                  <span className="font-normal ml-2">
                    {tour.address.districtLocality || "N/A"}
                  </span>
                </h3>
                <h3>
                  City:
                  <span className="font-normal ml-2">{tour.address.city}</span>
                </h3>
                <h3>
                  State:
                  <span className="font-normal ml-2">{tour.address.state}</span>
                </h3>
                <h3>
                  Pin Code:
                  <span className="font-normal ml-2">
                    {tour.address.pinCode}
                  </span>
                </h3>
              </div>
            </div>

            <div className="m-2">
              <div className="bg-white p-3 rounded-lg shadow-md border-2 font-semibold">
                <h3>
                  Adults:
                  <span className="font-normal ml-2">{tour.guests.adult}</span>
                </h3>
                <h3>
                  Teens:
                  <span className="font-normal ml-2">{tour.guests.teen}</span>
                </h3>
                <h3>
                  Children:
                  <span className="font-normal ml-2">{tour.guests.child}</span>
                </h3>
                <h3>
                  Infants:
                  <span className="font-normal ml-2">{tour.guests.infant}</span>
                </h3>
                <h3>
                  Pets:
                  <span className="font-normal ml-2">{tour.guests.pet}</span>
                </h3>
              </div>
            </div>

            <div className="m-2">
              <div className="bg-white p-3 rounded-lg shadow-md border-2 font-semibold">
                <h3>
                  Check-in Date:
                  <span className="font-normal ml-2">
                    {formatDate(tour.checkInDate)}
                  </span>
                </h3>
                <h3>
                  Check-out Date:
                  <span className="font-normal ml-2">
                    {formatDate(tour.checkOutDate)}
                  </span>
                </h3>
              </div>
            </div>

            <div className="m-2">
              <div className="bg-white p-3 rounded-lg shadow-md border-2 font-semibold">
                <h3>
                  Price:<span className="font-normal ml-2">₹{tour.price}</span>
                </h3>
              </div>
            </div>
          </div>

          <div className="w-full flex mt-5">
            <div
              className={`bg-white p-5 rounded-lg border-2 border-primarycolor`}
            >
              <h2 className="font-semibold text-lg">
                Status:
                <span
                  className={`ml-2 ${
                    tour.status === "Pending" || tour.status === "Rejected"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {tour.status}
                </span>
              </h2>
              <h3 className="text-gray-600">
                {statusDescriptions[tour.status]}
              </h3>
              {transaction && tour.status === "Paid" && (
                <div className="font-semibold mt-2 bg-blue-100 p-3 rounded-lg">
                  <h3>
                    Transaction ID:
                    <span className="font-normal ml-2">
                      {transaction.transactionId}
                    </span>
                  </h3>
                  <h3>
                    Payment method:
                    <span className="font-normal ml-2">
                      {transaction.method}
                    </span>
                  </h3>
                  <h3>
                    Amount:
                    <span className="font-normal ml-2">
                      ₹{transaction.amount}
                    </span>
                  </h3>
                  <h3>
                    Date & Time:
                    <span className="font-normal ml-2">
                      {new Date(tour.createdAt).toLocaleString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </h3>
                </div>
              )}
            </div>
          </div>

          {tour.status === "Pending" && (
            <div className="flex mt-5 justify-center">
              <button
                onClick={handleDelete}
                className="bg-red-600 rounded-md p-3 text-white flex"
                disabled={isDeleting}
              >
                <MdDelete size={25} className="mr-2" />
                Cancel Booking
              </button>
            </div>
          )}
          {tour.status === "Approved" && (
            <div className="flex mt-5 justify-center">
              <button
                onClick={handlePayment}
                className="bg-primarycolor rounded-md p-3 text-white flex"
              >
                <MdOutlinePayment size={25} className="mr-2" />
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">Tour not found</p>
      )}
    </div>
  );
};

export default ViewMyTour;
