import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import SearchBar from "../search_bar";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
  TablePaginationActions,
} from "../CustomTablePagination";
import { routeNames } from "../../constants";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  // States for pagination
  const [currentPage, setCurrentPage] = useState(0); // MUI uses 0-based indexing
  const itemsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const handleOrderUpdate = (ProductId) => {
    navigate(routeNames.products(ProductId));
  };

  const handleAddProductClick = () => {
    navigate(routeNames.newproducts); // Replace with your desired route
  };

  useEffect(() => {
    const filtered = products.filter((product) => {
      const brandName = product.brand?.brandName || ""; // Safely access brandName
      return (
        brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.productName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.MRP && product.MRP.toString().includes(searchQuery))
      );
    });
    setFilteredProducts(filtered);
  }, [searchQuery, products]);
  

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "edit" or "delete"
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (type, product) => {
    setModalType(type);
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
    setSelectedProduct(null);
  };

  const handleDelete = () => {
    console.log(`Deleting product: ${selectedProduct.name}`);
    closeModal();
  };

  useEffect(() => {
    // Fetch product data from API
    const apiUrl = "https://electronic-ecommerce.onrender.com/api/getProductDetails";
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.statusCode === "SUCCESS") {
          setProducts(data.data);
          console.log(" setProducts",products)
        } else {
          console.error("Failed to fetch products:", data.message);
        }
      })
      .catch((err) => console.error("Error:", err));
  }, [refresh]);
  const deleteProduct = async (ProductID) => {
    try {
      const response = await fetch(`https://electronic-ecommerce.onrender.com/api/deleteProductWithImages/${ProductID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (response.ok) {
        console.log(`Product with ID ${ProductID} deleted successfully`);
        toast.success(result.message || "Product deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRefresh(prev => !prev);  // Refresh the state or UI after deletion
      } else {
        console.log(`Failed to delete product with ID ${ProductID}`);
        toast.error(`Failed to delete product with ID ${ProductID}`, {
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
      console.error('Error:', error);
      toast.error("An error occurred while deleting the product", {
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
  // Handle pagination slice
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  return (
    <div className="overflow-x-auto">
      <ToastContainer />
      {/* Search Bar */}
      <div className="flex items-center justify-between p-4">
        <SearchBar onSearch={setSearchQuery} />
        <button
          onClick={handleAddProductClick}
          className="bg-pacific text-white px-4 py-2 rounded hover:bg-pacific whitespace-nowrap"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
  <Table sx={{ minWidth: 700 }} aria-label="product table">
    <TableHead>
      <TableRow>
        <StyledTableCell>Product ID</StyledTableCell>
        <StyledTableCell>Product Image</StyledTableCell>
        <StyledTableCell>Product Name</StyledTableCell>
        <StyledTableCell>MRP</StyledTableCell>
        <StyledTableCell>Brand Name</StyledTableCell>
        <StyledTableCell>Actions</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {currentProducts.map((product) => {
        const firstImage = product.variants?.[0]?.images?.[0] || ""; // Adjusted to match the response structure
        const brandName = product.brand?.brandName || "N/A"; // Safely accessing brandName

        return (
          <StyledTableRow key={product.productId}>
            <StyledTableCell>{product.productId}</StyledTableCell>
            <StyledTableCell className="flex justify-center">
              {firstImage ? (
                <img
                  src={firstImage}
                  alt={product.productName || "Product Image"}
                  className="w-10 h-10 rounded-md object-cover"
                />
              ) : (
                <span>No Image</span>
              )}
            </StyledTableCell>
            <StyledTableCell>{product.productName}</StyledTableCell>
            <StyledTableCell>{`${parseFloat(product.MRP).toFixed(2)}`}</StyledTableCell>
            <StyledTableCell>{brandName}</StyledTableCell> {/* Accessing brandName */}
            <StyledTableCell>
              <div className="flex justify-start space-x-2">
                <button
                  onClick={() => handleOrderUpdate(product.productId)}
                  className="button edit-button flex items-center space-x-1"
                >
                  <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => deleteProduct(product.productId)}
                  className="button delete-button flex items-center space-x-1"
                >
                  <MdOutlineCancel
                    aria-hidden="true"
                    className="h-4 w-4 font-small"
                  />
                  <span>Delete</span>
                </button>
              </div>
            </StyledTableCell>
          </StyledTableRow>
        );
      })}
    </TableBody>
  </Table>
</TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        count={filteredProducts.length} // Corrected to use filteredProducts.length
        rowsPerPage={itemsPerPage}
        page={currentPage} // MUI uses 0-based indexing for page
        onPageChange={handlePageChange} // Ensure the event correctly updates the page
        component="div"
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl">{modalType === "edit" ? "Edit Product" : "Delete Product"}</h2>
            <p>{modalType === "edit" ? "Are you sure you want to edit this product?" : "Are you sure you want to delete this product?"}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                {modalType === "edit" ? "Edit" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;


