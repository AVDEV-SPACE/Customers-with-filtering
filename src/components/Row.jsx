import React from 'react';

function Row({ customer, onViewOrders }) {
  const totalAmountSpent = customer.orders.reduce((sum, order) => sum + order.total, 0);
  const numberOfOrders = customer.orders.length;

  return (
    <div style={{
      border: '1px solid #555',
      padding: '15px',
      borderRadius: '8px',
      backgroundColor: '#3333339a', 
      boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
      width: '90%',
      maxWidth: '450px',
      color: '#eee'
    }}>
      <h3 style={{ fontSize: '1.5em', marginBottom: '8px', color: '#007bff' }}>Customer: {customer.name}</h3>
      <p style={{ marginBottom: '5px', color: '#eee' }}>Email: {customer.email}</p>
      <p style={{ marginBottom: '5px', color: '#eee' }}>
        Total Amount: 
        <span style={{ fontWeight: 'bold', color: '#28a745' }}>
          €{totalAmountSpent.toFixed(2)}
        </span></p>
      <p style={{ marginBottom: '15px', color: '#eee' }}>
        Number of Orders: 
        <span style={{ fontWeight: 'bold' }}>{numberOfOrders}</span></p>
      <button
        onClick={() => onViewOrders(customer)}
        style={{
          padding: '10px 15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1em',
          transition: 'background-color 0.3s ease',
          display: 'block',
          width: '100%',
          marginTop: '10px'
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
      >
        View Orders
      </button>
    </div>
  );
}

export default Row;