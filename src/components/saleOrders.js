let saleOrders = [
  {
    id: 1,
    customerName: 'Spider ap2000',
    price: '₹100',
    LastModified: '24/5/2024 (11:07 PM)',
    status: 'active',
    
  },
  {
    id: 2,
    customerName: 'Spider ap2000',
    price: '₹210',
    LastModified:'24/5/2024 (11:30 PM)',
    status: 'active',
  
  },
  {
    id: 1,
    customerName: 'John Doe',
    price: '₹150',
    LastModified: '23/5/2024 (10:00 AM)',
    status: 'completed',
    
  },
  {
    id: 2,
    customerName: 'Jane Doe',
    price: '₹250',
    LastModified: '22/5/2024 (11:00 AM)',
    status: 'completed',
    
  }
];

const getSaleOrders = () => saleOrders;

const getActiveSaleOrders = () => saleOrders.filter((saleOrder) => saleOrder.status === 'active');

const getCompletedSaleOrders = () => saleOrders.filter((saleOrder) => saleOrder.status === 'completed');

const addSaleOrder = (saleOrder) => {
  saleOrders.push(saleOrder);
};

const updateSaleOrder = (saleOrder) => {
  const index = saleOrders.findIndex((existingSaleOrder) => existingSaleOrder.id === saleOrder.id);
  if (index !== -1) {
    saleOrders[index] = saleOrder;
  }
};

const deleteSaleOrder = (id) => {
  saleOrders = saleOrders.filter((saleOrder) => saleOrder.id !== id);
};

export {
  getSaleOrders,
  getActiveSaleOrders,
  getCompletedSaleOrders,
  addSaleOrder,
  updateSaleOrder,
  deleteSaleOrder
};
