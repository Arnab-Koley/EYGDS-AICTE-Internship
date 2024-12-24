import React,{useState,useEffect} from "react";
import Navbar from "../Components/Nav/Navbar";
import Home from "./Home";
import Tour from "./Tour";
import Footer from "../Components/Nav/Footer";
import { useParams } from "react-router-dom";
import Sidebar from "../Components/Nav/Sidebar";
import NavigationError from "./NavigationError";
import Account from "./Account";
import Wishlist from "./Wishlist";
import Notification from "./Notification";
import Host from "./Host";

const Layout = ({ sidebarOpen, toggleSidebar }) => {
  const { section } = useParams();
  const [isLoading, setIsLoading] = useState(false);


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
  });


  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      try {
        setIsLoading(true);

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
          setUser(responseData.user); // Update the user state with the response
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


  const renderComponent = () => {
    switch (section) {
      case "account":
        return <Account user={user} setUser={setUser} isLoading={isLoading} />;
      case "home":
        return <Home />;
      case "host":
        return <Host />
      case "notification":
        return <Notification />;
      case "tour":
        return <Tour />;
      case "wishlist":
        return <Wishlist />;

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
