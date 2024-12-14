import React, { createContext, useState, useEffect } from 'react';
import {getAllBrands} from "../../Constants/apiRoutes";

// Create the BrandsContext
export const BrandsContext = createContext();

// BrandsProvider component
export const BrandsProvider = ({ children }) => {
    const [brands, setBrands] = useState([]);

    const fetchAndStoreBrands = async () => {
        const apiUrl = getAllBrands;

        try {
            // Fetch data from API
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === 'SUCCESS') {
                // Store data in localStorage
                localStorage.setItem('brands', JSON.stringify(data.data));
                setBrands(data.data); // Update the context state
                console.log('Data stored in localStorage and context:', data.data);
            } else {
                console.error('Failed to fetch brands');
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    useEffect(() => {
        // Check localStorage for existing data
        const storedBrands = localStorage.getItem('brands');
        if (storedBrands) {
            setBrands(JSON.parse(storedBrands));
        } else {
            fetchAndStoreBrands(); // Fetch data if not in localStorage
        }

        // Set up periodic auto-refresh
        const interval = setInterval(() => {
            console.log('Refreshing brands data...');
            fetchAndStoreBrands();
        }, 300000); // Refresh every 5 minutes (300,000 ms)

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    return (
        <BrandsContext.Provider value={{ brands, fetchAndStoreBrands }}>
            {children}
        </BrandsContext.Provider>
    );
};

