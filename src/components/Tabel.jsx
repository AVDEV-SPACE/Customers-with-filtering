import React, { useState, useMemo } from 'react';
import Row from './Row';
import SearchBar from './SearchBar';

function Tabel({ customers, onSelectCustomer }) {
  // State for managing the search input value
  const [searchTerm, setSearchTerm] = useState('');
  // State for managing the current sort order (none, ascending, descending)
  const [sortOrder, setSortOrder] = useState('none');

  // Memoizes customers with their total order amount for efficient sorting
  const customersWithTotalAmount = useMemo(() => {
    return customers.map(customer => ({
      ...customer,
      totalAmount: customer.orders.reduce((sum, order) => sum + order.total, 0)
    }));
  }, [customers]); // Recalculates only when 'customers' prop changes

  // Memoizes filtered customers based on search term
  const filteredCustomers = useMemo(() => {
    return customersWithTotalAmount.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customersWithTotalAmount, searchTerm]); // Recalculates only when filtered data or search term changes

  // Memoizes sorted customers based on the selected sort order
  const sortedCustomers = useMemo(() => {
    if (sortOrder === 'none') {
      return filteredCustomers; // No sorting needed if 'none' is selected
    }

    const sorted = [...filteredCustomers].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.totalAmount - b.totalAmount; // Sorts in ascending order
      }
      // sortOrder === 'desc'
      return b.totalAmount - a.totalAmount; // Sorts in descending order
    });
    return sorted;
  }, [filteredCustomers, sortOrder]); // Recalculates only when filtered data or sort order changes

  // Defines a common width for control elements
  const commonControlWidth = '400px';

  return (
    <div style={{ width: '100vw' }}>
      <h1 style={{ textAlign:'center', marginBottom: '20px', color: 'white' }}>Customer Dashboard</h1>

      <div className='srch_filters'
        style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '25px',
        gap: '0.5rem',
        width: '100%'
      }}>
        {/* Search bar component for filtering customers */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} commonWidth={commonControlWidth} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: commonControlWidth
        }}>
          <label htmlFor="sort-customers" style={{ marginRight: '10px', color: '#eee' }}>Sort by Total Spent: </label>
          {/* Dropdown for selecting sort order */}
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

      <div style={{ overflowX: 'auto', width: '70vw', margin: '0 auto' }}>
        <table style={{
          width: '70vw',
          borderCollapse: 'collapse',
          backgroundColor: '#333',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          color: '#eee',
          tableLayout: 'fixed'
        }}>
          <thead>
            <tr>
              <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #555', color: '#007bff', width: '25%' }}>Name</th>
              <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #555', color: '#007bff', width: '30%' }}>Email</th>
              <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #555', color: '#007bff', width: '20%' }}>Total Amount</th>
              <th style={{ padding: '12px 15px', textAlign: 'left', borderBottom: '1px solid #555', color: '#007bff', width: '15%' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Renders each customer row */}
            {sortedCustomers.map(customer => (
              <Row
                key={customer.id}
                customer={customer}
                onViewOrders={onSelectCustomer}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tabel;