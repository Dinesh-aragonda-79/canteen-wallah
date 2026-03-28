// src/components/Shop/ShopList.js
import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const FoodItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #fff;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const ItemInfo = styled.div`
  margin-bottom: 5px;
  font-size: 14px;
  text-align: center;
`;

const ItemActions = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const Button = styled.button`
  background: ${(props) => (props.delete ? '#dc3545' : '#007bff')};
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: ${(props) => (props.delete ? '#c82333' : '#0056b3')};
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const FoodImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ShopList = ({ foodItems, deleteFoodItem, editFoodItem }) => {
  return (
    <PageContainer>
      <ListContainer>
        {foodItems.map((item, index) => (
          <FoodItem key={index}>
            <ItemHeader>
              <h3>{item.shopName}</h3>
              <ItemActions>
                <Button onClick={() => editFoodItem(index)}>Edit</Button>
                <Button delete onClick={() => deleteFoodItem(index)}>Delete</Button>
              </ItemActions>
            </ItemHeader>
            <ImageContainer>
              <FoodImage src={item.image} alt={item.foodItem} />
            </ImageContainer>
            <ItemInfo>{item.foodItem}</ItemInfo>
            <ItemInfo>Price: {item.price}</ItemInfo>
            <ItemInfo>Contact: {item.contact}</ItemInfo>
          </FoodItem>
        ))}
      </ListContainer>
    </PageContainer>
  );
};

export default ShopList;
