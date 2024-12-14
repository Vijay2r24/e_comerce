import React, { useState, useEffect } from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Combobox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid"; // Import Heroicons for the dropdown symbol
import { useParams } from "react-router-dom";
import { getSizeById, createSize, updateSize } from "../../Constants/apiRoutes";
const Step4 = () => {
  const [size, setSize] = useState({
    SizeType: "", // Default size type
    Label: "", // Default selected label
    NumericSize: "", // Default numeric sizesetSize
  });
  const { SizeID } = useParams();
  const [query, setQuery] = useState(""); // For filtering combobox options
  const predefinedLabels = ["S", "M", "L", "XL", "XXL"]; // Options for the combobox
  const [editMode, setEditMode] = useState(false);
  const filteredLabels =
    query === ""
      ? predefinedLabels
      : predefinedLabels.filter((label) =>
        label.toLowerCase().includes(query.toLowerCase())
      );

  const handleInputChange = (value, key) => {
    setSize((prevSize) => ({ ...prevSize, [key]: value }));
  };
  const [sizeDetails, setSizeDetails] = useState(null);

  useEffect(() => {
    if (SizeID) {
      axios.get(`${getSizeById}/${SizeID}`)
        .then(response => {
          if (response.data.status === "SUCCESS") {
            setSizeDetails(response.data.data); // Use `response.data.data` to set the size details
            console.log("sizeDetails", response.data.data); // Log the fetched size details
          } else {
            console.error('Failed to fetch size details:', response.data.message);
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [SizeID]);
  useEffect(() => {
    if (sizeDetails) {
      setEditMode(Boolean(sizeDetails?.SizeID)); // Set editMode based on categoryData
    }
  }, [sizeDetails]);
  useEffect(() => {
    if (editMode) {
      setSize({
        SizeType: sizeDetails.SizeType || "",
        Label: sizeDetails.Label || "",
        NumericSize: sizeDetails.NumericSize || "",
      });
    }
  }, [editMode]);
  const handleCreateSize = async () => {
    const apiUrl = createSize;
    const sizeData = {
      TenantID: String(1), // Ensure it's a string
      SizeType: String(size.SizeType), // Convert SizeType to string
      Label: String(size.Label), // Convert Label to string
      NumericSize: Number(size.NumericSize), // Ensure NumericSize is a number
      CreatedBy: String("admin"), // Convert CreatedBy to string
      UpdatedBy: String("admin"), // Convert UpdatedBy to string
    };

    try {
      const response = await axios.post(apiUrl, sizeData);
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || "Size created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Failed to create size.", {
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
      toast.error(
        error.response?.data?.message || "An error occurred while creating the size.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };
  const handleUpdateSize = async (sizeId) => {
    const apiUrl = `${updateSize}/${sizeId}`; // Append the size ID to the API URL
    const sizeData = {
      TenantID: String(1), // Ensure it's a string
      SizeType: String(size.SizeType), // Convert SizeType to string
      Label: String(size.Label), // Convert Label to string
      NumericSize: Number(size.NumericSize), // Ensure NumericSize is a number
      UpdatedBy: String("admin"), // Convert UpdatedBy to string
    };

    try {
      const response = await axios.put(apiUrl, sizeData); // Use PUT for a full update
      if (response.status === 200 || response.status === 204) {
        toast.success(response.data.message || "Size updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Failed to update size.", {
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
      toast.error(
        error.response?.data?.message || "An error occurred while updating the size.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };
  return (
    <div>
      <ToastContainer />
      <div>
        <div className="flex flex-col space-y-4">
          {/* Size Creation Section */}
          <label className="text-sm font-medium text-gray-700 mb-4">Product Size</label>

          <div className="flex flex-col space-y-4">
            {/* Size Type Input */}
            {/* <label className="flex flex-col text-sm font-medium text-gray-500">
              Size Type
              <input
                type="text"
                value={size.SizeType}
                onChange={(e) => handleInputChange(e.target.value, "SizeType")}
                placeholder="Enter Size Type"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </label> */}
            {/* Label Dropdown */}
            <label className="flex flex-col text-sm font-medium text-gray-500">
              Label
              <Combobox
                value={size.Label}
                onChange={(value) => handleInputChange(value, "Label")}
              >
                <div className="relative mt-1">
                  <div className="relative w-full">
                    <Combobox.Input
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Select or type a label"
                    />
                    {/* Dropdown Button with Icon */}
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Combobox.Button>
                  </div>
                  <Combobox.Options className="absolute mt-1 w-full max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {filteredLabels.length === 0 ? (
                      <div className="p-2 text-sm text-gray-500">No options found</div>
                    ) : (
                      filteredLabels.map((label, index) => (
                        <Combobox.Option
                          key={index}
                          value={label}
                          className={({ active }) =>
                            `cursor-pointer select-none p-2 ${active ? "bg-blue-500 text-white" : "text-gray-900"
                            }`
                          }
                        >
                          {label}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </div>
              </Combobox>
            </label>
            {/* Numeric Size Input */}
            <label className="flex flex-col text-sm font-medium text-gray-500">
              Numeric Size
              <input
                type="number"
                value={size.NumericSize || ""}
                onChange={(e) => handleInputChange(e.target.value, "NumericSize")}
                placeholder="Enter Numeric Size (e.g., 38)"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </label>

            {/* Create Size Button */}
            <button
              onClick={editMode ? () => handleUpdateSize(SizeID) : handleCreateSize}
              className="w-full bg-pacific-500 text-white p-3 rounded-md shadow-md hover:bg-pacific-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pacific-500"
            >
              {editMode ? "Update Size" : "Create Size"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;


