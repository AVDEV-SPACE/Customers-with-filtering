import React, { useState } from 'react';
import Row from './Row';
import SearchBar from './SearchBar';

function Tabel({ customers, onSelectCustomer }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const totalA = a.orders.reduce((sum, order) => sum + order.total, 0);
    const totalB = b.orders.reduce((sum, order) => sum + order.total, 0);

    if (sortOrder === 'asc') {
      return totalA - totalB;
    }
    if (sortOrder === 'desc') {
      return totalB - totalA;
    }
    return 0;
  });

  const commonControlWidth = '350px';

  return (
    <div style={{ width: '100vw' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>Customer Dashboard</h1>

      <div className='srch_filters'
        style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '25px',
        gap: '0.5rem',
      }}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} commonWidth={commonControlWidth} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: commonControlWidth
        }}>
          <label htmlFor="sort-customers" style={{ marginRight: '10px', color: '#eee' }}>Sort by Total Spent: </label>
          <select
            id="sort-customers"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #555',
              backgroundColor: '#333',
              color: '#007bff',
              fontSize: '1em'
            }}
          >
            <option value="none">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        gap: '15px'
      }}>
        {sortedCustomers.map(customer => (
          <Row
            key={customer.id}
            customer={customer}
            onViewOrders={onSelectCustomer}
          />
        ))}
      </div>
    </div>
  );
}

export default Tabel;