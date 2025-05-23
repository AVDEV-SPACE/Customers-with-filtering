import React, { useState, useMemo } from 'react';
import '../App.css'; 

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

function ClientDetails({ customer, onClose }) {
  const [sortOrder, setSortOrder] = useState('none');

  // Memoize sorted orders. Recalculates only if 'customer' or 'sortOrder' changes.
  const sortedOrders = useMemo(() => {
    // Handle cases where customer or orders are missing, or no sorting is applied.
    if (!customer || !customer.orders || customer.orders.length === 0 || sortOrder === 'none') {
      return customer ? (customer.orders || []) : [];
    }

    // Create a copy to avoid mutating the original prop.
    const ordersCopy = [...customer.orders];

    ordersCopy.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortOrder === 'asc') {
        return dateA - dateB; // Sort ascending by date
      }
      if (sortOrder === 'desc') {
        return dateB - dateA; // Sort descending by date
      }
      return 0; // No change if sortOrder is invalid
    });

    return ordersCopy;
  }, [customer, sortOrder]); // Dependencies for memoization

  // Early exit if no customer is selected
  if (!customer) {
    return null;
  }

  // Calculate average order value from sorted orders
  const averageOrderValue = sortedOrders.length > 0
    ? sortedOrders.reduce((sum, order) => sum + order.total, 0) / sortedOrders.length
    : 0;

  return (
    <div className="client-details-overlay">
      <div className="client-details-modal">
        <button
          onClick={onClose}
          className="modal-close-button"
        >
          &times;
        </button>
        <h2 className="modal-title">Orders for {customer.name}</h2>

        <div className="sort-orders-control">
          <label htmlFor="sort-orders" className="sort-orders-label">Sort Orders by Date: </label>
          <select
            id="sort-orders"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-orders-select"
          >
            <option value="none">None</option>
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </div>

        {customer.orders.length === 0 ? (
          <p className="no-orders-message">No orders found for this customer.</p>
        ) : (
          <ul className="orders-list">
            {sortedOrders.map(order => (
              <li key={order.id} className="order-list-item">
                <span className="order-id">ID: {order.id}</span>
                <span className="order-amount">Amount: €{order.total.toFixed(2)}</span>
                <span className="order-date">Date: {formatDate(order.date)}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="average-order-value">
          Average Order Value: <span className="average-value-number">€{averageOrderValue.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}

export default ClientDetails;