import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

import amenitiesData from "../../assets/data/amenitiesData";
import standoutAmenitiesData from "../../assets/data/standoutAmenitiesData";
import safetyItemsData from "../../assets/data/safetyItemsData";

import { IoIosArrowRoundBack } from "react-icons/io";
import { MdCurrencyRupee } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { PiBroomFill } from "react-icons/pi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { IoChatboxOutline } from "react-icons/io5";
import { CiMap } from "react-icons/ci";
import { CiShoppingTag } from "react-icons/ci";

import timeAgo from "../../Utils/timeAgo";
import ViewMap from "../../Utils/ViewMap";
import BookTourPopup from "../Popup/BookTourPopup";

const ViewTour = (props) => {
  const user = props.user;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tourId = params.get("id");
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hostId, setHostId] = useState("");
  const [host, setHost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  const [isHostLoading, setIsHostLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const [popupType, setPopupType] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);
  const [isPolicyExpanded, setIsPolicyExpanded] = useState(false);

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
          const { cleanliness, accuracy, communication, location, value } =
            responseData.tour.rating;
          const avgRating = (
            (cleanliness + accuracy + communication + location + value) /
            5
          ).toFixed(1);

          setRating(avgRating); // Ensure avgRating is a number
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
    const fetchReviews = async () => {
      if (isReviewsLoading) return;

      try {
        setIsReviewsLoading(true);
        const reviewsUrl =
            process.env.NODE_ENV === "development"
            ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/review/getreviewbyid`
            : `${import.meta.env.VITE_API_PRODUCTION_URL}/review/getreviewbyid`;

        const response = await fetch(reviewsUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tourId }),
        });

        const responseData = await response.json();
        if (responseData.success) {
          setReviews(responseData.reviews);
        } else {
          console.error("Failed to fetch reviews: " + responseData.msg);
        }
      } catch (error) {
        console.error("Error fetching reviews: " + error.message);
      } finally {
        setIsReviewsLoading(false);
      }
    };

    if (tourId) {
      fetchReviews();
    }
  }, [tourId]);

  useEffect(() => {
    const fetchHost = async () => {
      if (isHostLoading) return;
      try {
        setIsHostLoading(true);
        const reviewsUrl =
            process.env.NODE_ENV === "development"
            ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/user/gethost`
            : `${import.meta.env.VITE_API_PRODUCTION_URL}/user/gethost`;

        const response = await fetch(reviewsUrl, {
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

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePolicyToggle = () => {
    setIsPolicyExpanded(!isPolicyExpanded);
  };

  const handleBooking = () => {
    if (auth.isLoggedIn) {
      let msg = "";
      if (!user.isMailVerified) {
        msg += "Your email is not verified. ";
      }
      if (!user.isPhoneVerified) {
        msg += "Your phone number is not verified.";
      }
      if (msg) {
        setPopupType("verification");
        setPopupMsg(msg);
        setShowPopup(true);
      } else {
        navigate(`/booktour?id=${tour._id}`);
      }
    } else {
      setPopupType("authentication");
      setPopupMsg("Please login to your account before booking a tour");
      setShowPopup(true);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 pb-24">
      <div className="w-full mb-5">
        <IoIosArrowRoundBack
          size={40}
          className="bg-primarycolor p-1 rounded-full text-white"
          onClick={() => navigate("/tour")}
        />
      </div>
      {showPopup && (
        <BookTourPopup
          type={popupType}
          msg={popupMsg}
          onClose={() => setShowPopup(false)}
        />
      )}
      {tour ? (
        <div className="md:px-20">
          <h1 className="text-3xl font-semibold">{tour.title}</h1>
          <img
            src={tour.coverPhoto}
            alt="coverphoto"
            className="h-72 w-96 mt-5 object-cover rounded-lg"
          />
          <h3 className="text-xl font-semibold mt-3">
            {tour.propertyType} in {tour.address.city}, {tour.address.state}
          </h3>
          <h3>
            {tour.basics.guests} guests . {tour.basics.bedrooms} bedroom .{" "}
            {tour.basics.beds} beds . {tour.basics.bathrooms} bathroom
          </h3>
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-2">
              <FaStar size={20} />
              <h3 className="text-lg">
                {rating} | {reviews.length} reviews
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <MdCurrencyRupee size={20} />
              <h3 className="text-lg">{tour.price.adult}/night</h3>
            </div>
          </div>

          <div className="flex md:space-x-14 max-md:flex-col">
            <div className="md:w-1/2">
              <div className="h-[1px] bg-gray-400 mt-5"></div>
              <div className="flex items-center space-x-5 my-5">
                <img
                  src={host.profileImg}
                  alt=""
                  className="h-12 w-12 rounded-full border-2 object-cover"
                />
                <div>
                  <h3>{host.name}</h3>
                  <h1>{timeAgo(host.createdAt)}</h1>
                </div>
              </div>

              <div className="h-[1px] bg-gray-400 mb-5"></div>
              <pre className=" whitespace-pre-wrap">{tour.description}</pre>
              <h3 className="text-xl font-semibold mt-5 mb-3">Safety Items</h3>
              {safetyItemsData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 my-1">
                  <item.icon
                    size={24}
                    className={
                      tour.safetyItems.includes(item.label)
                        ? ""
                        : "text-gray-400"
                    }
                  />
                  <span
                    className={
                      tour.safetyItems.includes(item.label)
                        ? ""
                        : "line-through text-gray-500"
                    }
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="md:w-1/2 mt-5">
              <h1 className="text-xl font-semibold">What this place offers</h1>
              <div className="grid grid-cols-2  gap-2 mt-4">
                {[...amenitiesData, ...standoutAmenitiesData]
                  .sort((a, b) => {
                    const isPresentA =
                      tour.amenities.includes(a.label) ||
                      tour.standoutAmenities.includes(a.label);
                    const isPresentB =
                      tour.amenities.includes(b.label) ||
                      tour.standoutAmenities.includes(b.label);
                    return isPresentB - isPresentA; // Sort present first
                  })
                  .map((item, index) => {
                    const isPresent =
                      tour.amenities.includes(item.label) ||
                      tour.standoutAmenities.includes(item.label);
                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <item.icon
                          size={24}
                          className={isPresent ? "text-black" : "text-gray-400"}
                        />
                        <span
                          className={`text-base ${
                            !isPresent && "line-through text-gray-500"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="h-[1px] bg-gray-400 my-5"></div>

          <div className="flex items-center space-x-2 text-2xl">
            <FaStar />
            <h3 className="">
              {rating} | {reviews.length} reviews
            </h3>
          </div>
          <div className="flex max-md:grid max-md:grid-cols-3 max-md:gap-3 max-sm:grid-cols-2  mt-5 w-full ">
            <div className="flex flex-col md:pr-5">
              <h3>Cleanliness</h3>
              <h3 className="font-semibold text-xl">
                {tour.rating.cleanliness.toFixed(1)}
              </h3>
              <PiBroomFill size={35} />
            </div>
            <div className="w-[1px] bg-black max-md:hidden"></div>
            <div className="flex flex-col md:px-5">
              <h3>Accuracy</h3>
              <h3 className="font-semibold text-xl">
                {tour.rating.accuracy.toFixed(1)}
              </h3>
              <IoCheckmarkCircleOutline size={35} />
            </div>
            <div className="w-[1px] bg-black max-md:hidden"></div>
            <div className="flex flex-col md:px-5">
              <h3>Communication</h3>
              <h3 className="font-semibold text-xl">
                {tour.rating.communication.toFixed(1)}
              </h3>
              <IoChatboxOutline size={35} />
            </div>
            <div className="w-[1px] bg-black max-md:hidden"></div>
            <div className="flex flex-col md:px-5">
              <h3>Location</h3>
              <h3 className="font-semibold text-xl">
                {tour.rating.location.toFixed(1)}
              </h3>
              <CiMap size={35} />
            </div>
            <div className="w-[1px] bg-black max-md:hidden"></div>
            <div className="flex flex-col md:px-5">
              <h3>Value</h3>
              <h3 className="font-semibold text-xl">
                {tour.rating.value.toFixed(1)}
              </h3>
              <CiShoppingTag size={35} />
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="w-full flex justify-center font-semibold text-gray-400 text-xl my-10">
              No Reviews to show
            </div>
          ) : (
            <div>Reviews</div>
          )}

          <div className="h-[1px] bg-gray-400"></div>
          <div className=" text-lg font-semibold mt-3">
            {tour.address.flatHouse && (
              <h3>
                Flat, house, etc.:{" "}
                <span className="font-normal">{tour.address.flatHouse}</span>
              </h3>
            )}
            {tour.address.streetAddress && (
              <h3>
                Street Address:{" "}
                <span className="font-normal">
                  {tour.address.streetAddress}
                </span>
              </h3>
            )}
            {tour.address.landmark && (
              <h3>
                Nearby Landmark:{" "}
                <span className="font-normal">{tour.address.landmark}</span>
              </h3>
            )}
            {tour.address.districtLocality && (
              <h3>
                District / locality:{" "}
                <span className="font-normal">
                  {tour.address.districtLocality}
                </span>
              </h3>
            )}
            {tour.address.city && (
              <h3>
                City: <span className="font-normal">{tour.address.city}</span>
              </h3>
            )}
            {tour.address.state && (
              <h3>
                State / union territory:{" "}
                <span className="font-normal">{tour.address.state}</span>
              </h3>
            )}
            {tour.address.pinCode && (
              <h3>
                Pin Code:{" "}
                <span className="font-normal">{tour.address.pinCode}</span>
              </h3>
            )}
            {tour.address.specificLocation && (
              <div className="mt-5">
                <h2 className="text-xl font-semibold mb-2">Where you'll be</h2>
                <ViewMap specificLocation={tour.address.specificLocation} />
              </div>
            )}
          </div>
          <div className="h-[1px] bg-gray-400 mt-10 mb-5"></div>
          <h1 className="text-xl font-semibold">Things to know</h1>
          <div className="mt-3 flex w-full lg:space-x-3 max-lg:space-y-3 max-lg:flex-col">
            <div className="lg:w-1/3">
              <h3 className="font-medium mb-3">House Rules</h3>
              <h4>Check-in : {tour.checkInTime}</h4>
              <h4>Checkout : {tour.checkOutTime}</h4>
              <h4 className="mt-3">
                Adult(Age 18+) :{" "}
                {tour.guestType.adult ? "allowed" : "not allowed"}
              </h4>
              <h4>
                Teen(13-17) : {tour.guestType.teen ? "allowed" : "not allowed"}
              </h4>
              <h4>
                Child(2-12) : {tour.guestType.child ? "allowed" : "not allowed"}
              </h4>
              <h4>
                Infant(Under 2) :{" "}
                {tour.guestType.infant ? "allowed" : "not allowed"}
              </h4>
              <h4>Pet : {tour.guestType.pet ? "allowed" : "not allowed"}</h4>
            </div>
            <div className="lg:w-1/3">
              <h3 className="font-medium mb-3">Safety & property</h3>
              {tour.safetyDetails.exteriorSecurityCamera ? (
                <h3>Exterior security camera present</h3>
              ) : (
                <h3>No exterior security camera present</h3>
              )}
              {tour.safetyDetails.noiseDecibelMonitor ? (
                <h3>Noise decibel monitor present</h3>
              ) : (
                <h3>No noise decibel monitor present</h3>
              )}
              {tour.safetyDetails.weaponsOnProperty ? (
                <h3>Weapon present on the property</h3>
              ) : (
                <h3>No weapon present on the property</h3>
              )}
              {tour.safetyDetails.safetyInfo && (
                <div>
                  <h3 className="mt-3">
                    {tour.safetyDetails.safetyInfo.length > 100
                      ? isExpanded
                        ? tour.safetyDetails.safetyInfo
                        : `${tour.safetyDetails.safetyInfo.slice(0, 100)}...`
                      : tour.safetyDetails.safetyInfo}
                  </h3>
                  {tour.safetyDetails.safetyInfo.length > 100 && (
                    <button
                      onClick={handleToggle}
                      className="text-primarycolor mt-2"
                    >
                      {isExpanded ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="lg:w-1/3">
              <h3 className="font-medium mb-3">Cancellation & Refund policy</h3>
              <p className="">
                {tour.refundPolicy && (
                  <div>
                    <h3 className="mt-3">
                      {tour.refundPolicy.length > 200
                        ? isPolicyExpanded
                          ? tour.refundPolicy
                          : `${tour.refundPolicy.slice(0, 200)}...`
                        : tour.refundPolicy}
                    </h3>
                    {tour.refundPolicy.length > 200 && (
                      <button
                        onClick={handlePolicyToggle}
                        className="text-primarycolor mt-2"
                      >
                        {isPolicyExpanded ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                )}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>No tour data available</div>
      )}
      <button
        className="bg-primarycolor text-xl py-3 px-5 text-white font-semibold rounded-full shadow-md fixed bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-5"
        onClick={handleBooking}
      >
        Book Tour
      </button>
    </div>
  );
};

export default ViewTour;
