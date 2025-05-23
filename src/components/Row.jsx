import React from 'react';

function Row({ customer, onViewOrders }) {
  const totalAmountSpent = customer.orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <tr style={{ borderBottom: '1px solid #444' }}>
      <td style={{ padding: '12px 15px', color: '#eee', textAlign: 'left' }}>{customer.name}</td>
      <td style={{ padding: '12px 15px', color: '#eee', textAlign: 'left' }}>{customer.email}</td>
      <td style={{ padding: '12px 15px', color: '#28a745', textAlign: 'left' }}>€{totalAmountSpent.toFixed(2)}</td>
      <td style={{ padding: '12px 15px', textAlign: 'left' }}>
        <button
          onClick={() => onViewOrders(customer)}
          style={{
            padding: '8px 12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.9em',
            transition: 'background-color 0.3s ease'
          }}
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
