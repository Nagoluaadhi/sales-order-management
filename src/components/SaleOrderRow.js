import React, { useState } from 'react';

const styles = {
  td: {
    padding: '12px 15px',
    border: '1px solid green',
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: 'white',
    display: 'flex',
    color: 'black',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
};

const SaleOrderRow = ({ saleOrder, onEdit }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisible);
  };

  return (
    <React.Fragment>
      <tr style={styles.tr}>
        <td style={styles.td}>{saleOrder.id}</td>
        <td style={styles.td}>{saleOrder.customerName}</td>
        <td style={styles.td}>{saleOrder.LastModified}</td>
        <td style={styles.td}>{saleOrder.price}</td>
        <td style={styles.td}>
          <button type="button" style={styles.button} onClick={toggleDetailsVisibility}>
            <big>
              <strong>...</strong>
            </big>
          </button>
        </td>
      </tr>
      {detailsVisible && saleOrder && saleOrder.items && (
  <tr>
    <td colSpan="5">
      <div className="sale-order-details">
        <h3>Sale Order Details</h3>
        <p>Customer: {saleOrder.customerName}</p>
        <p>Invoice No: {saleOrder.invoiceNo}</p>
        <p>Invoice Date: {saleOrder.invoiceDate}</p>
        <p>Paid: {saleOrder.paid ? 'Yes' : 'No'}</p>
        <h4>Items:</h4>
        <ul>
          {saleOrder.items.map((item, index) => (
            <li key={index}>
              SKU: {item.skuId}, Price: ₹{item.price}, Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </td>
  </tr>
)}
    </React.Fragment>
  );
};

export default SaleOrderRow;
