import React, { useEffect,useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import axios from 'axios';
import {getBrandById,updateBrandById,createBrand} from "../../Constants/apiRoutes"


function App() {
    const [editMode, setEditMode] = useState(false);
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});

    // Define empty handlers
    const updateCategory = () => {
        // Empty function to update category
    };
    const [brand, setBrand] = useState(null);
    const [formData, setFormData] = useState({
        productName: "",
        // category: "",
        brandName:"",
        categoryID:"",
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
            const response = await fetch(createBrand, {
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
                    categoryID:'',
                    brandCode:'',
                    isActive:'',
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
            const response = await fetch(`${updateBrandById}/${BrandID}`, {
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
          axios.get(`${getBrandById}/${BrandID}`)
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
        brandName:brand.BrandName || "",
        categoryID:brand.CategoryID ||"",
        price:brand.BrandCode || "",
        brandCode:brand.BrandCode || "",
        isActive: brand.IsActive,
            });
        }
    }, [editMode]);  
    return (
        <div className="sm:w-full md:w-full flex flex-col lg:flex-row gap-6 p-8 ">
            <ToastContainer />
            <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/2 mx-auto h-1/2">
                <form className="space-y-6">
                    <label className="block text-sm font-medium text-gray-700 p-1">
                        Brand name
                    </label>
                    <input
                        name="brandName"
                        type="text"
                        value={formData.brandName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter Brand name"
                    />
                    {errors.category && (
                        <p className="text-red-500 text-sm text-center mt-1">
                            {errors.category}
                        </p>
                    )}
                    <label className="block text-sm font-medium text-gray-700 p-1">
                        Category
                    </label>
                    <input
                        name="categoryID"
                        type="number"
                        value={formData.categoryID}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter Category"
                    />
                    {errors.category && (
                        <p className="text-red-500 text-sm text-center mt-1">
                            {errors.category}
                        </p>
                    )}
                    <label className="block text-sm font-medium text-gray-700 p-1">
                        Brand Code
                    </label>
                    <input
                        name="brandCode"
                        type="number"
                        value={formData.brandCode}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        placeholder="Enter Brand Code"
                    />
                    {errors.brandCode && (
                        <p className="text-red-500 text-sm text-center mt-1">
                            {errors.brandCode}
                        </p>
                    )}
                    <div className="flex items-center mt-4">
                        <label className="text-sm font-medium text-gray-700 mr-3">
                            Is Active
                        </label>
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
                        <p className="text-red-500 text-sm text-center mt-1">
                            {errors.isActive}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="button"
                        className="w-full bg-blue-500 text-white p-2 rounded-md"
                        onClick={editMode ? handleUpdate : handleSubmit} // Conditionally call updateCategory if in editMode
                    >
                        {editMode ? 'Update' : 'Submit'} {/* Change button text based on editMode */}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default App;
