import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import BounceLoader from "../Loaders/BounceLoader";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tourId = params.get("id");

  const [user, setUser] = useState(null);
  const [tour, setTour] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");

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
      setPaymentStatus("loading");

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
        setPaymentStatus("failed");
      }
    } catch (error) {
      toast.error("Error initiating payment: " + error.message);
      setPaymentStatus("failed");
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
        setPaymentStatus("completed");
        navigate(`/viewmytour?id=${tourId}`);
      } else {
        toast.error("Payment verification failed.");
        setPaymentStatus("failed");
      }
    } catch (error) {
      toast.error("Error verifying payment: " + error.message);
      setPaymentStatus("failed");
    }
  };

  if (isLoading || isUserLoading) {
    return <BounceLoader />;
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
      <div className="flex items-center justify-center">
        {tour && (
          <div className="border-2 shadow-md p-5 w-[400px] rounded-md">
            <h1 className="text-2xl font-semibold text-center text-primarycolor">{tour.title}</h1>
            <h2 className="font-semibold mt-2 text-xl">Price: ₹{tour.price}</h2>
            <button
              onClick={handlePayment}
              className="bg-primarycolor text-white py-2 px-4 rounded-md w-full mt-3"
              disabled={paymentStatus === "loading"}
            >
              {paymentStatus === "loading" ? "Processing..." : "Pay Now"}
            </button>
            {paymentStatus === "failed" && (
              <p className="text-red-500">Payment failed, please try again.</p>
            )}
            {paymentStatus === "completed" && (
              <p className="text-green-500">Payment completed successfully!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
