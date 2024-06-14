import React, { useState } from 'react';
import './App.css';
import ActiveSaleOrders from './ActiveSaleOrders';
import CompletedSaleOrders from './CompletedSaleOrders';
import Modal from './Modal';
import SaleOrderForm from './SaleOrderForm';
import { getActiveSaleOrders, getCompletedSaleOrders, addSaleOrder, updateSaleOrder, deleteSaleOrder } from './saleOrders';
import { useTheme } from '../components/ThemeContext';

const AppContainer = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [isOpen, setIsOpen] = useState(false);
  const [saleOrderToEdit, setSaleOrderToEdit] = useState(null);
  const [activeSaleOrders, setActiveSaleOrders] = useState(getActiveSaleOrders());
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEdit = (saleOrder) => {
    setSaleOrderToEdit(saleOrder);
    setIsOpen(true);
  };

  const handleAddSaleOrder = () => {
    setSaleOrderToEdit(null);
    setIsOpen(true);
  };

  const handleSubmit = (saleOrder) => {
    if (saleOrder.id) {
      updateSaleOrder(saleOrder);
    } else {
      addSaleOrder(saleOrder);
    }
    setActiveSaleOrders(getActiveSaleOrders());
    setIsOpen(false);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <header>
        <h1>Sale Order Management</h1>
        <button onClick={toggleDarkMode} style={{ padding: '10px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px' }}>
          {isDarkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
        </button><br></br><br></br>
      </header>
      <main>
        <div className="tab-container">
          <div className="tab">
            <button
              type="button"
              className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
              onClick={() => handleTabChange('active')}
            >
              Active Sale Orders
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => handleTabChange('completed')}
            >
              Completed Sale Orders
            </button>
          </div>
          <div className="add-sale-order">
            <button type="button" onClick={handleAddSaleOrder}>
              + Sale Order
            </button>
          </div>
        </div>
        {activeTab === 'active' ? (
          <ActiveSaleOrders saleOrders={activeSaleOrders} onEdit={handleEdit} />
        ) : (
          <CompletedSaleOrders saleOrders={getCompletedSaleOrders()} />
        )}
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <SaleOrderForm onSubmit={handleSubmit} saleOrder={saleOrderToEdit} />
          </Modal>
        )}
      </main>
    </div>
  );
};

export default AppContainer;
