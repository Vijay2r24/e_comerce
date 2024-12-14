import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../constants";
import GalleryUploader from "../../components/gallery_uploader";
import { FaArrowLeft, FaArrowRight, FaCheck } from "react-icons/fa";

const Products = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.productName)
        newErrors.productName = "Product Name is required.";
      if (!formData.category) newErrors.category = "Category is required.";
    } else if (step === 2) {
      if (!formData.price) newErrors.price = "Price is required.";
      if (formData.price <= 0)
        newErrors.price = "Price must be greater than 0.";
      if (!formData.quantity)
        newErrors.quantity = "Available Quantity is required.";
      if (formData.quantity <= 0)
        newErrors.quantity = "Quantity must be greater than 0.";
    } else if (step === 3) {
      if (!formData.description)
        newErrors.description = "Description is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data Submitted: ", formData);
      navigate(routeNames.allProducts);
    }
  };

  const renderStepOne = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 p-1">
          Product Name
        </label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Ex: Regular T-shirt"
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.productName && (
          <p className="text-red-500 text-sm text-center mt-1">
            {errors.productName}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 p-1">
          Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="">Select Category</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="tablets">Tablets</option>
          <option value="cameras">Cameras</option>
          <option value="headphones">Headphones</option>
          <option value="smartwatches">Smartwatches</option>
          <option value="accessories">Accessories</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm text-center mt-1">
            {errors.category}
          </p>
        )}
      </div>
    </>
  );

  const renderStepTwo = () => (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 p-1">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Ex: $100"
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.price && (
          <p className="text-red-500 text-sm text-center mt-1">
            {errors.price}
          </p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 p-1">
          Available Quantity
        </label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Ex: 10"
          className="w-full border border-gray-300 rounded-md p-2"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm text-center mt-1">
            {errors.quantity}
          </p>
        )}
      </div>
    </>
  );

  const renderStepThree = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 p-1">
        Description
      </label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Add product description"
        className="w-full border border-gray-300 rounded-md p-2"
        rows="4"
      ></textarea>
      {errors.description && (
        <p className="text-red-500 text-sm text-center mt-1">
          {errors.description}
        </p>
      )}
    </div>
  );

  const renderButtons = () => (
    <div className="flex justify-between mt-4">
      {step > 1 && (
        <button
          type="button"
          onClick={handlePrevious}
          className="flex items-center bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      )}
      {step < 3 && (
        <button
          type="button"
          onClick={handleNext}
          className="flex items-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
        >
          Continue <FaArrowRight className="ml-2" />
        </button>
      )}
      {step === 3 && (
        <button
          type="submit"
          className="flex items-center bg-purple-600 text-white w-full py-3 rounded-md hover:bg-purple-700 justify-center"
        >
          <FaCheck className="mr-2" /> Add Product
        </button>
      )}
    </div>
  );

  return (
    <div className="sm-330:w-screen md:w-full flex flex-col lg:flex-row sm-330:flex-col-reverse gap-6 p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/2 mx-auto h-1/2">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {step === 1 && renderStepOne()}
          {step === 2 && renderStepTwo()}
          {step === 3 && renderStepThree()}
          {renderButtons()}
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 w-full lg:w-1/2 h-1/2">
        <GalleryUploader />
      </div>
    </div>
  );
};

export default Products;
