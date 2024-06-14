import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './SaleOrderForm.css';

// Sample customer data
const customers = [
  {
    id: 11908,
    name: 'Ram',
    email: 'jesus_christ@church.com',
    location: 'Mumbai, Maharashtra, India',
    pincode: '517600'
  },
  {
    id: 11909,
    name: 'Jack',
    email: 'jack02@gmail.com',
    location: 'Chennai, Tamil Nadu, India',
    pincode: '517520'
  },
  {
    id: 12908,
    name: 'Arun',
    email: 'arun03@gmail.com',
    location: 'Hyderabab, Telangana, India',
    pincode: '517644'
  },
  {
    id: 13908,
    name: 'Bob',
    email: 'bob04@gmail.com',
    location: 'chennai, Tamil Nadu, India',
    pincode: '517520'
  },
  {
    id: 14908,
    name: 'John',
    email: 'joh05@gmail.com',
    location: 'Mumbai, Maharashtra, India',
    pincode: '517600'
  },
];

const products = [
  {
    id: 209,
    name: 'New Product',
    sku: [
      {
        id: 248,
        selling_price: 54,
        max_retail_price: 44,
        amount: 33,
        unit: 'kg',
        quantity_in_inventory: 0,
        product: 209
      },
      {
        id: 247,
        selling_price: 32,
        max_retail_price: 32,
        amount: 33,
        unit: 'kg',
        quantity_in_inventory: 0,
        product: 209
      },
      {
        id: 246,
        selling_price: 23,
        max_retail_price: 21,
        amount: 22,
        unit: 'kg',
        quantity_in_inventory: 1,
        product: 209
      }
    ]
  },
];

const SaleOrderForm = () => {
  const [customer, setCustomer] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [paid, setPaid] = useState(false);
  const [errors, setErrors] = useState({}); // State to store validation errors
  const [saleOrder, setSaleOrder] = useState(null); // State to store the created sale order

  // Function to handle customer selection
  const handleCustomerChange = (e) => {
    setCustomer(e.target.value);
  };

  // Function to handle product selection changes
  const handleProductChange = (index, field, value) => {
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts[index] = { ...newSelectedProducts[index], [field]: value };
    setSelectedProducts(newSelectedProducts);
  };

  // Function to add a new product to the order
  const handleAddProduct = () => {
    setSelectedProducts([...selectedProducts, { sku_id: '', price: '', quantity: '' }]);
  };

  // Function to remove a product from the order
  const handleRemoveProduct = (index) => {
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts.splice(index, 1);
    setSelectedProducts(newSelectedProducts);
  };

  // Function to validate the form data
  const validateForm = () => {
    const errors = {};
    if (!customer) {
      errors.customer = 'Please select a customer';
    }
    if (selectedProducts.length === 0) {
      errors.products = 'Please add at least one product';
    }
    selectedProducts.forEach((product, index) => {
      if (!product.sku_id) {
        errors[`product-${index}-sku_id`] = 'Please select a SKU';
      }
      if (!product.price) {
        errors[`product-${index}-price`] = 'Please enter a price';
      }
      if (!product.quantity) {
        errors[`product-${index}-quantity`] = 'Please enter a quantity';
      }
    });
    return errors;
  };

  // Function to submit the sale order form
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        // Replace with your actual API call to create a sale order
        const response = await fetch('/api/sale-orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_id: customer,
            items: selectedProducts,
            paid,
            invoice_no: invoiceNo,
            invoice_date: invoiceDate.toISOString().split('T')[0]
          })
        });
        const data = await response.json();
        setSaleOrder(data);
        // Clear the form after successful submission (optional)
        setCustomer('');
        setSelectedProducts([]);
        setInvoiceNo('');
        setInvoiceDate(new Date());
        setPaid(false);
      } catch (error) {
        console.error('Error submitting sale order:', error);
      }
    }
  };

  // Function to format the date string
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Create Sale Order</h2>
        <div className="form-group">
          <label htmlFor="customer">Customer: </label>
          <select id="customer" value={customer} onChange={handleCustomerChange}>
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          {errors.customer && <span className="error">{errors.customer}</span>}
        </div><br></br>
        <div className="form-group">
          <label htmlFor="invoiceNo">Invoice No:  </label>
          <input
            type="text"
            id="invoiceNo"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
          />
        </div><br></br>
        <div className="form-group">
          <label htmlFor="invoiceDate">Invoice Date: </label>
          <DatePicker
            selected={invoiceDate}
            onChange={(date) => setInvoiceDate(date)}
            dateFormat="yyyy/MM/dd"
          />
        </div><br></br>
        <div className="form-group">
          <label htmlFor="paid">Paid: </label>
          <input
            type="checkbox"
            id="paid"
            checked={paid}
            onChange={(e) => setPaid(e.target.checked)}
          />
        </div><br></br>
        
        {selectedProducts.map((product, index) => (
          <div key={index} className="product-item"><h3>Product</h3>
            <select
              value={product.sku_id}
              onChange={(e) => handleProductChange(index, 'sku_id', e.target.value)}
            >
              <option value="">Select SKU</option><br></br>
              {products.map((prod) =>
                prod.sku.map((sku) => (
                  <option key={sku.id} value={sku.id}>
                    {prod.name} - {sku.unit} - ₹{sku.selling_price}
                  </option>
                ))
              )}
            </select>
            {errors[`product-${index}-sku_id`] && (
              <span className="error">{errors[`product-${index}-sku_id`]}</span>
            )}
            <input
              type="number"
              placeholder="Price"
              value={product.price}
              onChange={(e) => handleProductChange(index, 'price', e.target.value)}
            />
            {errors[`product-${index}-price`] && (
              <span className="error">{errors[`product-${index}-price`]}</span>
            )}
            <input
              type="number"
              placeholder="Quantity"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
            /><br></br>
            {errors[`product-${index}-quantity`] && (
              <span className="error">{errors[`product-${index}-quantity`]}</span>
            )}
           <br></br> <br></br><button type="button" onClick={() => handleRemoveProduct(index)}>Remove</button>
          </div>
        ))}
        {errors.products && <span className="error">{errors.products}</span>}
        <br></br><button type="button" onClick={handleAddProduct}>Add Product</button><br></br>
        <br></br><button type="submit">Save</button>
      </form>

      {/* Display the created sale order (if any) */}
      {saleOrder && (
        <div className="sale-order-details">
          <h3>Sale Order Details</h3>
          <p>Customer: {customers.find((c) => c.id === saleOrder.customer_id)?.name}</p>
          <p>Invoice No: {saleOrder.invoice_no}</p>
          <p>Invoice Date: {formatDate(new Date(saleOrder.invoice_date))}</p>
          <p>Paid: {saleOrder.paid ? 'Yes' : 'No'}</p>
          <h4>Items:</h4>
          <ul>
            {saleOrder.items.map((item, index) => (
              <li key={index}>
                SKU: {item.sku_id}, Price: ₹{item.price}, Quantity: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default SaleOrderForm;
