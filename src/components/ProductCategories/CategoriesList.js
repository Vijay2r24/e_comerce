import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import SearchBar from "../search_bar";
import { useNavigate } from 'react-router-dom';
import { routeNames } from "../../constants";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import {
  StyledTableCell,
  StyledTableRow,
  TablePaginationActions,
} from "../CustomTablePagination";

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  const handleAddCategoryClick = () => {
    navigate(routeNames.newCategory);
  };

  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Set to zero-based indexing
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const itemsPerPage = 10;

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get('https://electronic-ecommerce.onrender.com/api/getAllCategories')
      .then(response => {
        if (response.data && response.data.Data) {
          const cleanedCategories = response.data.Data.map(category => ({
            ...category,
            CategoryName: category.CategoryName.replace(/\"/g, ''),
            CategoryDescription: category.CategoryDescription.replace(/\"/g, ''),
            CreatedBy: category.CreatedBy ? category.CreatedBy.replace(/\"/g, '') : 'Unknown',
          }));
          setCategories(cleanedCategories);
        } else {
          console.error("API response does not contain Data field:", response);
        }
      })
      .catch(err => {
        console.error("Error fetching categories:", err);
        setError(err.message);
      });
  }, [refresh]); 

  useEffect(() => {
    const filtered = Array.isArray(categories)
      ? categories.filter(category =>
        category.CategoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.CategoryDescription.toLowerCase().includes(searchQuery.toLowerCase())
      )
      : [];
    setFilteredCategories(filtered);
  }, [searchQuery, categories]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); // Reset to first page when rows per page is changed
  };
  const handleOrderUpdate = (CategoryID) => {
    navigate(routeNames.editCategory(CategoryID));
  };
  const categoriesToDisplay = filteredCategories.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );
  const deleteCategory = async (categoryID) => {
    try {
      const response = await fetch(`https://electronic-ecommerce.onrender.com/api/deleteCategory/${categoryID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
  
      if (response.ok) {
        console.log(`Category with ID ${categoryID} deleted successfully`);
        toast.success(result.message || "Category deleted successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setRefresh(prev => !prev);
      } else {
        console.log(`Failed to delete category with ID ${categoryID}`);
        toast.error(`Failed to delete category with ID ${categoryID}`, {
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
      toast.error("An error occurred while deleting the category", {
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
  return (
    <div className="overflow-x-auto">
      <ToastContainer />
      {/* Search Bar */}
      <div className="flex items-center justify-between p-4">
        <SearchBar onSearch={setSearchQuery} />
        {/* <button
          onClick={handleAddCategoryClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 whitespace-nowrap"
        >
          + Add Category
        </button> */}
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="category table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Category Name</StyledTableCell>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoriesToDisplay.length > 0 ? (
              categoriesToDisplay.map((category) => (
                <StyledTableRow key={category.CategoryID}>
                  <StyledTableCell>{category.CategoryName}</StyledTableCell>
                  <StyledTableCell>
                    <img src={category.CategoryImage} alt={category.CategoryName} className="w-12 h-12 object-cover" />
                  </StyledTableCell>
                  <StyledTableCell>{category.CategoryDescription}</StyledTableCell>
                  <StyledTableCell align="center">
                  <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleOrderUpdate(category.CategoryID)}
                        className="button edit-button flex items-center"
                      >
                        <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                        Edit
                      </button>
                      <button  onClick={() => deleteCategory(category.CategoryID)}  
                      className="button delete-button flex items-center">
                         <MdOutlineCancel
                          aria-hidden="true"
                          className="h-4 w-4 font-small"
                        />
                        Delete
                      </button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={4} align="center">No categories available</StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredCategories.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        ActionsComponent={TablePaginationActions}
      />
    </div>
  );
};

export default CategoryTable;


