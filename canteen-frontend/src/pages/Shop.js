import React, { useState, useEffect, useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { AuthContext } from '../store/authContext';
import { FaEdit, FaTrashAlt, FaUpload, FaPhone, FaRupeeSign } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    background: #121212;
    color: #ffffff;
  }
`;

const gradientSkyBlue = 'linear-gradient(145deg, #4facfe, #00f2fe)';
const cardBackground = '#1e1e1e';
const textColor = '#ffffff';
const accentColor = gradientSkyBlue;
const accentHoverColor = 'linear-gradient(145deg, #00f2fe, #4facfe)';
const dangerColor = 'linear-gradient(145deg, #ff6b6b, #ff5757)';
const dangerHoverColor = 'linear-gradient(145deg, #e85656, #d74545)';

const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #121212;
  min-height: 100vh;
`;

const FormAndListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
`;

const FormWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  background: ${cardBackground};
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  color: ${textColor};
  background: ${gradientSkyBlue}; 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 12px;
  border: 1px solid #444;
  border-radius: 8px;
  width: 100%;
  background: #333;
  color: ${textColor};
  font-family: 'Poppins', sans-serif;
`;

const Button = styled.button`
  background: ${accentColor};
  color: ${textColor};
  padding: 12px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  transition: background 0.3s, transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: ${accentHoverColor};
    transform: translateY(-2px);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const ImagePreview = styled.img`
  margin-top: 10px;
  max-width: 100%;
  border-radius: 12px;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;

const FoodItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: ${cardBackground};
  color: ${textColor};
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const ItemTitle = styled.h3`
  margin: 5px 0;
  font-size: 24px;
  font-weight: 600;
  background: ${gradientSkyBlue}; // Sky blue gradient color
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ShopTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${textColor};
  background: ${gradientSkyBlue}; // Sky blue gradient color
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  background: ${(props) => (props.delete ? dangerColor : accentColor)};
  color: ${textColor};
  padding: 8px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: ${(props) => (props.delete ? dangerHoverColor : accentHoverColor)};
    transform: translateY(-2px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 16px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333;
`;

const FoodImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  ${FoodItem}:hover & {
    transform: scale(1.05);
  }
`;

const ErrorMessage = styled.div`
  color: ${dangerColor};
  margin-bottom: 10px;
  text-align: center;
`;

const SmallText = styled.small`
  color: ${textColor};
  margin-top: -5px;
  margin-bottom: 10px;
`;

const Shop = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [foodItems, setFoodItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [shopName, setShopName] = useState('');
  const [foodItem, setFoodItem] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');
  const [pic, setPic] = useState("");
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [picLoading, setPicLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchFoodItems();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (editIndex !== null) {
      const item = foodItems[editIndex];
      setShopName(item.shopName);
      setFoodItem(item.foodItem);
      setPrice(item.price);
      setContact(item.contact);
      setImagePreview(item.image);
      setPic(item.image);
    } else {
      resetForm();
    }
  }, [editIndex, foodItems]);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/foodItems', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFoodItems(response.data);
    } catch (error) {
      console.error('Failed to fetch food items:', error);
      setError('Failed to fetch food items. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    postDetails(e.target.files[0]);
  };

  const postDetails = (pics) => {
    if (pics === undefined) {
      setPic(""); // Clear the image if no file is selected
      setImagePreview("");
      return;
    }
    setPicLoading(true);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
     data.append("upload_preset", "mingle");
      data.append("cloud_name", "dinesharagonda");
      fetch("https://api.cloudinary.com/v1_1/dinesharagonda/image/upload",{
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setImagePreview(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      setPicLoading(false);
      setError("Please select an image (jpeg or png)");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shopName || !foodItem || !price || !contact) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    const newItem = { shopName, foodItem, price, contact, image: pic };

    try {
      if (editIndex !== null) {
        const itemId = foodItems[editIndex]._id;
        await axios.put(`http://localhost:5000/api/foodItems/${itemId}`, newItem, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/foodItems', newItem, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
      }

      fetchFoodItems();
      resetForm();
    } catch (error) {
      console.error('Failed to save food item:', error);
      setError('Failed to save food item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    const itemId = foodItems[index]._id;
    try {
      await axios.delete(`http://localhost:5000/api/foodItems/${itemId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchFoodItems();
    } catch (error) {
      console.error('Failed to delete food item:', error);
      setError('Failed to delete food item. Please try again.');
    }
  };

  const resetForm = () => {
    setShopName('');
    setFoodItem('');
    setPrice('');
    setContact('');
    setPic('');
    setImagePreview('');
    setEditIndex(null);
    setError('');
  };

  return (
    <ShopContainer>
      <GlobalStyle />
      <FormAndListContainer>
        <FormWrapper>
          <FormTitle>{editIndex !== null ? 'Edit Food Item' : 'Add Food Item'}</FormTitle>
          <FormContainer>
            <Form onSubmit={handleSubmit}>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Input
                type="text"
                placeholder="Item Name"
                value={foodItem}
                onChange={(e) => setFoodItem(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Canteen Name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <Input type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && <ImagePreview src={imagePreview} alt="Preview" />}
              <Button type="submit" disabled={isLoading || picLoading}>
                {isLoading || picLoading ? 'Saving...' : 'Save'}
                {picLoading && <FaUpload />}
              </Button>
            </Form>
            {editIndex !== null && <Button onClick={resetForm}>Cancel</Button>}
          </FormContainer>
        </FormWrapper>
        <ListContainer>
          {foodItems.map((item, index) => (
            <FoodItem key={index}>
              <ItemHeader>
                <ItemTitle>{item.foodItem}</ItemTitle>
                <ItemActions>
                  <IconButton onClick={() => handleEdit(index)}>
                    <FaEdit />
                  </IconButton>
                  <IconButton delete onClick={() => handleDelete(index)}>
                    <FaTrashAlt />
                  </IconButton>
                </ItemActions>
              </ItemHeader>
              <ImageContainer>
                <FoodImage src={item.image} alt={item.foodItem} />
              </ImageContainer>
          
                <ShopTitle>{item.shopName}</ShopTitle>
         
              <ItemInfo>
                <FaRupeeSign /> {item.price}
              </ItemInfo>
              <ItemInfo>
                <FaPhone /> {item.contact}
              </ItemInfo>
            </FoodItem>
          ))}
        </ListContainer>
      </FormAndListContainer>
    </ShopContainer>
  );
};

export default Shop;
