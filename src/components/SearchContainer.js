import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaSearch, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';

const Container = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
`;

const Title = styled(motion.h1)`
  color: #fff;
  margin-bottom: 2rem;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  background: linear-gradient(135deg, #4a90e2, #17a2b8, #20c997);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(74, 144, 226, 0.3);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(135deg, #4a90e2, #17a2b8);
    border-radius: 2px;
  }
`;

const Subtitle = styled(motion.p)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const InputGroup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 700px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: stretch;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 1.2rem 1.5rem;
  padding-left: 3rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  color: #fff;
  transition: all 0.3s ease;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: #4a90e2;
    box-shadow: 0 0 20px rgba(74, 144, 226, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Button = styled(motion.button)`
  padding: 1.2rem 2rem;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 120px;

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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const SearchButton = styled(Button)`
  background: linear-gradient(135deg, #4a90e2, #2980b9);
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(74, 144, 226, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MyIPButton = styled(Button)`
  background: linear-gradient(135deg, #28a745, #20c997);
  color: white;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ErrorMessage = styled(motion.div)`
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.3);
  color: #ff6b6b;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  backdrop-filter: blur(10px);
`;

const SearchContainer = ({ onSearch, onMyIP, loading, error }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query.trim());
    }
  };

  const handleMyIP = () => {
    if (!loading) {
      setQuery('');
      onMyIP();
    }
  };

  return (
    <Container
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Title
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        IP Location Finder
      </Title>

      <Subtitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Descubra a localização de qualquer IP ou domínio no mundo
      </Subtitle>

      <form onSubmit={handleSubmit}>
        <InputGroup
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <InputWrapper>
            <InputIcon>
              <FaGlobe />
            </InputIcon>
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite um IP ou domínio (ex: google.com, 8.8.8.8)"
              disabled={loading}
            />
          </InputWrapper>

          <ButtonGroup>
            <SearchButton
              type="submit"
              disabled={loading || !query.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaSearch />
              {loading ? 'Buscando...' : 'Buscar'}
            </SearchButton>

            <MyIPButton
              type="button"
              onClick={handleMyIP}
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaMapMarkerAlt />
              Meu IP
            </MyIPButton>
          </ButtonGroup>
        </InputGroup>
      </form>

      {error && (
        <ErrorMessage
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </ErrorMessage>
      )}
    </Container>
  );
};

export default SearchContainer;