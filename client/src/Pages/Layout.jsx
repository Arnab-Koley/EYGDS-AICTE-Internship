import React, { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../Components/Nav/Navbar";
import Home from "./Home";
import Tour from "./Tour";
import Footer from "../Components/Nav/Footer";
import { useParams, Navigate } from "react-router-dom";
import Sidebar from "../Components/Nav/Sidebar";
import NavigationError from "./NavigationError";
import Account from "./Account";
import Wishlist from "./Wishlist";
import Notification from "./Notification";
import Host from "./Host";
import ProtectedHost from "../Context/ProtectedHost";
import Listings from "./Listings";

import { useHost } from "../Context/HostContext";
import HostError from "./HostError";
import Reservations from "./Reservations";
import NewListing from "../Components/Listings/New Listing/NewListing";
import EditListing from "../Components/Listings/Edit Listing/EditListing";
import ViewTour from "../Components/Tour/ViewTour";
import BookTour from "../Components/Tour/BookTour";
import ManageListing from "../Components/Listings/Manage Listing/ManageListing";

const Layout = ({ sidebarOpen, toggleSidebar }) => {
  const {auth} = useContext(AuthContext);
  const { section } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlistUpdating,setIsWishlistUpdating] = useState(false);

  const [user, setUser] = useState({
    email: "",
    name: "",
    mobile: "",
    gender: "",
    profileImg: "",
    account: "",
    isMailVerified: false,
    isPhoneVerified: false,
    isCompleted: false,
    wishlist: [],
  });

  useEffect(() => {

    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log("fetching user...")

        const serverUrl =
          process.env.NODE_ENV === "development"
            ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/user/getuser`
            : `${import.meta.env.VITE_API_PRODUCTION_URL}/auth/getuser`;

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
          console.error(
            "Error fetching data:",
            responseData.message || response.statusText
          );
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the async function
    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  
  const updateWishlist = async (tourId) => {
    if(!auth.isLoggedIn){
      toast.error("Please Sign in first");
      return;
    }
    if (isWishlistUpdating) {
      return;
    }
    const loadingToastId = toast.loading("Loading...");
    const start = Date.now();
    try {
      setIsWishlistUpdating(true);
      const serverUrl =
        process.env.NODE_ENV === "development"
          ? `${import.meta.env.VITE_API_DEVELOPMENT_URL}/user/updatewishlist`
          : `${import.meta.env.VITE_API_PRODUCTION_URL}/user/updatewishlist`;

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
        setUser((prev) => ({
          ...prev,
          wishlist: prev.wishlist.includes(tourId)
            ? prev.wishlist.filter((id) => id !== tourId)
            : [...prev.wishlist, tourId],
        }));
      } else {
        throw new Error(responseData.message || "Failed to update wishlist");
      }
    } catch (error) {
      toast.error(error.message, { id: loadingToastId, duration: 5000 });
    } finally {
      const elapsed = Date.now() - start;
      if (elapsed < 2000) {
        await new Promise((resolve) => setTimeout(resolve, 2000 - elapsed));
      }
      toast.dismiss(loadingToastId);
      setIsWishlistUpdating(false);
    }
  };

  const renderComponent = () => {
    switch (section) {
      case "account":
        return <Account user={user} setUser={setUser} isLoading={isLoading} />;
      case "booktour":
        return <BookTour user={user} />;
      case "editlisting":
        return (
          <ProtectedHost user={user}>
            <EditListing />
          </ProtectedHost>
        );

      case "home":
        return <Home />;
      case "host":
        return (
          <ProtectedHost user={user}>
            <Host />
          </ProtectedHost>
        );
      case "listings":
        return (
          <ProtectedHost user={user}>
            <Listings />
          </ProtectedHost>
        );
        case "managelisting":
          return (
            <ProtectedHost user={user}>
              <ManageListing />
            </ProtectedHost>
          );
      case "newlisting":
        return (
          <ProtectedHost user={user}>
            <NewListing />
          </ProtectedHost>
        );
      case "notification":
        return <Notification />;
      case "reservations":
        return (
          <ProtectedHost user={user}>
            <Reservations />
          </ProtectedHost>
        );
      case "tour":
        return <Tour user={user} updateWishlist={updateWishlist} />;
      case "viewtour":
        return <ViewTour user={user} updateWishlist={updateWishlist} />;
      case "wishlist":
        return <Wishlist user={user} updateWishlist={updateWishlist} isLoading={isLoading} />;

      default:
        return <NavigationError />;
    }
  };

  return (
    <div className="flex relative">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 w-full z-30"
          onClick={toggleSidebar}
        ></div>
      )}
      <div className="w-full h-screen overflow-y-scroll">
        <Navbar toggleSidebar={toggleSidebar} user={user} />
        {renderComponent()}
      </div>
    </div>
  );
};

export default Layout;
