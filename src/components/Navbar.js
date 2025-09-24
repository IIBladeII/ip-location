import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 25, 41, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 0;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  
  .icon {
    color: #4a90e2;
    font-size: 1.4rem;
  }
`;

const BackButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #4a90e2, #2980b9);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(74, 144, 226, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  .icon {
    font-size: 1rem;
  }
`;

const Navbar = () => {
  return (
    <NavContainer
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <NavContent>
        <Logo
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FaHome className="icon" />
          IP Location Finder
        </Logo>

        <BackButton
          href="https://pedroriccio.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft className="icon" />
          Voltar para Portfolio
        </BackButton>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;