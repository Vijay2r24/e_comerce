import React, { useState } from "react";
import { FiPackage, FiUsers, FiMousePointer, FiShoppingCart } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const data1 = [
  { name: 'Online', value: 50, color: '#4285F4' },
  { name: 'Offline', value: 50, color: '#FBBC05' }
];
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill={data1[index].color}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const data = [
  { name: 'Jan', Online: 75, Trade: 60, Offline: 50 },
  { name: 'Feb', Online: 50, Trade: 75, Offline: 65 },
  { name: 'Mar', Online: 60, Trade: 40, Offline: 55 },
  { name: 'Apr', Online: 55, Trade: 60, Offline: 45 },
  { name: 'May', Online: 60, Trade: 75, Offline: 50 },
  { name: 'Jun', Online: 70, Trade: 80, Offline: 55 },
  { name: 'Jul', Online: 55, Trade: 60, Offline: 40 },
];


const OrdersCard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(index);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentRow(null);
  };

  const tableData = [
    {
      productName: "iPhone 16 Pro max",
      orderId: "ORD001",
      status: "Delivered",
      price: "$1660.00",
      productImage: "/path/to/iphone-image.jpg", // Replace with actual image path
    },
    {
      productName: "Headphone",
      orderId: "ORD002",
      status: "Process",
      price: "$583.00",
      productImage: "/path/to/headphone-image.jpg", // Replace with actual image path
    },
    {
      productName: "Apple iPad",
      orderId: "ORD001",
      status: "Shipped",
      price: "$1160.00",
      productImage: "/path/to/ipad-image.jpg", // Replace with actual image path
    },
    {
      productName: "Apple Macbook",
      orderId: "ORD002",
      status: "Delivered",
      price: "$1583.00",
      productImage: "/path/to/macbook-image.jpg", // Replace with actual image path
    },
    {
      productName: "Smart Watch",
      orderId: "ORD001",
      status: "Shipped",
      price: "$660.00",
      productImage: "/path/to/smartwatch-image.jpg", // Replace with actual image path
    },
    {
      productName: "CCTV",
      orderId: "ORD002",
      status: "Process",
      price: "$183.00",
      productImage: "/path/to/cctv-image.jpg", // Replace with actual image path
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <div className="p-3 bg-green-100 rounded-md">
              <FiPackage className="text-green-500 text-2xl" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-800">New Orders</h3>
              <p className="text-sm text-gray-500">This week</p>
            </div>
          </div>
          <div className="flex items-baseline mt-4">
            <span className="text-3xl font-bold text-gray-900">1,368</span>
            <span className="ml-2 text-green-500 text-sm flex items-center">
              0.43% <span className="text-green-500 ml-1">▲</span>
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
            <div className="h-2 bg-green-500 rounded-full" style={{ width: "75%" }}></div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <div className="p-3 bg-blue-100 rounded-md">
              <FiUsers className="text-blue-500 text-2xl" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-800">New Customers</h3>
              <p className="text-sm text-gray-500">This week</p>
            </div>
          </div>
          <div className="flex items-baseline mt-4">
            <span className="text-3xl font-bold text-gray-900">785</span>
            <span className="ml-2 text-green-500 text-sm flex items-center">
              0.39% <span className="text-green-500 ml-1">▲</span>
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
            <div className="h-2 bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <div className="p-3 bg-orange-100 rounded-md">
              <FiMousePointer className="text-orange-500 text-2xl" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-800">Online Orders</h3>
              <p className="text-sm text-gray-500">This week</p>
            </div>
          </div>
          <div className="flex items-baseline mt-4">
            <span className="text-3xl font-bold text-gray-900">795</span>
            <span className="ml-2 text-red-500 text-sm flex items-center">
              1.39% <span className="text-red-500 ml-1">▼</span>
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
            <div className="h-2 bg-orange-500 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <div className="p-3 bg-purple-100 rounded-md">
              <FiShoppingCart className="text-purple-500 text-2xl" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-800">Offline Orders</h3>
              <p className="text-sm text-gray-500">This week</p>
            </div>
          </div>
          <div className="flex items-baseline mt-4">
            <span className="text-3xl font-bold text-gray-900">573</span>
            <span className="ml-2 text-green-500 text-sm flex items-center">
              1.39% <span className="text-green-500 ml-1">▼</span>
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
            <div className="h-2 bg-purple-500 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>



      {/* Container for graphs */}
      <div className="flex space-x-4 mt-2 mb-2">

        {/* Bar Chart */}
        <div className="w-1/2 border rounded-lg shadow-md bg-white p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Order Analysis</h2>
            <select className="border p-1 rounded-md">
              <option>January</option>
              <option>February</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Online" fill="#4285F4" />
              <Bar dataKey="Trade" fill="#34A853" />
              <Bar dataKey="Offline" fill="#FBBC05" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="w-1/2 flex flex-col items-center border rounded-lg shadow-md bg-white p-6">
          <h3 className="text-gray-500 font-medium mb-4">Most Orders</h3>
          <PieChart width={200} height={200}>
            <Pie
              data={data1}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              labelLine={false}
              label={renderCustomLabel}
              dataKey="value"
            >
              {data1.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div className="text-center font-semibold text-lg mt-2">All Orders</div>
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            formatter={(value, entry) => (
              <span className="flex items-center">
                <span className="mr-2" style={{ color: entry.color }}>•</span>
                <span className="text-sm text-gray-600">{value}</span>
              </span>
            )}
          />
          <div className="flex justify-center mt-4 space-x-8">
            {data1.map((entry, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span
                  className="w-4 h-4 rounded-full border-2"
                  style={{
                    borderColor: entry.color,
                    backgroundColor: entry.color,
                  }}
                ></span>
                <span className="text-gray-700 font-medium">
                  {entry.name} - {entry.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 4, // Adds a border radius
          overflow: "hidden", // Ensures the table respects the border radius
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#E5E7EB", // Header background color
                  fontWeight: "bold", // Optional: Makes text bold
                }}
              >
                Product Name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#E5E7EB",
                  fontWeight: "bold",
                }}
              >
                Order ID
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#E5E7EB",
                  fontWeight: "bold",
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#E5E7EB",
                  fontWeight: "bold",
                }}
              >
                Price
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#E5E7EB",
                  fontWeight: "bold",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      alt={row.productName}
                      src={row.productImage}
                      sx={{ width: 30, height: 30, marginRight: 1 }}
                    />
                    {row.productName}
                  </Box>
                </TableCell>
                <TableCell>{row.orderId}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleClick(event, index)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={currentRow === index}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <Button variant="contained" color="primary" size="small">
                        View
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button variant="outlined" color="secondary" size="small">
                        Edit
                      </Button>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button variant="outlined" color="error" size="small">
                        Delete
                      </Button>
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


    </div>
  );
};

export default OrdersCard;
