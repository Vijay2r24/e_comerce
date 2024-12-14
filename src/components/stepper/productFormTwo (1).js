import React, { useState } from "react";
import {
  FiTrash,
  FiPlus,
  FiUpload,
  FiEye,
  FiX,
  FiRefreshCcw,
} from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";

const ProductFormTwo = () => {
  const [productData, setProductData] = useState(null);
  const [items, setItems] = useState([
    {
      images: [],
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

  const handleColorChange = (e, index) => {
    const color = e.target.value;
    const newItems = [...items];
    newItems[index].color = color;
    setItems(newItems);
  };

  const addNewItem = () => {
    setItems([
      ...items,
      {
        images: [],
        color: "#ffffff",
        sizes: [{ size: "", price: "", quantity: "" }],
        colorError: "",
      },
    ]);
  };

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

  const closePreview = () => {
    setPreviewImage(null);
  };

  const handleSubmit = () => {
    const data = new FormData();

    // Example regular data
    const additionalData = {
      TenantID: 1,
      ProductType: "Electronics",
      ProductName: "Smartphone",
      ProductDescription: "Latest model with advanced features",
      Gender: "Unisex",
      CategoryID: 4,
      SubCategory: "Mobile Phones",
      MRP: 699.99,
      CreatedBy: "Admin",
      UpdatedBy: "Admin",
      BrandID: 4,
      BrandName: "TechBrand",
    };

    // Append regular data to FormData
    Object.keys(additionalData).forEach((key) => {
      data.append(key, additionalData[key]);
    });

    // Flatten the items data and append it to FormData
    items.forEach((item, index) => {
      // Flatten item level data
      data.append(`color_${index}`, item.color);

      // Flatten sizes data
      item.sizes.forEach((size, sizeIndex) => {
        data.append(`size_${index}_${sizeIndex}`, size.size);
        data.append(`price_${index}_${sizeIndex}`, size.price);
        data.append(`quantity_${index}_${sizeIndex}`, size.quantity);
      });

      // Flatten images data
      item.images.forEach((image, imgIndex) => {
        data.append(`image_${index}_${imgIndex}`, image);
      });
    });

    // Convert FormData to a regular object for easier inspection
    const dataObject = Object.fromEntries(data.entries());
    console.log(dataObject);

    setProductData(data);
  };

  return (
    <div className="p-6 space-y-6 max-w-full mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Manage Product Images & Colors
      </h2>

      {items.map((item, index) => (
        <div
          key={index}
          className="grid gap-1 md:grid-cols-3 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm relative"
        >
          {/* Product Color Section */}
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Product Color
            </label>
            <div className="flex flex-col space-y-4">
              <input
                type="color"
                value={item.color}
                onChange={(e) => handleColorChange(e, index)}
                className="w-12 h-12 border border-gray-300 rounded-md cursor-pointer transition duration-200 hover:border-blue-400 focus:ring-2 focus:ring-blue-400"
                title="Pick a color"
              />
              <h3 className="text-sm text-gray-500">(Or)</h3>
              <label className="flex flex-col text-sm font-medium text-gray-500">
                Enter color value
                <input
                  type="text"
                  value={item.color}
                  onChange={(e) => handleColorChange(e, index)}
                  placeholder="Enter color value"
                  className="p-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 w-40"
                />
              </label>
            </div>
          </div>

          {/* Product Sizes Section */}
          <div className="flex flex-col items-start">
            <label className="text-sm font-medium text-gray-700">
              Product Sizes
            </label>
            {item.sizes.map((sizeItem, sizeIdx) => (
              <div
                key={sizeIdx}
                className="flex flex-wrap items-center space-x-2 mt-2"
              >
                <select
                  name="size"
                  value={sizeItem.size}
                  onChange={(e) => handleSizeChange(index, sizeIdx, e)}
                  className="p-2 border rounded-md w-28"
                >
                  <option value="">Select Size</option>
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                  <option value="XL">Extra Large</option>
                </select>
                <input
                  type="number"
                  name="price"
                  value={sizeItem.price}
                  onChange={(e) => handleSizeChange(index, sizeIdx, e)}
                  placeholder="Price"
                  className="p-2 border rounded-md w-28"
                />
                <input
                  type="number"
                  name="quantity"
                  value={sizeItem.quantity}
                  onChange={(e) => handleSizeChange(index, sizeIdx, e)}
                  placeholder="Qty"
                  className="p-2 border rounded-md w-28"
                />
                <button
                  onClick={() => removeSize(index, sizeIdx)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => addSize(index)}
              className="text-blue-600 hover:text-blue-800 mt-2"
            >
              + Add Size
            </button>
          </div>

          {/* Product Images Section */}
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-700">
              Product Images
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.images.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className="relative w-24 h-24 group overflow-hidden border rounded-md"
                >
                  <img
                    src={URL.createObjectURL(image)}
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
                <label className="w-20 h-20 flex items-center justify-center border rounded-md cursor-pointer">
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
            className="absolute top-2 right-2 flex items-center text-center text-red-600 bg-red-50 rounded-md shadow-lg hover:bg-red-100 p-2"
          >
            <RiCloseLine size={18} />
          </button>
        </div>
      ))}

      {/* Add Variant Button */}
      <button
        onClick={addNewItem}
        className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 mt-6 w-full"
      >
        <FiPlus className="mr-2" />
        Add New Variant
      </button>

      <button
        onClick={handleSubmit}
        className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md shadow-lg hover:bg-green-700 mt-6 w-full"
      >
        Submit Form
      </button>

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="relative bg-white p-4 rounded-md shadow-lg max-w-lg">
            <button
              onClick={closePreview}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <FiX size={20} />
            </button>
            <img
              src={URL.createObjectURL(previewImage)}
              alt="Preview"
              className="object-contain max-h-96"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFormTwo;
