import React, { useState, useEffect } from "react";
import { Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Paper } from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { Chip } from "@mui/material";
import {
    StyledTableCell,
    StyledTableRow,
    TablePaginationActions,
} from "../CustomTablePagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../search_bar";
import { getAllSizesAPI, deleteSizeAPI } from "../../Constants/apiRoutes";
import { routeNames } from "../../constants";
import { useNavigate } from 'react-router-dom';

const SizeTable = ({ onEditAction }) => {
    const [refresh, setRefresh] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [filteredSizes, setFilteredSizes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const handleOrderUpdate = (SizeID) => {
    navigate(routeNames.editCreateSize(SizeID));
 };

    const deleteSize = async (SizeID) => {
        try {
            const response = await fetch(`${deleteSizeAPI}/${SizeID}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            const result = await response.json();
            if (response.ok) {
                toast.success(result.message || "Size deleted successfully!");
                setRefresh((prev) => !prev);
            } else {
                toast.error(`Failed to delete Size with ID ${SizeID}`);
            }
        } catch (error) {
            toast.error("An error occurred while deleting the Size");
        }
    };

    useEffect(() => {
        const filtered = Array.isArray(sizes)
            ? sizes.filter((size) =>
                (size.Label && size.Label.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (size.SizeID && size.SizeID.toString().includes(searchQuery))
            )
            : [];
        setFilteredSizes(filtered);
    }, [searchQuery, sizes]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const sizesToDisplay = filteredSizes.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => setCurrentPage(value);

    useEffect(() => {
        const fetchSizes = async () => {
            try {
                const response = await fetch(getAllSizesAPI); // Replace with your API
                const data = await response.json();
                if (data.status === "SUCCESS") {
                    setSizes(data.data);
                } else {
                    console.error("Failed to fetch Sizes");
                }
            } catch (error) {
                console.error("Error fetching Sizes:", error);
            }
        };
        fetchSizes();
    }, [refresh]);

    return (
        <div className="overflow-x-auto">
            <ToastContainer />
            <div className="flex items-center justify-between p-3">
                <SearchBar onSearch={setSearchQuery} />
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="size table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Size ID</StyledTableCell>
                            <StyledTableCell>Label</StyledTableCell>
                            <StyledTableCell>Numeric Size</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sizesToDisplay.length > 0 ? (
                            sizesToDisplay.map((size) => (
                                <StyledTableRow key={size.SizeID}>
                                    <StyledTableCell>{size.SizeID}</StyledTableCell>
                                    <StyledTableCell>{size.Label}</StyledTableCell>
                                    <StyledTableCell>{size.NumericSize}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => handleOrderUpdate(size.SizeID)}
                                                className="button edit-button flex items-center space-x-1"
                                            >
                                                <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => deleteSize(size.SizeID)}
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
                                    No Sizes available
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredSizes.length}
                rowsPerPage={itemsPerPage}
                page={currentPage - 1}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default SizeTable;
