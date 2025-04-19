import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Failed to fetch product list');
      }
    } catch (error) {
      toast.error('Error fetching products');
    }
  };

  const removeFood = async (productId) => {
    try {
      const response = await axios.post(`${url}/api/product/remove`, { id: productId });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error('Error removing product');
      }
    } catch (error) {
      toast.error('Error removing product');
    }
  };

  const toggleStock = async (productId, currentStock) => {
    try {
      const response = await axios.post(`${url}/api/product/update`, {
        ProductId: productId,
        inStock: !currentStock,
      });
      if (response.data.success) {
        toast.success('Stock status updated');
        fetchList();
      } else {
        toast.error('Failed to update stock status');
      }
    } catch (err) {
      toast.error('Error updating stock status');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <h2>All Products List</h2>
      <div className="list-table">
        <div className="list-table-header">
          <b>Product</b>
          <b>Category</b>
          <b>Selling Price</b>
          <b>In Stock</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-row">
            <div className="product-info">
              <img src={`${url}/images/${item.images[0]}`} alt={item.name} />
              <p>{item.name}</p>
            </div>
            <p>{item.category}</p>
            <p>${item.offerPrice}</p>
            <div className="toggle-container">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={item.inStock}
                  onChange={() => toggleStock(item._id, item.inStock)}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <button className="remove-btn" onClick={() => removeFood(item._id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
