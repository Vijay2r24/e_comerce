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
import { getAllProductTypesAPI, deleteProductTypeAPI } from '../../Constants/apiRoutes'
import {
    StyledTableCell,
    StyledTableRow,
    TablePaginationActions,
} from "../CustomTablePagination";
const ProductTypeTable = ({ onEditAction }) => {
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [productTypes, setProductTypes] = useState([]);
    const [filteredProductTypes, setFilteredProductTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchQuery, setSearchQuery] = useState("");

    const handleAddProductTypeClick = () => {
        navigate("/addProductType"); // Adjust the route accordingly
    };
    const handleProductTypeUpdate = () => {
        // onEditAction(); // Trigger the navigation to Step3
    };
    const handleOrderUpdate = (ProductTypeID) => {
        console.log("Navigating to:", `/Browse/step3/${ProductTypeID}`);
        navigate(`/Browse/step3/editProductType/${ProductTypeID}`);

    };
    // const handleProductTypeUpdate = (ProductTypeID) => {
    //     navigate(`/editProductType/${ProductTypeID}`); // Adjust the route accordingly
    // };

    const deleteProductType = async (ProductTypeID) => {
        try {
            const response = await fetch(`${deleteProductTypeAPI}/${ProductTypeID}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            const result = await response.json();
            if (response.ok) {
                toast.success(result.message || "Product Type deleted successfully!");
                setRefresh((prev) => !prev);
            } else {
                toast.error(`Failed to delete Product Type with ID ${ProductTypeID}`);
            }
        } catch (error) {
            toast.error("An error occurred while deleting the Product Type");
        }
    };

    useEffect(() => {
        const filtered = Array.isArray(productTypes)
            ? productTypes.filter((productType) =>
                (productType.ProductTypeName &&
                    productType.ProductTypeName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (productType.ProductTypeID &&
                    productType.ProductTypeID.toString().includes(searchQuery))
            )
            : [];
        setFilteredProductTypes(filtered);
    }, [searchQuery, productTypes]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const productTypesToDisplay = filteredProductTypes.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => setCurrentPage(value);

    useEffect(() => {
        const fetchProductTypes = async () => {
            try {
                const response = await fetch(getAllProductTypesAPI); // Replace with your API
                const data = await response.json();
                if (data.status === "SUCCESS") {
                    setProductTypes(data.data);
                } else {
                    console.error("Failed to fetch Product Types");
                }
            } catch (error) {
                console.error("Error fetching Product Types:", error);
            }
        };
        fetchProductTypes();
    }, [refresh]);

    return (
        <div className="overflow-x-auto">
            <ToastContainer />
            <div className="flex items-center justify-between p-3">
                <SearchBar onSearch={setSearchQuery} />
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="product type table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Product Type ID</StyledTableCell>
                            <StyledTableCell>Product Type Name</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productTypesToDisplay.length > 0 ? (
                            productTypesToDisplay.map((productType) => (
                                <StyledTableRow key={productType.ProductTypeID}>
                                    <StyledTableCell>{productType.ProductTypeID}</StyledTableCell>
                                    <StyledTableCell>{productType.ProductTypeName}</StyledTableCell>
                                    <StyledTableCell align="center">
                                    <Chip
    label={productType.Status}
    sx={{
        backgroundColor:
            productType.Status === "Active" ? "#81C784" : "#EF5350", // Lighter green and red shades
        color: "white",
        fontWeight: "bold",
        borderRadius: "16px", // Soft rounded corners
        padding: "6px 12px", // Adjust padding for better spacing
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        transition: "background-color 0.3s ease, transform 0.2s ease", // Smooth transition
        "&:hover": {
            transform: "scale(1.05)", // Slightly enlarge the chip on hover
            backgroundColor:
                productType.Status === "Active" ? "#66BB6A" : "#F44336", // Darker shade on hover
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
                                                onClick={() => handleOrderUpdate(productType.ProductTypeID)}
                                                className="button edit-button flex items-center space-x-1"
                                            >
                                                <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => deleteProductType(productType.ProductTypeID)}
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
                                <StyledTableCell colSpan={4} align="center">
                                    No Product Types available
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredProductTypes.length}
                rowsPerPage={itemsPerPage}
                page={currentPage - 1}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
export default ProductTypeTable
