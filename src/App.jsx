import React, { useState, useEffect } from 'react';
import customersData from '../customers.json';
import Tabel from './components/Tabel';
import ClientDetails from './components/ClientDetails';
import './index.css';
import './App.css'; 

function App() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    setCustomers(customersData);
  }, []);

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
  };

  return (
    <div id="app-container"> 
      <div id="table-wrapper"> 
        <Tabel customers={customers} onSelectCustomer={handleSelectCustomer} />
      </div>


      {selectedCustomer && (
        <ClientDetails
          customer={selectedCustomer}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;