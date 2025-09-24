import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import SearchContainer from './components/SearchContainer';
import ResultContainer from './components/ResultContainer';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { searchIP, getMyLocation } from './services/ipService';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a1929 0%, #1a2a3d 100%);
  background-attachment: fixed;
  position: relative;
  overflow-x: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 30%, rgba(74, 144, 226, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(23, 162, 184, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const MainContent = styled(motion.main)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 1rem 2rem;
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 200px);
`;

const FloatingParticles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(74, 144, 226, 0.3);
  border-radius: 50%;
`;

function App() {
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Função para buscar IP
  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await searchIP(query);
      setIpData(data);
      setShowResult(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar meu IP
  const handleMyIP = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getMyLocation();
      setIpData(data);
      setShowResult(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Buscar localização ao carregar a página
  useEffect(() => {
    handleMyIP();
  }, []);

  // Criar partículas flutuantes
  const particles = Array.from({ length: 20 }, (_, i) => (
    <Particle
      key={i}
      initial={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0
      }}
      animate={{
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  ));

  return (
    <AppContainer>
      <Navbar />
      
      <FloatingParticles>
        {particles}
      </FloatingParticles>
      
      <MainContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <SearchContainer 
          onSearch={handleSearch}
          onMyIP={handleMyIP}
          loading={loading}
          error={error}
        />

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingSpinner />
            </motion.div>
          )}

          {showResult && ipData && !loading && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ResultContainer data={ipData} />
            </motion.div>
          )}
        </AnimatePresence>
      </MainContent>

      <Footer />
    </AppContainer>
  );
}

export default App;