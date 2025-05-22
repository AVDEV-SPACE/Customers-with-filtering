import React, { useState } from 'react';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

function ClientDetails({ customer, onClose }) {
  const [sortOrder, setSortOrder] = useState('none');

  if (!customer) {
    return null;
  }

  const sortedOrders = [...customer.orders].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (sortOrder === 'asc') {
      return dateA - dateB;
    }
    if (sortOrder === 'desc') {
      return dateB - dateA;
    }
    return 0;
  });

  const averageOrderValue = sortedOrders.length > 0
    ? sortedOrders.reduce((sum, order) => sum + order.total, 0) / sortedOrders.length
    : 0;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#1a1919fd',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '650px',
        width: '90%',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            fontSize: '1.8em',
            cursor: 'pointer',
            color: '#888'
          }}
        >
          &times;
        </button>
        <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#d8d5d5', textAlign: 'center' }}>Orders for {customer.name}</h2>

        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <label htmlFor="sort-orders" style={{ marginRight: '10px', color: '#d8d5d5' }}>Sort Orders by Date: </label>
          <select
            id="sort-orders"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="none">None</option>
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </div>

        {customer.orders.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#777', fontStyle: 'italic' }}>No orders found for this customer.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto', border: '1px solid #eee', borderRadius: '5px' }}>
            {sortedOrders.map(order => (
              <li key={order.id} style={{
                borderBottom: '1px solid #eee',
                padding: '12px 15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#4947478f',
                fontSize: '0.95em'
              }}>
                <span style={{ fontWeight: 'bold', color: '#d8d5d5' }}>ID: {order.id}</span>
                <span style={{ color: '#007bff' }}>Amount: €{order.total.toFixed(2)}</span>
                <span style={{ color: '#fcfafa' }}>Date: {formatDate(order.date)}</span>
              </li>
            ))}
          </ul>
        )}

        <p style={{ marginTop: '25px', fontSize: '1.2em', fontWeight: 'bold', color: '#fcfafa', textAlign: 'center' }}>
          Average Order Value: <span style={{ color: '#28a745' }}>€{averageOrderValue.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}

export default ClientDetails;