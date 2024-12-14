import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
export const ColorContext = createContext(); // Export ColorContext

// Create a provider component
export const ColorProvider = ({ children }) => {
  const [colors, setColors] = useState([]);

  // Function to fetch and store colors
  const fetchAndStoreColors = async () => {
    try {
      const response = await axios.get(
        "https://electronic-ecommerce.onrender.com/api/getAllColours"
      );

      if (response.data.status === "SUCCESS") {
        const fetchedColors = response.data.data;
        setColors(fetchedColors); // Update state
        localStorage.setItem("colors", JSON.stringify(fetchedColors)); // Cache in localStorage
        console.log("Fetched and stored colors:", fetchedColors);
      } else {
        console.error("Failed to fetch colors:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  useEffect(() => {
    // Check localStorage for existing colors
    const storedColors = localStorage.getItem("colors");
    if (storedColors) {
      setColors(JSON.parse(storedColors)); // Load from localStorage if available
      console.log("Loaded colors from localStorage.");
    } else {
      fetchAndStoreColors(); // Fetch data if not in localStorage
    }

    // Set up periodic auto-refresh for colors
    const interval = setInterval(() => {
      console.log("Refreshing colors data...");
      fetchAndStoreColors(); // Refresh colors every 5 minutes (300,000 ms)
    }, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <ColorContext.Provider value={{ colors }}>
      {children}
    </ColorContext.Provider>
  );
};



