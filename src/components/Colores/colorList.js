import React, { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Paper,
    Chip
} from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { routeNames } from "../../constants";
import { useNavigate } from 'react-router-dom';
import SearchBar from "../search_bar";
import {
    StyledTableCell,
    StyledTableRow
} from "../CustomTablePagination";
import { getAllColorsAPI, deleteColorAPI } from "../../Constants/apiRoutes";

const ColorTable = ({ onEditAction }) => {
    const [refresh, setRefresh] = useState(false);
    const [colors, setColors] = useState([]);
    const [filteredColors, setFilteredColors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const deleteColor = async (ColourID) => {
        try {
            const response = await fetch(`${deleteColorAPI}/${ColourID}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            const result = await response.json();
            if (response.ok) {
                toast.success(result.message || "Color deleted successfully!");
                setRefresh((prev) => !prev);
            } else {
                toast.error(`Failed to delete color with ID ${ColourID}`);
            }
        } catch (error) {
            toast.error("An error occurred while deleting the color");
        }
    };
      const handleOrderUpdate = (ColourID) => {
        navigate(routeNames.editCreateColor(ColourID));
      };

    useEffect(() => {
        const filtered = Array.isArray(colors)
            ? colors.filter((color) =>
                (color.Name &&
                    color.Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (color.ColourID &&
                    color.ColourID.toString().includes(searchQuery))
            )
            : [];
        setFilteredColors(filtered);
    }, [searchQuery, colors]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const colorsToDisplay = filteredColors.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => setCurrentPage(value);

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const response = await fetch(getAllColorsAPI);
                const data = await response.json();
                if (data.status === "SUCCESS") {
                    setColors(data.data);
                } else {
                    console.error("Failed to fetch colors");
                }
            } catch (error) {
                console.error("Error fetching colors:", error);
            }
        };
        fetchColors();
    }, [refresh]);

    return (
        <div className="overflow-x-auto">
            <ToastContainer />
            <div className="flex items-center justify-between p-3">
                <SearchBar onSearch={setSearchQuery} />
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="color table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Colour ID</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Hex Code</StyledTableCell>
                            <StyledTableCell>RGB Code</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {colorsToDisplay.length > 0 ? (
                            colorsToDisplay.map((color) => (
                                <StyledTableRow key={color.ColourID}>
                                    <StyledTableCell>{color.ColourID}</StyledTableCell>
                                    <StyledTableCell>{color.Name}</StyledTableCell>
                                    <StyledTableCell>{color.HexCode}</StyledTableCell>
                                    <StyledTableCell>{color.RgbCode}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => handleOrderUpdate(color.ColourID)}
                                                className="button edit-button flex items-center space-x-1"
                                            >
                                                <AiOutlineEdit aria-hidden="true" className="h-4 w-4" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => deleteColor(color.ColourID)}
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
                                <StyledTableCell colSpan={5} align="center">
                                    No Colors available
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredColors.length}
                rowsPerPage={itemsPerPage}
                page={currentPage - 1}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ColorTable;
