// src/components/Shop/ShopForm.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

const Button = styled.button`
  background: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #0056b3;
  }
`;

const ImagePreview = styled.img`
  margin-top: 10px;
  max-width: 100%;
  border-radius: 8px;
`;

const ShopForm = ({ addFoodItem, editIndex, foodItems }) => {
  const [shopName, setShopName] = useState('');
  const [foodItem, setFoodItem] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (editIndex !== null) {
      const item = foodItems[editIndex];
      setShopName(item.shopName);
      setFoodItem(item.foodItem);
      setPrice(item.price);
      setContact(item.contact);
      setImagePreview(item.image);
    } else {
      setShopName('');
      setFoodItem('');
      setPrice('');
      setContact('');
      setImagePreview('');
    }
  }, [editIndex, foodItems]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      shopName,
      foodItem,
      price,
      contact,
      image: imagePreview, // Use imagePreview as the image source
    };
    addFoodItem(newItem);
    setShopName('');
    setFoodItem('');
    setPrice('');
    setContact('');
    setImageFile(null);
    setImagePreview('');
  };

  return (
    <FormContainer>
      <FormTitle>{editIndex !== null ? 'Edit Food Item' : 'Add Food Item'}</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Shop Name"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Food Item Name"
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <Input type="file" onChange={handleImageChange} accept="image/*" required />
        {imagePreview && <ImagePreview src={imagePreview} alt="Food Item" />}
        <Button type="submit">{editIndex !== null ? 'Update Item' : 'Add Item'}</Button>
      </Form>
    </FormContainer>
  );
};

export default ShopForm;
