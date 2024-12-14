import React, { createContext, useEffect, useState } from 'react';

// Create context
export const DataContext = createContext();

// Provider component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]); // Initialize with an empty array

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch('https://electronic-ecommerce.onrender.com/api/getAllSizes');
      const result = await response.json();
      if (result.status === 'SUCCESS' && Array.isArray(result.data)) {
        setData(result.data); // Use the correct key 'data'
        localStorage.setItem('sizesData', JSON.stringify(result.data)); // Store in localStorage
      } else {
        console.error('Failed to fetch sizes:', result.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);

      // Use fallback data from localStorage
      const storedData = localStorage.getItem('sizesData');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  };

  useEffect(() => {
    // Check localStorage for existing data
    const storedData = localStorage.getItem('sizesData');
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      fetchData(); // Fetch data if not in localStorage
    }

    // Optionally, set up periodic auto-refresh similar to CategoriesProvider
    const interval = setInterval(() => {
      console.log('Refreshing sizes data...');
      fetchData();
    }, 300000); // Refresh every 5 minutes (300,000 ms)

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return <DataContext.Provider value={{ data, fetchData }}>{children}</DataContext.Provider>;
};



