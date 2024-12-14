import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { BrandsContext } from '../Context/BrandsContext'
import { CategoriesContext } from '../Context/CategoriesContext'
import { Combobox } from '@headlessui/react';

const Step1 = () => {
    const [editMode, setEditMode] = useState(false);
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});
    const { brands, fetchAndStoreBrands } = useContext(BrandsContext);
    const { categories, fetchAndStoreCategories } = useContext(CategoriesContext)

    // Define empty handlers
    const updateCategory = () => {
        // Empty function to update category
    };
    const handleCategoryChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            categoryID: value,
        }));
    };
    const [brand, setBrand] = useState(null);
    const [formData, setFormData] = useState({
        productName: "",
        // category: "",
        brandName: "",
        categoryID: "",
        price: "",
        quantity: "",
        description: "",
        brandCode: '',
        isActive: false,
    });
    const { BrandID } = useParams();
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log("Input Value:", value);  // Debugging log to check entered value
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,  // Update the specific field
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a JSON object with necessary data
        const data = {
            BrandName: formData.brandName,
            TenantID: 1,
            CreatedBy: "AdminUser",
            CategoryID: formData.categoryID,
            BrandCode: formData.brandCode,
            IsActive: formData.isActive,
        };

        try {
            const response = await fetch('https://electronic-ecommerce.onrender.com/api/createBrand', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                // Display success message from API response
                toast.success(result.message || "Brand created successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                // Optionally reset the form data or images
                setFormData({
                    brandName: '',
                    description: '',
                    categoryID: '',
                    brandCode: '',
                    isActive: '',
                });
                setEditMode(false);
            } else {
                // Display error message from API response
                toast.error(result.message || "Failed to upload brand. Please try again.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            // Display a generic error message if the request fails entirely
            toast.error("File upload failed. Please try again.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    const handleUpdate = async (e) => {
        e.preventDefault();

        // Create a JSON object with necessary data for updating
        const data = {
            BrandName: formData.brandName,
            TenantID: 1,
            CreatedBy: "AdminUser",
            CategoryID: formData.categoryID,
            BrandCode: formData.brandCode,
            IsActive: formData.isActive,
        };

        try {
            const response = await fetch(`https://electronic-ecommerce.onrender.com/api/updateBrand/${BrandID}`, {
                method: 'PUT', // Change method to PUT for updating
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                // Display success message from API response
                toast.success(result.message || "Brand updated successfully!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                // Optionally reset the form data or images
                setFormData({
                    brandName: '',
                    description: '',
                    categoryID: '',
                    brandCode: '',
                    isActive: '',
                });
                setEditMode(false);
            } else {
                // Display error message from API response
                toast.error(result.message || "Failed to update brand. Please try again.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            // Display a generic error message if the request fails entirely
            toast.error("Update failed. Please try again.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    useEffect(() => {
        if (BrandID) {
            axios.get(`https://electronic-ecommerce.onrender.com/api/getBrandById/${BrandID}`)
                .then(response => {
                    if (response.data.statusCode === "SUCCESS") {
                        setBrand(response.data.data);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    }, [BrandID]);
    useEffect(() => {
        if (brand) {
            setEditMode(Boolean(brand?.BrandID)); // Set editMode based on categoryData
        }
    }, [brand]);
    useEffect(() => {
        if (editMode) {
            setFormData({
                brandName: brand.BrandName || "",
                categoryID: brand.CategoryID || "",
                price: brand.BrandCode || "",
                brandCode: brand.BrandCode || "",
                isActive: brand.IsActive,
            });
        }
    }, [editMode]);
    return (
        <div>
            <ToastContainer />
            <div>
                <form className="space-y-6 w-full">
                    {/* Brand Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 p-1">Brand Name</label>
                        <input
                            name="brandName"
                            type="text"
                            value={formData.brandName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            placeholder="Enter Brand Name"
                        />
                        {errors.brandName && (
                            <p className="text-red-500 text-sm text-center mt-1">{errors.brandName}</p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 p-1">Category</label>
                        <Combobox as="div" value={formData.categoryID} onChange={handleCategoryChange}>
                            <div className="relative">
                                <Combobox.Input
                                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                    placeholder="Select Category"
                                    value={
                                        // Find and display the category name for the selected category ID
                                        categories.find((category) => category.CategoryID === formData.categoryID)?.CategoryName || ''
                                    }
                                    onChange={(e) => {
                                        // Allow filtering by name
                                        setFormData({
                                            ...formData,
                                            categoryID: '',
                                            categoryName: e.target.value, // Optionally track the input
                                        });
                                    }}
                                />
                                <Combobox.Button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </Combobox.Button>
                            </div>
                            <Combobox.Options className="absolute z-10 mt-1 w-1/3 bg-white border border-gray-300 rounded-md shadow-lg">
                                {categories.map((category) => (
                                    <Combobox.Option key={category.CategoryID} value={category.CategoryID}>
                                        {({ active }) => (
                                            <div
                                                className={`p-2 cursor-pointer ${active ? 'bg-blue-500 text-white' : 'text-gray-700'
                                                    }`}
                                            >
                                                {category.CategoryName}
                                            </div>
                                        )}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        </Combobox>
                        {errors.category && (
                            <p className="text-red-500 text-sm text-center mt-1">{errors.category}</p>
                        )}
                    </div>


                    {/* Brand Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 p-1">Brand Code</label>
                        <input
                            name="brandCode"
                            type="number"
                            value={formData.brandCode}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            placeholder="Enter Brand Code"
                        />
                        {errors.brandCode && (
                            <p className="text-red-500 text-sm text-center mt-1">{errors.brandCode}</p>
                        )}
                    </div>

                    {/* Is Active Toggle */}
                    <div className="flex items-center mt-4">
                        <label className="text-sm font-medium text-gray-700 mr-3">Is Active</label>
                        <div
                            className={`relative w-12 h-6 transition duration-200 ease-linear rounded-full ${formData.isActive ? 'bg-green-500' : 'bg-gray-300'
                                }`}
                            onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                        >
                            <span
                                className={`absolute left-0 top-0 mt-1 ml-1 w-4 h-4 transition-transform duration-200 ease-linear transform bg-white rounded-full ${formData.isActive ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                            ></span>
                        </div>
                    </div>
                    {errors.isActive && (
                        <p className="text-red-500 text-sm text-center mt-1">{errors.isActive}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="button"
                        className="w-full bg-pacific-500 text-white p-3 rounded-md shadow-md hover:bg-pacific-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={editMode ? handleUpdate : handleSubmit} // Conditionally call updateCategory if in editMode
                    >
                        {editMode ? 'Update' : 'Submit'} {/* Change button text based on editMode */}
                    </button>
                </form>
            </div>
        </div>



    );
};

export default Step1;
