import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { createProductType, getProductTypeById, updateProductType } from "../../Constants/apiRoutes";
import axios from "axios";
const CreateProductType = () => {
  const [query, setQuery] = useState("");
  const categories = ["Active", "Inactive"]; // Status options
  const { ProductTypeID } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [productType, setProductType] = useState({
    ProductTypeName: "",
    Status: "",
  });
  const handleInputChange = (value, field) => {
    setProductType((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [productTypeDetails, setProductTypeDetails] = useState(null);

  useEffect(() => {
    if (ProductTypeID) {
      axios.get(`${getProductTypeById}/${ProductTypeID}`)
        .then(response => {
          if (response.data.status === "SUCCESS") {
            setProductTypeDetails(response.data.data);
          } else {
            console.error('Failed to fetch product type details:', response.data.message);
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [ProductTypeID]);

  // Log the updated productTypeDetails whenever it changes
  useEffect(() => {
    if (productTypeDetails) {
      setEditMode(Boolean(productTypeDetails?.ProductTypeID)); // Set editMode based on categoryData
    }
  }, [productTypeDetails]);
  useEffect(() => {
    if (editMode) {
      setProductType({
        ProductTypeName: productTypeDetails.ProductTypeName || "",
        Status: productTypeDetails.Status || "",
      });
    }
  }, [editMode]);
  const handleCreateProductType = async () => {
    try {
      const response = await fetch(
        createProductType,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ProductTypeName: productType.ProductTypeName,
            Status: productType.Status,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success("Product Type created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(data);
      } else {
        const error = await response.json();
        const errorMessage = error.message || "Failed to create product type";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error(error);
      }
    } catch (error) {
      const errorMessage = "An error occurred while creating the product type.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(error);
    }
  };
  const handleUpdateProductType = async (ProductTypeID) => {
    try {
      const response = await fetch(
        `${updateProductType}/${ProductTypeID}`, // Append the ID to the URL for update
        {
          method: "PUT", // Use PUT method for updating
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ProductTypeName: productType.ProductTypeName,
            Status: productType.Status,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success("Product Type updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(data);
      } else {
        const error = await response.json();
        const errorMessage = error.message || "Failed to update product type";
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error(error);
      }
    } catch (error) {
      const errorMessage = "An error occurred while updating the product type.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col space-y-6 p-4">
      {/* Header */}
      <ToastContainer />
      {/* Product Type Name Input */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-600">Product Type Name</label>
        <input
          type="text"
          value={productType.ProductTypeName}
          onChange={(e) => handleInputChange(e.target.value, "ProductTypeName")}
          placeholder="Enter Product Type Name"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />
      </div>

      {/* Status Toggle */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium text-gray-600">Status:</label>
        <div
          onClick={() =>
            setProductType((prev) => ({
              ...prev,
              Status: prev.Status === "Active" ? "Inactive" : "Active",
            }))
          }
          className={`relative w-16 h-8 rounded-full cursor-pointer transition ${productType.Status === "Active" ? "bg-green-500" : "bg-red-500"
            }`}
        >
          <div
            className={`absolute top-1/2 left-1 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${productType.Status === "Active" ? "translate-x-8" : "translate-x-0"
              }`}
          ></div>
        </div>
        {/* <span className="text-sm font-medium">
          {productType.Status || "Select Status"}
        </span> */}
      </div>

      {/* Create Button */}
      <button
        onClick={editMode ? () => handleUpdateProductType(ProductTypeID) : handleCreateProductType}
        className="w-full bg-pacific-500 text-white py-3 rounded-md shadow-md hover:bg-pacific-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pacific-500"
      >
        {editMode ? "Update Product Type" : "Create Product Type"}
      </button>

    </div>
  );
};

export default CreateProductType;


