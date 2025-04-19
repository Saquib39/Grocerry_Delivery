import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';

const Add = ({ url }) => {
  const [images, setImages] = useState([]); // Store multiple images
  const [data, setData] = useState({
    name: '',
    description: '',
    originalPrice: '',
    offerPrice: '',
    category: 'Vegetables'
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (e) => {
    const files = e.target.files;
    if (files.length + images.length <= 4) { // Ensure no more than 4 images
      setImages([...images, ...Array.from(files)]);
    } else {
      toast.error('You can upload up to 4 images only');
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('originalPrice', Number(data.originalPrice));
    formData.append('offerPrice', Number(data.offerPrice));
    formData.append('category', data.category);

    images.forEach((image, index) => {
      formData.append('images', image); // Append each image to the formData
    });

    try {
      const res = await axios.post(`${url}/api/product/add`, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        setData({
          name: '',
          description: '',
          originalPrice: '',
          offerPrice: '',
          category: 'Vegetables'
        });
        setImages([]); // Reset images after successful upload
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Images (Max 4)</p>
          <label htmlFor="images">
            <img src={images.length > 0 ? URL.createObjectURL(images[0]) : assets.upload_area} alt="" />
          </label>
          <input onChange={onImageChange} type="file" id="images" hidden multiple name="images" required />
          <p>{images.length} image(s) selected</p>
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows={6} placeholder="Write content here"></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Vegetables">Vegetables</option>
              <option value="Dairy">Dairy</option>
              <option value="Drinks">Drinks</option>
              <option value="Instant">Instant</option>
              <option value="Fruits">Fruits</option>
              <option value="Bakery">Bakery</option>
              <option value="Grains">Grains</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Original Price</p>
            <input onChange={onChangeHandler} value={data.originalPrice} type="Number" name="originalPrice" />
          </div>
          <div className="add-price flex-col">
            <p>Offer Price</p>
            <input onChange={onChangeHandler} value={data.offerPrice} type="Number" name="offerPrice" />
          </div>
        </div>
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  );
};

export default Add;
