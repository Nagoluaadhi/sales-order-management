import React from 'react';
import SaleOrderRow from './SaleOrderRow';

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontSize: '18px',
    textAlign: 'left',
  },
  th: {
    padding: '12px 15px',
    border: '1px solid green',
    backgroundColor: 'none',
    color:'green',
  },
  td: {
    padding: '12px 15px',
    border: '1px solid green',
  },
  tr: {
    ':nth-child(even)': {
      backgroundColor: '#f9f9f9',
    },
    ':hover': {
      backgroundColor: '#f1f1f1',
    },
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#0056b3',
    },
  },
};

const ActiveSaleOrders = ({ saleOrders, onEdit }) => {
  return (
    <div>
      <h2>Active Sale Orders</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Customer Name</th>
            <th style={styles.th}>Last Modified</th>
            <th style={styles.th}>Price (₹)</th>
            <th style={styles.th}>Edit/View</th>
          </tr>
        </thead>
        <tbody>
          {saleOrders.map((saleOrder) => (
            <SaleOrderRow key={saleOrder.id} saleOrder={saleOrder} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveSaleOrders;
