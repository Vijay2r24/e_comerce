import React, { useState } from "react";
import ProductCard from "../product_card";

const GalleryUploader = () => {
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    addImages(files);
  };

  const handleBrowse = (event) => {
    const files = Array.from(event.target.files);
    addImages(files);
  };

  const addImages = (files) => {
    const newImages = files.map((file) => ({
      file,
      name: file.name,
      date: new Date().toLocaleDateString(),
      size: (file.size / 1024).toFixed(2) + " KB",
    }));

    // Filter out duplicates based on the file name
    const uniqueImages = newImages.filter(
      (newImage) => !images.some((image) => image.name === newImage.name)
    );

    if (uniqueImages.length === 0) {
      alert("Image already exists.");
      return;
    }

    setImages((prevImages) => [...prevImages, ...uniqueImages]);
    setPreviewImages((prevImages) => [...prevImages, ...uniqueImages]);
  };

  const handleEdit = (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const isDuplicate = previewImages.some(
          (image) => image.name === file.name && image !== previewImages[index]
        );

        if (isDuplicate) {
          alert("Image already exists.");
          return;
        }

        const updatedImages = [...previewImages];
        updatedImages[index] = {
          file,
          name: file.name,
          date: new Date().toLocaleDateString(),
          size: (file.size / 1024).toFixed(2) + " KB",
        };
        setPreviewImages(updatedImages);
      }
    };
    fileInput.click();
  };

  const openDeleteModal = (index) => {
    setImageToDelete(index);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    const updatedImages = previewImages.filter((_, i) => i !== imageToDelete);
    setPreviewImages(updatedImages);
    setImages(updatedImages);
    setIsModalOpen(false);
    setImageToDelete(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImageToDelete(null);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Add Images</h2>
      <div
        className="border-dashed border-2 border-gray-300 p-6 text-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <p>
          Drag and drop or <span className="text-purple-600">browse</span>
        </p>
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          onChange={handleBrowse}
          className="hidden"
        />
      </div>
      <div className="space-y-4">
        {previewImages.map((image, index) => (
          <ProductCard
            key={index}
            name={image.name}
            date={image.date}
            size={image.size}
            image={image.file}
            onEdit={() => handleEdit(index)}
            onDelete={() => openDeleteModal(index)}
          />
        ))}
      </div>

      {/* Modal for Delete Confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this image?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={closeModal} className="bg-gray-300 p-2 rounded">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryUploader;
