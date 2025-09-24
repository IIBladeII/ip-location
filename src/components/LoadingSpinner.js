import React from 'react';
import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { FaGlobe, FaMapMarkerAlt, FaWifi } from 'react-icons/fa';

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 2rem;
`;

const OuterRing = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 3px solid rgba(74, 144, 226, 0.2);
  border-top: 3px solid #4a90e2;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

const MiddleRing = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  border: 2px solid rgba(23, 162, 184, 0.2);
  border-right: 2px solid #17a2b8;
  border-radius: 50%;
  animation: ${rotate} 1.5s linear infinite reverse;
`;

const InnerRing = styled.div`
  position: absolute;
  top: 30px;
  left: 30px;
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  border: 2px solid rgba(32, 201, 151, 0.2);
  border-bottom: 2px solid #20c997;
  border-radius: 50%;
  animation: ${rotate} 2s linear infinite;
`;

const CenterIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: #4a90e2;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const LoadingText = styled(motion.h3)`
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #4a90e2, #17a2b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LoadingSubtext = styled(motion.p)`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 400px;
`;

const FloatingIcons = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
`;

const FloatingIcon = styled(motion.div)`
  font-size: 1.5rem;
  color: rgba(74, 144, 226, 0.6);
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 1rem;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #4a90e2, #17a2b8, #20c997);
  border-radius: 2px;
`;

const LoadingSpinner = () => {
  const loadingMessages = [
    'Localizando endereço IP...',
    'Obtendo informações de geolocalização...',
    'Carregando dados do servidor...',
    'Preparando o mapa...',
  ];

  const [currentMessage, setCurrentMessage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  return (
    <LoadingContainer
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <SpinnerWrapper>
        <OuterRing />
        <MiddleRing />
        <InnerRing />
        <CenterIcon>
          <FaGlobe />
        </CenterIcon>
      </SpinnerWrapper>

      <LoadingText
        key={currentMessage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        Carregando...
      </LoadingText>

      <LoadingSubtext
        key={`subtext-${currentMessage}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {loadingMessages[currentMessage]}
      </LoadingSubtext>

      <ProgressBar>
        <ProgressFill
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </ProgressBar>

      <FloatingIcons>
        <FloatingIcon delay={0}>
          <FaMapMarkerAlt />
        </FloatingIcon>
        <FloatingIcon delay={0.5}>
          <FaGlobe />
        </FloatingIcon>
        <FloatingIcon delay={1}>
          <FaWifi />
        </FloatingIcon>
      </FloatingIcons>
    </LoadingContainer>
  );
};

export default LoadingSpinner;
