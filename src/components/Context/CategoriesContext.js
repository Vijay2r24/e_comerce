import React, { createContext, useState, useEffect } from 'react';

// Create the CategoriesContext
export const CategoriesContext = createContext();

// CategoriesProvider component
export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    const fetchAndStoreCategories = async () => {
        const apiUrl = 'https://electronic-ecommerce.onrender.com/api/getAllCategories';

        try {
            // Fetch data from API
            const response = await fetch(apiUrl);
            const result = await response.json();

            if (result.statusCode === 'SUCCESS') {
                const categoryData = result.Data; // Correctly extract the 'Data' array
                // Store data in localStorage
                localStorage.setItem('categories', JSON.stringify(categoryData));
                setCategories(categoryData); // Update the context state
                console.log('Data stored in localStorage and context:', categoryData);
            } else {
                console.error('Failed to fetch categories:', result.message);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    useEffect(() => {
        // Check localStorage for existing data
        const storedCategories = localStorage.getItem('categories');
        if (storedCategories) {
            setCategories(JSON.parse(storedCategories));
        } else {
            fetchAndStoreCategories(); // Fetch data if not in localStorage
        }

        // Set up periodic auto-refresh
        const interval = setInterval(() => {
            console.log('Refreshing categories data...');
            fetchAndStoreCategories();
        }, 300000); // Refresh every 5 minutes (300,000 ms)

        return () => clearInterval(interval); // Clean up interval on unmount
    }, []);

    return (
        <CategoriesContext.Provider value={{ categories, fetchAndStoreCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
};

