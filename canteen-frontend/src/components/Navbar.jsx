import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../store/authContext';
import { FaHome, FaStore, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
const gradientSkyBlue = 'linear-gradient(145deg, #4facfe, #00f2fe)';

const textColor = '#ffffff';
const Nav = styled.nav`
  background: #333;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 0 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

const Logo = styled.h1`
  font-size: 1.8em;
  margin: 0;
  color: ${textColor};
  color: ${textColor}; 
  text-transform: uppercase;
`;

const UserGreeting = styled.span`
  margin-right: 10px;
  font-size: 1em;
  color: #f5f5f5;
`;

const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`;

const Navbar = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);

  return (
    <Nav>
      <Logo>Canteen Wallah</Logo>
      <NavLinksContainer>
        <NavLink to="/">
          <FaHome />
          Home
        </NavLink>
        <NavLink to="/order">
          <FaStore />
          order
        </NavLink>
        <NavLink to="/shop">
          <FaStore />
          Shop
        </NavLink>
        {isLoggedIn ? (
          <>
           
            <NavLink to="/" onClick={logout}>
              <FaSignOutAlt />
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">
              <FaSignInAlt />
              Login
            </NavLink>
            <NavLink to="/signup">
              <FaUserPlus />
              Signup
            </NavLink>
          </>
        )}
      </NavLinksContainer>
    </Nav>
  );
};

export default Navbar;
