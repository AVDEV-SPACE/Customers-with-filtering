import React, { useState, useMemo } from 'react';
import Row from './Row';
import SearchBar from './SearchBar';
import '../App.css'; 

function Tabel({ customers, onSelectCustomer }) {
  // State for managing the search input value
  const [searchTerm, setSearchTerm] = useState('');
  // State for managing the current sort order (none, ascending, descending)
  const [sortOrder, setSortOrder] = useState('none');

  // Memoizes customers with their total order amount for efficient sorting
  const customersWithTotalAmount = useMemo(() => {
    return customers.map(customer => ({
      ...customer,
      totalAmount: customer.orders.reduce(
        (sum, order) => sum + order.total, 0)
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
    <div id="tabel-container">
      <h1 id="dashboard-title">Customer Dashboard</h1>

      <div className='srch_filters' id="search-filters-container">
        {/* Search bar component for filtering customers */}
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} commonWidth={commonControlWidth} />

        <div id="sort-control-wrapper">
          <label htmlFor="sort-customers" id="sort-label">Sort by Total Spent: </label>
          {/* Dropdown for selecting sort order */}
          <select
            id="sort-customers"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="none">None</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div id="table-wrapper-outer">
        <table id="customer-table">
          <thead>
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">Email</th>
              <th className="table-header">Total Amount</th>
              <th className="table-header">Details</th>
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