

import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ListLoader from "../../Loaders/ListLoader";

import { IoShirt } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";

const TourGuide = ({ tourId, checkInDate, checkOutDate }) => {
  const [tour, setTour] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [clothingSuggestions, setClothingSuggestions] = useState([]);
  const [safetyTips, setSafetyTips] = useState([]);
  const [recommendedAttractions, setRecommendedAttractions] = useState([]);

  const [isContentLoading, setIsContentLoading] = useState(false);
  const [isClothLoading, setIsClothLoading] = useState(false);
  const [isAttractionLoading, setIsAttractionLoading] = useState(false);
  const [isSafetyLoading, setIsSafetyLoading] = useState(false);

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

  const duration = tour
    ? Math.ceil(
        (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 3600 * 24)
      )
    : 0;

  const clothingPrompt = tour
    ? `Suggest appropriate casual, location-specific & weather-specific clothing for a traveler for ${duration} days starting from ${tour.address.checkInDate} at ${tour.address.streetAddress}, ${tour.address.city}, ${tour.address.state}.`
    : "";
  const safetyPrompt = tour
    ? `Provide safety tips for a traveler in ${tour.address.city}, ${tour.address.state}, considering the duration of ${duration} days starting from ${checkInDate}.`
    : "";
  const attractionsPrompt = tour
    ? `Recommend top attractions to visit in ${tour.address.city}, ${tour.address.state} for ${duration} days, starting from ${tour.address.checkInDate}.`
    : "";

  // Function to fetch content based on the prompt
  const fetchContent = async (type, prompt, setContent, schema) => {
    if (type === "cloth") {
      if (isClothLoading || !prompt) {
        return;
      }
    } else if (type === "attraction") {
      if (isAttractionLoading || !prompt) {
        return;
      }
    } else if (type === "safety") {
      if (isSafetyLoading || !prompt) {
        return;
      }
    } else {
      if (isContentLoading || !prompt) return;
    }

    try {
      if (type === "cloth") {
        setIsClothLoading(true);
      } else if (type === "attraction") {
        setIsAttractionLoading(true);
      } else if (type === "safety") {
        setIsSafetyLoading(true);
      } else {
        setIsContentLoading(true);
      }

      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });

      const result = await model.generateContent(prompt);

      console.log("Fetched Content: ", result.response);

      const contentText =
        result.response.candidates && result.response.candidates.length > 0
          ? result.response.candidates[0].content.parts[0].text
          : "No content available";

      const parsedContent = contentText ? JSON.parse(contentText) : [];

      setContent(parsedContent);
    } catch (error) {
      console.error("Error fetching content:", error.message);
    } finally {
      if (type === "cloth") {
        setIsClothLoading(false);
      } else if (type === "attraction") {
        setIsAttractionLoading(false);
      } else if (type === "safety") {
        setIsSafetyLoading(false);
      } else {
        setIsContentLoading(false);
      }
    }
  };

  const clothingSchema = {
    description: "Clothing suggestions for travelers",
    type: "array",
    items: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description:
            "The category of clothing 'Casual', 'Location-specific', 'Weather-specific'",
        },
        suggestions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              item: {
                type: "string",
                description: "The clothing item being suggested",
              },
              reason: {
                type: "string",
                description: "The reason or context for suggesting this item",
              },
            },
            required: ["item", "reason"],
          },
        },
      },
      required: ["category", "suggestions"],
    },
  };

  const attractionsSchema = {
    description:
      "Recommended attractions for travelers based on their destination",
    type: "array",
    items: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Name of the place",
        },
        description: {
          type: "string",
          description: "Description of the place",
        },
      },
      required: ["name", "description"],
    },
  };

  const safetySchema = {
    description: "Safety tips for travelers based on their destination",
    type: "array",
    items: {
      type: "object",
      properties: {
        type: {
          type: "string",
          description:
            "The type of safety are 'Health', 'Travel', 'General'",
        },
        tips: {
          type: "array",
          items: {
            type: "string",
            description: "Individual safety tip or advice",
          },
          description: "A list of tips for this safety type",
        },
      },
      required: ["type", "tips"],
    },
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  
  if (!tour) {
    return <div>No tour data available.</div>;
  }

  return (
    <div className="flex flex-col mt-10">
      <h1 className=" w-full text-center text-2xl font-bold text-primarycolor">
        Travel Guide for {tour.address.city}, {tour.address.state}
      </h1>

      <div className="flex flex-col mt-5">
        <div className="flex">
          <div className="flex items-center p-2 rounded-md bg-emerald-600 mb-2 max-md:w-full max-md:justify-between">
            <div className="pl-3 flex items-center">
            <div><IoShirt size={25} color="white"/></div>
            <h3 className="md:text-lg font-semibold text-white pl-3">
              Clothing Suggestions
            </h3>
            </div>
            
            <button
              onClick={() =>
                fetchContent(
                  "cloth",
                  clothingPrompt,
                  setClothingSuggestions,
                  clothingSchema
                )
              }
              disabled={isClothLoading || isContentLoading}
              className="bg-emerald-300 shadow-md shadow-gray-700 font-semibold px-5 py-2 ml-5 rounded-md disabled:bg-gray-300 transition"
            >
              Get
            </button>
          </div>
        </div>

        <ul className=" rounded-r-md rounded-b-md">
          {isClothLoading ? (
            <ListLoader />
          ) : (
            <div>
              {clothingSuggestions && clothingSuggestions.length > 0 ? (
                clothingSuggestions.map((category, index) => (
                  <li
                    key={index}
                    className="mb-2 bg-emerald-50 p-2 rounded-md border-2 border-emerald-600"
                  >
                    <h3 className="block text-emerald-700 text-lg font-semibold">
                      {category.category}
                    </h3>
                    <ul className="list-disc pl-6">
                      {category.suggestions.map((suggestion, subIndex) => (
                        <li key={subIndex} className="">
                          <strong>{suggestion.item}:</strong>{" "}
                          {suggestion.reason}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
              ) : (
                <h3 className=" bg-emerald-50 p-5 rounded-md border-2 border-emerald-600">
                  Click the button to get clothing suggestions
                </h3>
              )}
            </div>
          )}
        </ul>
      </div>

      <div className="flex flex-col mt-5">
        <div className="flex">
          <div className="flex items-center p-2 rounded-md bg-sky-600 mb-2 max-md:w-full max-md:justify-between">
          <div className="pl-3 flex items-center">
            <div><FaLocationDot size={25} color="white"/></div>
            <h3 className="md:text-lg font-semibold text-white pl-3">
              Recommended Attractions
            </h3>
            </div>
            <button
              onClick={() =>
                fetchContent(
                  "attraction",
                  attractionsPrompt,
                  setRecommendedAttractions,
                  attractionsSchema
                )
              }
              disabled={isAttractionLoading || isContentLoading}
              className="bg-sky-300 shadow-md shadow-gray-700 font-semibold px-5 py-2 ml-5 rounded-md disabled:bg-gray-300 transition"
            >
              Get
            </button>
          </div>
        </div>

        {isAttractionLoading ? (
          <ListLoader />
        ) : (
          <div className=" bg-sky-50 border-sky-600 border-2 rounded-md p-5">
            <ul className=" list-disc pl-3">
              {recommendedAttractions && recommendedAttractions.length > 0 ? (
                recommendedAttractions.map((suggestion, index) => (
                  <li key={index} className="mb-1">
                    <strong>{suggestion.name}</strong>: {suggestion.description}
                  </li>
                ))
              ) : (
                <div>Click the button to get the nearby attractions</div>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-col mt-5">
        <div className="flex">
          <div className="flex items-center p-2 rounded-md bg-pink-600 mb-2 max-md:w-full max-md:justify-between">
          <div className="pl-3 flex items-center">
            <div><FaShieldAlt size={25} color="white"/></div>
            <h3 className="md:text-lg font-semibold text-white pl-3">
            Safety Tips
            </h3>
            </div>
            <button
              onClick={() =>
                fetchContent(
                  "safety",
                  safetyPrompt,
                  setSafetyTips,
                  safetySchema
                )
              }
              disabled={isSafetyLoading || isContentLoading}
              className="bg-pink-300 shadow-md shadow-gray-700 font-semibold px-5 py-2 ml-5 rounded-md disabled:bg-gray-300 transition"
            >
              Get
            </button>
          </div>
        </div>

        {isSafetyLoading ? (
          <ListLoader />
        ) : (
            <ul className="">
              {safetyTips && safetyTips.length > 0 ? (
                safetyTips.map((category, index) => (
                  <li key={index} className=" bg-pink-50 border-pink-600 border-2 rounded-md p-5 mb-2">
                    <h3 className="block text-pink-600 text-lg font-semibold">{category.type}</h3>
                    <ul className="list-disc pl-6">
                      {category.tips.map((tip, subIndex) => (
                        <li key={subIndex} className="">
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
              ) : (
                <h3 className=" bg-pink-50 p-5 rounded-md border-2 border-pink-600">
                  Click the button to get safety suggestions
                </h3>
              )}
            </ul>
        )}
      </div>

    </div>
  );
};

export default TourGuide;
