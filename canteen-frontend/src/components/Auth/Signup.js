// src/pages/SignupPage.jsx
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/authContext';

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #0D1117;
  color: #C9D1D9;
`;

const SignupBox = styled.div`
  padding: 20px;
  background-color: #161B22;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  color: #58A6FF;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #30363D;
  border-radius: 4px;
  background-color: #0D1117;
  color: #C9D1D9;

  &:focus {
    box-shadow: 0 0 10px #58A6FF;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #58A6FF;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #79C0FF;
  }
`;

const StyledLink = styled(Link)`
  color: #58A6FF;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

const SignupPage = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("response data : ", response);

      if (response.ok) {
        const responseData = await response.json();
        alert("Registration successful");
        login(responseData.token);
        setFormData({ username: "", email: "", phone: "", password: "" });
        navigate('/', { state: { message: 'Signup successful' } });
      } else {
        const errorData = await response.json();
        console.log("error inside response ", errorData);
        alert(errorData.msg);
        setError(errorData);
      }
    } catch (error) {
      console.error("Error", error);
      setError({ message: "Network error or server not responding" });
    }
  };

  return (
    <SignupContainer>
      <SignupBox>
        <Title>Signup</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit">Signup</Button>
        </form>
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
        <p>Already have an account? <StyledLink to="/login">Login</StyledLink></p>
      </SignupBox>
    </SignupContainer>
  );
};

export default SignupPage;
