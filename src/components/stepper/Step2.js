import React, { useState, useEffect, useContext } from "react";
import {
  FiTrash,
  FiPlus,
  FiUpload,
  FiEye,
  FiX,
  FiRefreshCcw,
} from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import axios from 'axios';
import { DataContext } from '../Context/SizeContext'
import { ColorContext } from '../Context/ColorContext'
import { Combobox } from '@headlessui/react';
import { MdArrowDropDown } from 'react-icons/md';
const Step2 = ({ updateFormData, productData, updateImagesAndIndex }) => {
  const [editMode, setEditMode] = useState(false);
  const { data } = useContext(DataContext);// Access the sizes data from context
  const { colors } = useContext(ColorContext);
  const [items, setItems] = useState([
    {
      images: [],
      ColourID: "",
      color: "#ffffff",
      sizes: [{ size: "", price: "", quantity: "" }],
      colorError: "",
    },
  ]);
  const [previewImage, setPreviewImage] = useState(null);

  const handleSizeChange = (itemIndex, sizeIndex, e) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[itemIndex].sizes[sizeIndex][name] = value;
    setItems(updatedItems);
  };

  const addSize = (itemIndex) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].sizes.push({ size: "", price: "", quantity: "" });
    setItems(updatedItems);
  };
  const [imagesData, setImagesData] = useState(new FormData());
  const removeSize = (itemIndex, sizeIndex) => {
    const updatedItems = [...items];
    updatedItems[itemIndex].sizes = updatedItems[itemIndex].sizes.filter(
      (_, i) => i !== sizeIndex
    );
    setItems(updatedItems);
  };

  const isDuplicateImage = (newImage, itemImages) => {
    return itemImages.some(
      (img) => img.name === newImage.name && img.size === newImage.size
    );
  };

  const handleImageChange = (e, index) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newItems = [...items];
      files.forEach((file) => {
        if (isDuplicateImage(file, newItems[index].images)) {
          alert("This image already exists. Please upload a different one.");
        } else {
          newItems[index].images.push(file);
        }
      });
      setItems(newItems);
    }
  };
  const addNewItem = () => {
    setItems([
      ...items,
      {
        images: [],
        color: "#ffffff",
        sizes: [{ SizeID: "", price: "", quantity: "" }],
        colorError: "",
      },
    ]);
  };
  useEffect(() => {
    if (productData) {
      console.log("productData", productData)
      setEditMode(Boolean(productData?.productId)); // Set editMode based on categoryData
    }
  }, [productData]);
  useEffect(() => {
    if (editMode && productData?.variants) {
      const mappedItems = productData.variants.map((variant) => {
        // Extract images and sizes
        // const images = variant.images || []; // Default to an empty array if undefined
        const images = (variant.images || []).map((imageUrl) => {
          // Get the file name from URL
          const fileName = imageUrl // Remove unwanted parts after the last underscore
          return new File([imageUrl], fileName, {
            lastModified: Date.now(), // Use current timestamp or an appropriate value
          });
        });
        const sizes = (variant.sizes || []).map((size) => ({
          size: size.sizeId || "", // Use sizeLabel for the size
          price: size.price || "", // Ensure price is included
          quantity: size.quantity || "", // Ensure quantity is included
        }));
        // Log to debug mapping
        console.log("Mapped Images:", images);
        console.log("Mapped Sizes:", sizes);
        return {
          images: images,
          ColourID: variant.colourId || "", // Use correct case (colourId)
          color: variant.colorHexCode || "#ffffff", // Use colorHexCode for color
          sizes: sizes,
          colorError: "", // Default to empty string
        };
      });

      console.log("Mapped Items:", mappedItems);

      // Update state with mapped items, filtering out any incomplete or invalid data
      setItems((prevItems) => [
        ...mappedItems.filter((item) => item), // Ensure valid items
      ]);
    } else {
      console.log("No valid product data found or editMode is false.");
    }
  }, [editMode, productData]);


  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const deleteImage = (itemIndex, imageIndex) => {
    const newItems = [...items];
    newItems[itemIndex].images.splice(imageIndex, 1);
    setItems(newItems);
  };

  const replaceImage = (itemIndex, imageIndex, e) => {
    const file = e.target.files[0];
    if (file) {
      const newItems = [...items];
      if (isDuplicateImage(file, newItems[itemIndex].images)) {
        alert("This image already exists. Please upload a different one.");
        return;
      }
      newItems[itemIndex].images[imageIndex] = file;
      setItems(newItems);
    }
  };

  const openPreview = (image) => {
    setPreviewImage(image);
  };
  const handleColorChange = (e, index, type = "hex") => {

  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(""); // Track selected color
  const handleDropdownChange = (e, index) => {
    const ColourID = parseInt(e.target.value, 10);
    const selectedColor = colors.find((color) => color.ColourID === ColourID);

    console.log("Selected colorId:", ColourID);

    // Check if the color was found
    if (selectedColor) {
      // Update the items state with the selected color and RGB values
      setItems((prevItems) => {
        // Create a new copy of the items array to avoid mutating state directly
        const newItems = [...prevItems];

        // Update the item at the specific index
        newItems[index] = {
          ...newItems[index], // Keep previous values
          ColourID: ColourID, // Update the colorId
          color: selectedColor.HexCode, // Set Hex value
          rgb: selectedColor.RgbCode, // Set RGB value
        };

        // Return the updated items array
        return newItems;
      });

      // Close the dropdown after selecting a color
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    console.log("Updated items state:", items);
  }, [items]);

  const closePreview = () => {
    setPreviewImage(null);
  };
  const [stepTwoData, setStepTwoData] = useState([]);
  const handleSubmit = () => {
    const payload = items.map((item) => {
      // Construct the object for each item
      console.log("images",items)
      const Colors = {
        ColourID: item.ColourID,
        Sizes: item.sizes.map((size) => ({
          SizeID: size.size,
          Quantity: size.quantity,
        })),
      };
      return Colors;
    });

    updateFormData({ stepTwoData: payload, imagesData: items });
    // Perform any necessary additional actions here
  };

  return (
    <div className="p-6 space-y-6 max-w-full mx-auto bg-white rounded-md shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Manage Product Images & Variants
      </h2>

      {items.map((item, index) => (
        <div
          key={index}
          className=" p-6  space-y-6 border border-gray-200 relative"
        >
          {/* Product Color Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* Product Color Picker */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Product Color</label>
              <input
                type="color"
                value={item.color || "#000000"}
                onChange={(e) => handleColorChange(e, index, "hex")}
                className="w-16 h-16 border border-gray-300 rounded-md cursor-pointer transition duration-200 hover:border-blue-400 focus:ring-2 focus:ring-blue-400"
                title="Pick a color"
              />
            </div>

            {/* Select Color */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Select Color</label>
              <Combobox onChange={(value) => handleDropdownChange({ target: { value } }, index)}>
                <div className="relative w-full">
                  <Combobox.Input
                    className="p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 w-full"
                    placeholder="Select Color"
                    value={
                      item.color
                        ? colors.find((c) => c.HexCode === item.color)?.Name
                        : ""
                    }
                    onChange={(e) => handleColorChange(e, index, "hex")}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-2 flex items-center justify-center">
                    <MdArrowDropDown className="h-5 w-5 text-gray-500" />
                  </Combobox.Button>
                </div>
                <Combobox.Options className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto mt-1 w-full">
                  {colors.map((color) => (
                    <Combobox.Option key={color.ColourID} value={color.ColourID}>
                      {({ active }) => (
                        <div
                          className={`p-2 cursor-pointer ${active ? "bg-gray-100" : ""}`}
                        >
                          {color.Name}
                        </div>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox>
            </div>

            {/* Hex Value Input */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Enter Hex Value</label>
              <input
                type="text"
                value={item.color || ""}
                onChange={(e) => handleColorChange(e, index, "hex")}
                placeholder="Enter Hex Value"
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 w-full"
              />
            </div>

            {/* RGB Value Input */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Enter RGB Value</label>
              <input
                type="text"
                value={item.rgb || ""}
                onChange={(e) => handleColorChange(e, index, "rgb")}
                placeholder="Enter RGB Value"
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 w-full"
              />
            </div>
          </div>

          {/* Product Sizes Section (Size, Quantity, Price in One Row) */}
          <div className="space-y-6">
            {item.sizes.map((sizeItem, sizeIdx) => (
              <div key={sizeIdx} className="flex items-center space-x-4">
                {/* Size Dropdown */}
                <div className="flex flex-col space-y-2 w-1/4">
                  <label className="text-sm font-medium text-gray-700">Size</label>
                  <select
                    name="size"
                    value={sizeItem.size}
                    onChange={(e) => handleSizeChange(index, sizeIdx, e)}
                    className="p-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 w-full"
                  >
                    <option value="">Select Size</option>
                    {data.map((size) => (
                      <option key={size.SizeID} value={size.SizeID}>
                        {size.Label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Input */}
                <div className="flex flex-col space-y-2 w-1/4">
                  <label className="text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={sizeItem.price}
                    onChange={(e) => handleSizeChange(index, sizeIdx, e)}
                    placeholder="Price"
                    className="p-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 w-full"
                  />
                </div>

                {/* Quantity Input */}
                <div className="flex flex-col space-y-2 w-1/4">
                  <label className="text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={sizeItem.quantity}
                    onChange={(e) => handleSizeChange(index, sizeIdx, e)}
                    placeholder="Quantity"
                    className="p-2 border rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 w-full"
                  />
                </div>

                {/* Remove Size Button */}
                <button
                  onClick={() => removeSize(index, sizeIdx)}
                  className="text-red-500 hover:text-red-700 flex items-center justify-center"
                >
                  <FiTrash size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => addSize(index)}
              className="text-blue-600 hover:text-blue-800 mt-4 flex items-center justify-center"
            >
              + Add Size
            </button>
          </div>

          {/* Product Images Section */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700">Product Images</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.images.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className="relative w-24 h-24 group overflow-hidden border rounded-md"
                >
                  {/* Check if image is a File or URL */}
                  <img
                    // src={image instanceof File ? URL.createObjectURL(image) : image} // Handle File or URL
                    src={image instanceof File ? (image.name.startsWith('http') ? image.name : URL.createObjectURL(image)) : image}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => deleteImage(index, imgIndex)}
                      className="text-white bg-red-600 p-1 rounded-full"
                    >
                      <FiTrash size={14} title="Delete" />
                    </button>
                    <label className="text-white bg-blue-600 p-1 rounded-full ml-2 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => replaceImage(index, imgIndex, e)}
                        className="hidden"
                      />
                      <FiRefreshCcw size={14} title="Replace" />
                    </label>
                    <button
                      onClick={() => openPreview(image)}
                      className="text-white bg-black p-1 rounded-full ml-2"
                    >
                      <FiEye size={14} title="Preview" />
                    </button>
                  </div>
                </div>
              ))}
              <div>
                <label className="w-24 h-24 flex items-center justify-center border rounded-md cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageChange(e, index)}
                    className="hidden"
                  />
                  <FiUpload className="text-gray-400" size={20} />
                </label>
              </div>
            </div>
          </div>

          {/* Remove Variant Button */}
          <button
            onClick={() => removeItem(index)}
            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
          >
            <RiCloseLine size={18} />
          </button>
        </div>
      ))}

      {/* Add Variant Button */}
      <div className="flex space-x-4 mt-8">
        <button
          onClick={addNewItem}
          className="flex items-center justify-center px-6 py-2 bg-pacific-500 text-white rounded-md hover:bg-blue-700 w-1/2"
        >
          <FiPlus className="mr-2" />
          Add New Variant
        </button>

        <button
          onClick={handleSubmit}
          className="flex items-center justify-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-1/2"
        >
          Submit Form
        </button>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="relative bg-white p-4 rounded-md shadow-lg max-w-lg">
            <button
              onClick={closePreview}
              className="absolute top-2 right-2 text-white bg-black rounded-full p-2"
            >
              <FiX size={18} />
            </button>
            <img
              src={previewImage}
              alt="Image Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>


  );
};

export default Step2;
