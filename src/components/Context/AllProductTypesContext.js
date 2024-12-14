import React, { createContext, useState, useEffect } from 'react';
import { getAllProductTypesAPI } from "../../Constants/apiRoutes";

// Create the ProductTypesContext
export const ProductTypesContext = createContext();

// ProductTypesProvider component
export const ProductTypesProvider = ({ children }) => {
    const [productTypes, setProductTypes] = useState([]);

    const fetchAndStoreProductTypes = async () => {
        const apiUrl = getAllProductTypesAPI;

        try {
            // Fetch data from API
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === 'SUCCESS') {
                // Store data in localStorage
                localStorage.setItem('productTypes', JSON.stringify(data.data));
                setProductTypes(data.data); // Update the context state
                console.log('Data stored in localStorage and context:', data.data);
            } else {
                console.error('Failed to fetch product types');
            }
        } catch (error) {
            console.error('Error fetching product types:', error);
        }
    };

    useEffect(() => {
        // Check localStorage for existing data
        const storedProductTypes = localStorage.getItem('productTypes');
        if (storedProductTypes) {
            setProductTypes(JSON.parse(storedProductTypes));
        } else {
            fetchAndStoreProductTypes(); // Fetch data if not in localStorage
        }

        // Set up periodic auto-refresh
        const interval = setInterval(() => {
            console.log('Refreshing product types data...');
            fetchAndStoreProductTypes();
        }, 300000); // Refresh every 5 minutes (300,000 ms)

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    return (
        <ProductTypesContext.Provider value={{ productTypes, fetchAndStoreProductTypes }}>
            {children}
        </ProductTypesContext.Provider>
    );
};
