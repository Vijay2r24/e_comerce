import React, { useState, useEffect } from 'react';
import chroma from 'chroma-js'; // Import chroma-js for color handling
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createColour, getColourById, updateColour } from "../../Constants/apiRoutes";
import { useParams } from "react-router-dom";


const Step3 = () => {
  const [items, setItems] = useState([
    {
      color: "", // Initial Hex value
      rgb: "", // Initial RGB value
      name: "", // Initial color name
    },
  ]);
  const { ColourID } = useParams();
  const [editMode, setEditMode] = useState(false);
  // Predefined color mapping for common colors
  const colorNameMapping = {
    "#ffffff": "White",
    "#000000": "Black",
    "#ff0000": "Red",
    "#00ff00": "Green",
    "#0000ff": "Blue",
    "#ffff00": "Yellow",
    "#ff00ff": "Magenta",
    "#00ffff": "Cyan",
  };

  // Function to update form data and determine details
  const updateColorDetails = (hexColor, index) => {
    if (!/^#[0-9A-Fa-f]{6}$/i.test(hexColor)) {
      // Invalid color handling
      setItems((prevItems) =>
        prevItems.map((item, i) =>
          i === index
            ? { ...item, color: hexColor, rgb: "Invalid", name: "Invalid" }
            : item
        )
      );
      return;
    }

    const exactName = colorNameMapping[hexColor.toLowerCase()] || chroma(hexColor).name();
    const rgbArray = chroma(hexColor).rgb();
    const rgbValue = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;

    // Update state
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, color: hexColor, rgb: rgbValue, name: exactName }
          : item
      )
    );
  };
  const [colourDetails, setColourDetails] = useState(null);
  useEffect(() => {
    if (ColourID) {
      axios.get(`${getColourById}/${ColourID}`)
        .then(response => {
          if (response.data.status === "SUCCESS") {
            setColourDetails(response.data.data); // Extracting and storing the color details
            console.log("colourDetails", response.data.data); // Log the fetched color details
          } else {
            console.error('Failed to fetch colour details:', response.data.message);
          }
        })
        .catch(error => console.error('Error fetching colour data:', error));
    }
  }, [ColourID]);
  useEffect(() => {
    if (colourDetails) {
      setEditMode(Boolean(colourDetails?.ColourID)); // Set editMode based on categoryData
    }
  }, [colourDetails]);
  useEffect(() => {
    if (editMode) {
      setItems([
        {
          color: colourDetails.HexCode || "#ffffff", // Use the HexCode from colourDetails
          rgb: colourDetails.RgbCode || "rgb(255, 255, 255)", // Use the RgbCode from colourDetails
          name: colourDetails.Name || "White", // Use the Name from colourDetails
        },
      ]);
    }
  }, [editMode, colourDetails]);
  const handleCreateColour = async () => {
    const apiUrl = createColour;
    const colourData = {
      TenantID: String(1), // Ensure it's a string
      Name: String(items[0].name), // Convert name to string
      HexCode: String(items[0].color), // Convert HexCode to string
      RgbCode: String(items[0].rgb), // Convert RgbCode to string
      CreatedBy: String("admin"), // Convert CreatedBy to string
      UpdatedBy: String("admin"), // Convert UpdatedBy to string
    };

    try {
      const response = await axios.post(apiUrl, colourData);
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || "Colour created successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Failed to create colour.", {
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
        error.response?.data?.message || "An error occurred while creating the colour.",
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
  const handleUpdateColour = async (id) => {
    const apiUrl = `${updateColour}/${id}`; // Append the ID to the URL
    const colourData = {
      TenantID: String(1), // Ensure it's a string
      Name: String(items[0].name), // Convert name to string
      HexCode: String(items[0].color), // Convert HexCode to string
      RgbCode: String(items[0].rgb), // Convert RgbCode to string
      UpdatedBy: String("admin"), // Convert UpdatedBy to string
    };

    try {
      const response = await axios.put(apiUrl, colourData); // Use PUT method for updates
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || "Colour updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Failed to update colour.", {
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
        error.response?.data?.message || "An error occurred while updating the colour.",
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
  const handleInputChange = (e, index, key) => {
    const value = e.target.value;

    if (key === "color") {
      updateColorDetails(value, index); // Update color details if Hex color changes
    } else {
      setItems((prevItems) =>
        prevItems.map((item, i) =>
          i === index ? { ...item, [key]: value } : item
        )
      );
    }
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <div className="flex flex-col space-y-4">
          {/* Product Color Section */}
          <label className="text-sm font-medium text-gray-700">Product Color</label>

          <div className="flex flex-col space-y-4">
            {/* Color Picker */}
            <input
              type="color"
              value={items[0].color}
              onChange={(e) => handleInputChange(e, 0, "color")}
              className="w-12 h-12 border border-gray-300 rounded-md cursor-pointer transition duration-200 hover:border-blue-400 focus:ring-2 focus:ring-blue-400"
              title="Pick a color"
            />

            <h3 className="text-sm text-gray-500 text-center">(Or)</h3>

            {/* Hex Value Input */}
            <label className="flex flex-col text-sm font-medium text-gray-500">
              Hex Value
              <input
                type="text"
                value={items[0].color}
                onChange={(e) => handleInputChange(e, 0, "color")}
                placeholder="Enter Hex value"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </label>

            {/* RGB Input */}
            <label className="flex flex-col text-sm font-medium text-gray-500">
              RGB Value
              <input
                type="text"
                value={items[0].rgb}
                onChange={(e) => handleInputChange(e, 0, "rgb")}
                placeholder="Enter RGB value"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </label>

            {/* Color Name Input */}
            <label className="flex flex-col text-sm font-medium text-gray-500">
              Color Name
              <input
                type="text"
                value={items[0].name} // Use the correct key for color name
                onChange={(e) => handleInputChange(e, 0, "name")}
                placeholder="Enter Color Name"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </label>

            {/* Apply Color Button */}
            <button
              onClick={editMode ? () => handleUpdateColour(ColourID) : handleCreateColour}
              className="w-full bg-pacific-500 text-white p-3 rounded-md shadow-md hover:bg-pacific-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pacific-500"
            >
              {editMode ? "Update Color" : "Apply Color"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;



