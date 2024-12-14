import React, { useState, useEffect } from 'react';
import { Editor } from "primereact/editor";

const Step3 = ({ updateFormData, productData }) => {
    const [editMode, setEditMode] = useState(false);
    const [stepThreeData, setStepThreeData] = useState({
        ProductDescription: "",
    });
    useEffect(() => {
        if (productData) {
          setEditMode(Boolean(productData?.productId)); // Set editMode based on categoryData
        }
      }, [productData]);
      useEffect(() => {
        if (editMode) {
            setStepThreeData({
            ProductDescription: productData.productDescription || '',
          });
        }
      }, [editMode, productData]);

    // Function to handle text changes
    const handleTextChange = (newText) => {
        const updatedData = {
            ...stepThreeData,
            ProductDescription: newText,
        };

        // Update state
        setStepThreeData(updatedData);

        // Notify parent
        updateFormData({stepThreeData})

        // Log updated data
        console.log("Updated text:", newText);
        console.log("Updated stepThreeData:", updatedData);
    };

    return (
        <div className="card">
            <h2 className="text-xl font-semibold mb-4">Product Description</h2>
            <Editor
                value={stepThreeData.ProductDescription}
                onTextChange={(e) => handleTextChange(e.htmlValue)}
                style={{ height: "320px" }}
            />
        </div>
    );
};

export default Step3;


