import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import SearchBar from "../search_bar";
import { useNavigate } from 'react-router-dom';
import {getAllOrders} from '../../Constants/apiRoutes'
import {
  StyledTableCell,
  StyledTableRow,
  TablePaginationActions,
} from "../CustomTablePagination";

const OrderTable = () => {
  const [order, setOrder] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  
  useEffect(() => {
    fetch(getAllOrders)
      .then(response => response.json())
      .then(data => {
        setFilteredOrders(Array.isArray(data.data) ? data.data : []);
      });
  }, []);

  const navigate = useNavigate();
  const handleAddOrderClick = () => {
    navigate('/orders');
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const filteredOrders = Array.isArray(order)
      ? order.filter(order =>
          (order.OrderNumber && order.OrderNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (order.CustomerName && order.CustomerName.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : [];
    setFilteredOrders(filteredOrders);
  }, [searchQuery, order]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = Array.isArray(filteredOrders) ? filteredOrders.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const openModal = (type, order) => {
    // Open modal logic
  };

  const closeModal = () => {
    // Close modal logic
  };

  return (
    <div className="overflow-x-auto">
      {/* Search Bar */}
      <div className="flex items-center justify-between p-4">
        <SearchBar onSearch={setSearchQuery} />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order Number</StyledTableCell>
              <StyledTableCell>Order Date</StyledTableCell>
              <StyledTableCell>Customer Info</StyledTableCell>
              <StyledTableCell>Delivery Info</StyledTableCell>
              <StyledTableCell align="center">Order Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.map((order) => (
              <StyledTableRow key={order.OrderID}>
                <StyledTableCell>{order.OrderID}</StyledTableCell>
                <StyledTableCell>{new Date(order.OrderDate).toLocaleDateString()}</StyledTableCell>
                <StyledTableCell>
                  <div>
                    <div>Name: <strong>{order.CustomerName || 'Unknown'}</strong></div>
                    <div>Phone: {order.Phone || 'N/A'}</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <div>
                    <div>Delivery Date: {new Date(order.DeliveryDate).toLocaleDateString()}</div>
                    <div>Amount: &#8377;{parseFloat(order.TotalAmount).toFixed(2)}</div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <span>{order.OrderStatus}</span>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => openModal("edit", order)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => openModal("delete", order)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredOrders.length}
        rowsPerPage={itemsPerPage}
        page={currentPage - 1}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handlePageChange}
      />
    </div>
  );
};

export default OrderTable;

