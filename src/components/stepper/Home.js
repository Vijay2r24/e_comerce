// src/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaLock, FaEnvelope, FaCheck } from 'react-icons/fa'; // Import icons
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import StepIndicator from './StepIndicator';
import { FaShoppingBag, FaThLarge, FaInfoCircle } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import { createproductWithImages} from '../../Constants/apiRoutes'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
  const [editMode, setEditMode] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [images, setImages] = useState([]);
  const [productData, setProductData] = useState(null);
  const [index, setIndex] = useState(null);
  const[product,setProduct]=useState(null);
  const [formData, setFormData] = useState({
    stepOneData: {},
    stepTwoData: {},
    imagesData: {},
    stepThreeData:{},
  });
  const updateImagesAndIndex = (image, index) => {
    setImages(image);
    console.log("step1images", images)
    setIndex(index);
    console.log("step1indexs", index)
  };
  const { ProductId } = useParams();

  const handleSubmit = async () => {
    // Initialize FormData
    const data = new FormData();
  
    console.log("stepOneData", formData.stepOneData);
    // Combine all step data into one object
    const { stepOneData, stepTwoData, stepThreeData,imagesData } = formData;
    const formDataObject = {
      ...stepOneData,
      ...stepThreeData,
      Colors: stepTwoData,
    };
  
    // Append the entire object as a JSON string to FormData under the "Data" key
    data.append("Data", JSON.stringify(formDataObject));
  
    // Handle image uploads (assuming stepTwoData contains images)
    imagesData.forEach((variant, index) => {
      if (variant.images && variant.images.length > 0) {
        variant.images.forEach((image, imgIndex) => {
          data.append(`images_${index}`, image); // Append images
        });
      }
    });
  
    // Debugging: Log FormData content
    for (let pair of data.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  
    // Axios POST request
    try {
      const response = await axios.post(
        createproductWithImages, // Adjust the URL
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Axios handles boundaries
          },
        }
      );
  
      // Show success toast after successful submission
      toast.success(response.data.message || "Product created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error uploading data:", error.response?.data || error.message);
      // Show error toast if the submission fails
      toast.error(error.response?.data?.message || "Error uploading data", {
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
  const handleUpdate = async () => {
    const data = new FormData();

    // Combine all step data into one object
    const { stepOneData, stepTwoData, stepThreeData, imagesData } = formData;
    const formDataObject = {
      ...stepOneData,
      ...stepThreeData,
      Colors: stepTwoData,
    };
    data.append("Data", JSON.stringify(formDataObject));
  
    // Handle image uploads (assuming stepTwoData contains images)
    imagesData.forEach((variant, index) => {
      if (variant.images && variant.images.length > 0) {
        variant.images.forEach((image, imgIndex) => {
          data.append(`images_${index}`, image); // Append images
        });
      }
    });
    // Log FormData pairs for debugging
    for (let pair of data.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    console.log("apidata",product)// Axios PUT request to update product data
    try {
      const response = await axios.put(
        `https://electronic-ecommerce.onrender.com/api/updateProductWithImages/${product}`, // Dynamic productId in the URL
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Axios handles boundaries
          },
        }
      );
      console.log("ProductId:", ProductId);
      // Show success toast after successful update
      toast.success(response.data.message || "Product updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error.message);
      // Show error toast if the update fails
      toast.error(error.response?.data?.message || "Error updating product", {
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
    if (!ProductId) return;

    fetch(`https://electronic-ecommerce.onrender.com/api/getProductById/${ProductId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === "SUCCESS") {
          setProductData(data.data);  // Set the product data on success
        } else {
          console.error("Error fetching product data:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [ProductId]);
  const updateFormData = (stepData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...stepData,
    }));
  };
  useEffect(() => {
    if (productData) {
      setEditMode(Boolean(productData?.productId));
      setProduct(productData?.productId) 
      console.log("vijay",product)// Set editMode based on categoryData
    }
  }, [productData]);
  // const handleNext = () => {
  //     if (activeStep < 4) setActiveStep(prevStep => prevStep + 1);
  // };
  const handleNext = () => {
    if (activeStep === 3) {
      if (editMode) {
        handleUpdate(); // Call the update function when in edit mode
      } else {
        handleSubmit(); // Call the submit function in normal mode
      }
    } else if (activeStep < 4) {
      setActiveStep(prevStep => prevStep + 1);
    }
  };  
  const handlePrevious = () => {
    if (activeStep > 1) setActiveStep(prevStep => prevStep - 1);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return <Step1 updateFormData={updateFormData} productData={productData} />;
      case 2:
        return <Step2 updateFormData={updateFormData} setImages={setImages} setIndex={setIndex} updateImagesAndIndex={updateImagesAndIndex}  productData={productData} />;
      case 3:
        return <Step3  updateFormData={updateFormData} productData={productData}/>;
      case 4:
        return <Step4 />;
      default:
        return null;
    }
  };

  return (
    <div className="p-5 mx-auto max-w-6xl">
      <div className="mx-4 p-4">
        <ToastContainer />
        <div className="flex items-center">
          {/* Steps indicator with icons */}
          <StepIndicator step={1} label="Product" icon={<FaShoppingBag />} activeStep={activeStep} />
          <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${activeStep >= 2 ? 'border-pacific-500' : 'border-gray-300'}`}></div>
          <StepIndicator step={2} label="Varients" icon={<FaThLarge />} activeStep={activeStep} />
          <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${activeStep >= 3 ? 'border-pacific-500' : 'border-gray-300'}`}></div>
          <StepIndicator step={3} label="Description" icon={<FaInfoCircle />} activeStep={activeStep} />
          <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${activeStep === 4 ? 'border-pacific-500' : 'border-gray-300'}`}></div>
          <StepIndicator step={4} label="Confirm" icon={<FaCheck />} activeStep={activeStep} />
        </div>
      </div>
      {/* Step Content */}
      <div className="mt-4 p-4 ">
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex p-2 mt-4">
          <button
            onClick={handlePrevious}
            disabled={activeStep === 1}
            className={`text-base hover:scale-105 transition transform duration-200 ease-in-out px-4 py-2 rounded font-semibold border border-gray-300 ${activeStep === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          >
            Previous
          </button>

          <div className="flex-auto flex flex-row-reverse gap-2">
            <button
              onClick={handleNext}
              disabled={activeStep === 4}
              className="text-base hover:scale-105 transition transform duration-200 ease-in-out px-4 py-2 rounded font-semibold bg-pacific-500 hover:bg-pacific-500 text-white border border-pacific-500"
            >
              {editMode ? "Update" : "Save"} {/* Change button text based on editMode */}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;

