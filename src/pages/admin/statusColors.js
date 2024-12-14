import React from 'react';
import { Badge } from '@mui/material';

const StatusBadge = ({ status }) => {
  let badgeColor = 'default';
  let badgeText = status;

  // Set the color and text based on the status
  switch (status) {
    case 'Dispatched':
      badgeColor = 'primary';
      badgeText = 'Shipped';
      break;
    case 'Production':
      badgeColor = 'secondary';
      badgeText = 'Pending';
      break;
    case 'Technical':
      badgeColor = 'warning';
      badgeText = 'Technical Issue';
      break;
    case 'Canceled':
      badgeColor = 'error';
      badgeText = 'Canceled';
      break;
    default:
      badgeColor = 'default';
      badgeText = status;
  }

  return (
    <Badge
      badgeContent={badgeText}
      color={badgeColor}
      sx={{ textTransform: 'capitalize' }} // Ensures the status text is properly formatted
    />
  );
};

export default StatusBadge;
