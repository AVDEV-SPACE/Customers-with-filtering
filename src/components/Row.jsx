import React from 'react';
import '../App.css'; 

function Row({ customer, onViewOrders }) {
  const totalAmountSpent = customer.orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <tr className="customer-row">
      <td className="row-data customer-name">{customer.name}</td>
      <td className="row-data customer-email">{customer.email}</td>
      <td className="row-data total-amount">€{totalAmountSpent.toFixed(2)}</td>
      <td className="row-data view-details-cell">
        <button
          onClick={() => onViewOrders(customer)}
          className="view-orders-button"
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          View Orders
        </button>
      </td>
    </tr>
  );
}

export default Row;