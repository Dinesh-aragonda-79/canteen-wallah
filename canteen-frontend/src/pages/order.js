import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import axios from 'axios';
import { FaSearch, FaPhoneAlt, FaRupeeSign } from 'react-icons/fa';

import c_fried from './c_fried.jpeg';
import chow from './chow.jpg';
import rolls from './rolls.jpg';
import e_fried from './e_fried.png';
import paratha from './paratha.jpeg';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    background-color: #121212;
    color: #E0E0E0;
  }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #121212;
  min-height: 100vh;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: none;
  border-radius: 25px;
  width: 100%;
  max-width: 400px;
  background: #1E1E1E;
  color: #E0E0E0;
  font-size: 16px;
`;

const SearchIcon = styled(FaSearch)`
  margin-right: 10px;
  color: #87CEEB;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  color: #E0E0E0;
  outline: none;

  &:focus {
    box-shadow: 0 0 10px #87CEEB;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(10px);
  }
  to {
    transform: translateY(0);
  }
`;

const FoodSelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  width: 100%;
  animation: ${fadeIn} 1s ease-in-out;
`;

const FoodSelectionTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  color: #87CEEB;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  animation: ${slideIn} 1s ease-in-out;
`;

const FoodItemList = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 10px;
  width: 100%;
  justify-content: center;
`;

const FoodSelectionItem = styled.div`
  flex: 0 0 auto;
  text-align: center;
  width: 150px;
  padding: 10px;
  border-radius: 10px;
  background: #1E1E1E;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  }
`;

const FoodItemImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const FoodItemName = styled.p`
  font-size: 16px;
  color: #E0E0E0;
`;

const ShopContainer = styled.div`
  margin-bottom: 40px;
  width: 100%;
  max-width: 1200px;
`;

const ShopTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  color: #87CEEB;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  background: linear-gradient(90deg, #87CEEB 0%, #00BFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 10px;
  border-radius: 10px;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;

const FoodItemCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #1E1E1E;
  color: #E0E0E0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.7);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
`;

const ItemTitle = styled.h3`
  margin: 5px 0;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(90deg, #87CEEB 0%, #00BFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
`;

const ItemInfo = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Order = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('https://canteen-wallah-2.onrender.com/api/foodItems/all');
      setFoodItems(response.data);
    } catch (error) {
      console.error('Failed to fetch food items:', error);
    }
  };

  const filteredItems = foodItems.filter(
    (item) =>
      item.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.foodItem.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.shopName]) {
      acc[item.shopName] = [];
    }
    acc[item.shopName].push(item);
    return acc;
  }, {});

  const sampleFoodItems = [
    { name: 'Pizzas', image: c_fried },
    { name: 'Biryani', image: e_fried },
    { name: 'Rolls', image: rolls },
    { name: 'Cakes', image: chow },
    { name: 'Paratha', image: paratha },
  ];

  return (
    <>
      <GlobalStyle />
      <HomeContainer>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search for shops or food items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>
        <FoodSelectionContainer>
          <FoodSelectionTitle>What's on your mind?</FoodSelectionTitle>
          <FoodItemList>
            {sampleFoodItems.map((item, index) => (
              <FoodSelectionItem key={index}>
                <FoodItemImage src={item.image} alt={item.name} />
                <FoodItemName>{item.name}</FoodItemName>
              </FoodSelectionItem>
            ))}
          </FoodItemList>
        </FoodSelectionContainer>
        {Object.keys(groupedItems).map((shopName) => (
          <ShopContainer key={shopName}>
            <ShopTitle>{shopName}</ShopTitle>
            <ListContainer>
              {groupedItems[shopName].map((item) => (
                <FoodItemCard key={item._id}>
                  <ItemHeader>
                    <ItemImage src={item.image} alt={item.foodItem} />
                    <ItemTitle>{item.foodItem}</ItemTitle>
                    <ItemInfo>
                      <FaRupeeSign />
                      {item.price}
                    </ItemInfo>
                    <ItemInfo>
                      <FaPhoneAlt />
                      {item.contact}
                    </ItemInfo>
                  </ItemHeader>
                </FoodItemCard>
              ))}
            </ListContainer>
          </ShopContainer>
        ))}
      </HomeContainer>
    </>
  );
};

export default Order;
