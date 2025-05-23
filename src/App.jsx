import React, { useState, useEffect } from 'react';
import customersData from '../customers.json';
import Tabel from './components/Tabel';
import ClientDetails from './components/ClientDetails';
import './index.css'; 

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
    <div style={{
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'flex-start', 
      width: '100vw',
      minHeight: '100vh', 
      backgroundColor: '#4947478f'  
      }}>
      <div style={{
      }}>
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