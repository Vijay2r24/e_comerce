import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import SearchBar from "../search_bar";
import { useNavigate } from 'react-router-dom';
import { routeNames } from "../../constants";
import { CheckCircle, Cancel } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { Chip } from '@mui/material';
import { getAllBrands, deleteBrand } from '../../Constants/apiRoutes'
import {
    StyledTableCell,
    StyledTableRow,
    TablePaginationActions,
} from "../CustomTablePagination";

const OrderTable = () => {

    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [brand, setBrand] = useState([]);
    const [session, setSession] = useState([]);
    const [filteredbrands, setFilteredBrands] = useState([]);
    const handleAddCategoryClick = () => {
        navigate(routeNames.newBrands);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [searchQuery, setSearchQuery] = useState("");
    const handleOrderUpdate = (BrandID) => {
        navigate(`/Browse/step1/editCreateBrand/${BrandID}`);
    };
    const deleteCategory = async (BrandID) => {
        try {
            const response = await fetch(`${deleteBrand}/${BrandID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (response.ok) {
                console.log(`Category with ID ${BrandID} deleted successfully`);
                toast.success(result.message || "Brand deleted successfully!", {
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
                console.log(`Failed to delete category with ID ${BrandID}`);
                toast.error(`Failed to delete category with ID ${BrandID}`, {
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

    useEffect(() => {
        const filtered = Array.isArray(brand)
            ? brand.filter(brand =>
                (brand.BrandName && brand.BrandName.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
                (brand.BrandCode && brand.BrandCode.toLowerCase().includes(searchQuery.toLowerCase()))
            )
            : [];
        setFilteredBrands(filtered);
    }, [searchQuery, brand]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const brandsToDisplay = filteredbrands.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredbrands.length / itemsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    useEffect(() => {
        // API URL
        const apiUrl = getAllBrands;

        // Fetching data from the API
        const storedData = sessionStorage.getItem('brands');
        if (storedData) {
            // If data exists in sessionStorage, use it
            setSession(JSON.parse(storedData));
        }
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'SUCCESS') {
                    setBrand(data.data);  // Store the data
                    sessionStorage.setItem('session', JSON.stringify(data.data));
                    console.log("vijay", data.data);
                } else {
                    console.error('Failed to fetch brands');
                }
            })
            .catch((err) => console.error('Error:', err));  // Handle errors
    }, [refresh]);
    return (
        <div className="overflow-x-auto">
            {/* Search Bar */}
            <ToastContainer />
            {/* Table */}
            <div className="flex items-center justify-between p-4">
                <SearchBar onSearch={setSearchQuery} />
                {/* <button
                    onClick={handleAddCategoryClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 whitespace-nowrap"
                >
                    + Add Brand
                </button> */}
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="brand table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Brand ID</StyledTableCell>
                            <StyledTableCell>Brand Name</StyledTableCell>
                            <StyledTableCell>Category ID</StyledTableCell>
                            <StyledTableCell align="center">Is Active</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {brandsToDisplay.length > 0 ? (
                            brandsToDisplay.map((brand) => (
                                <StyledTableRow key={brand.BrandID}>
                                    <StyledTableCell>{brand.BrandID}</StyledTableCell>
                                    <StyledTableCell>{brand.BrandName}</StyledTableCell>
                                    <StyledTableCell>{brand.CategoryID}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Chip
                                            label={brand.IsActive ? 'Active' : 'Inactive'}
                                            sx={{
                                                backgroundColor: brand.IsActive ? "#81C784" : "#EF5350", // Lighter green and red shades
                                                color: "white",
                                                fontWeight: "bold",
                                                borderRadius: "16px", // Soft rounded corners
                                                padding: "6px 12px", // Adjust padding for better spacing
                                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                                                transition: "background-color 0.3s ease, transform 0.2s ease", // Smooth transition
                                                "&:hover": {
                                                    transform: "scale(1.05)", // Slightly enlarge the chip on hover
                                                    backgroundColor: brand.IsActive ? "#66BB6A" : "#F44336", // Darker shade on hover
                                                },
                                                whiteSpace: "nowrap", // Prevent text wrapping
                                                overflow: "hidden", // Ensure no overflow
                                                textOverflow: "ellipsis", // Add ellipsis for overflow text
                                            }}
                                        />

                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => handleOrderUpdate(brand.BrandID)}
                                                className="button edit-button flex items-center space-x-1"
                                            >
                                                <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => deleteCategory(brand.BrandID)}
                                                className="button delete-button flex items-center space-x-1"
                                            >
                                                <MdOutlineCancel aria-hidden="true" className="h-4 w-4 font-small" />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        ) : (
                            <StyledTableRow>
                                <StyledTableCell colSpan={5} align="center">No brands available</StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>


            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredbrands.length}
                rowsPerPage={itemsPerPage}
                page={currentPage - 1}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handlePageChange}
            />
        </div>
    );
};

export default OrderTable;