import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductCard = ({ name, date, size, image, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {image && (
          <img
            src={typeof image === "string" ? image : URL.createObjectURL(image)}
            alt={name}
            className="w-16 h-16 object-cover rounded"
          />
        )}
        <div>
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{date}</p>
          <p className="text-sm text-gray-500">{size}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        {/* <button className="text-blue-500" onClick={onEdit}>
          <FaEdit />
        </button> */}
        <button className="text-red-500" onClick={onDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

