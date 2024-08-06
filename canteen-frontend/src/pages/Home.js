// src/pages/Home.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../store/authContext';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0D1117, #161B22);
  color: #C9D1D9;
  padding: 20px;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
  background: url('/path-to-your-image.jpg') no-repeat center center/cover;
  color: white;
  width: 100%;
`;

const HeroTitle = styled.h1`
  font-size: 4em;
  margin: 0.5em 0;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  animation: fadeIn 1.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5em;
  margin: 0.5em 0 1em;
  color: #e0e0e0;
  max-width: 600px;
  animation: fadeIn 1.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const HeroButton = styled(Link)`
  background: linear-gradient(45deg, #58A6FF, #79C0FF);
  color: #fff;
  padding: 15px 30px;
  text-decoration: none;
  border-radius: 50px;
  margin-top: 20px;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: linear-gradient(45deg, #79C0FF, #58A6FF);
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(88, 166, 255, 0.5);
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  width: 100%;
  background: ${({ bg }) => bg || 'transparent'};
`;

const SectionTitle = styled.h2`
  font-size: 2.5em;
  color: #58A6FF;
  margin-bottom: 20px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  animation: popIn 1s ease-in-out;

  @keyframes popIn {
    0% {
      transform: scale(0.8);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const SectionDescription = styled.p`
  font-size: 1.2em;
  color: #C9D1D9;
  max-width: 800px;
  text-align: center;
  margin-bottom: 30px;
  animation: fadeIn 1.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Button = styled(Link)`
  background: linear-gradient(45deg, #58A6FF, #79C0FF);
  color: #fff;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 20px;
  transition: background 0.3s, transform 0.3s;

  &:hover {
    background: linear-gradient(45deg, #79C0FF, #58A6FF);
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(88, 166, 255, 0.5);
  }
`;

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <HomeContainer>
      <HeroSection>
        <HeroTitle>Welcome to Canteen Wallah</HeroTitle>
        <HeroSubtitle>Order delicious food or start selling your homemade dishes with ease.</HeroSubtitle>
        <HeroButton to="/order">Order Now</HeroButton>
      </HeroSection>
      <Section bg="#1A202C">
        <SectionTitle>Create and Sell Your Food</SectionTitle>
        <SectionDescription>
          "Join our platform to sell your homemade dishes and reach more customers. Sign in to start your culinary business today!"
        </SectionDescription>
        <Button to={isLoggedIn ? "/shop" : "/login"}>
          {isLoggedIn ? "Go to Shop" : "Login to Create Shop"}
        </Button>
      </Section>
    </HomeContainer>
  );
};
export default Home;
