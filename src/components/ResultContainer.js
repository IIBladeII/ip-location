import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaGlobe, FaMapMarkerAlt, FaBuilding, FaFlag, FaCity, FaClock, FaWifi, FaEnvelope } from 'react-icons/fa';
import MapComponent from './MapComponent';
import { formatLocationData } from '../services/ipService';

const Container = styled(motion.div)`
  margin-top: 2rem;
`;

const ResultCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(135deg, #4a90e2, #17a2b8, #20c997);
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const InfoItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(74, 144, 226, 0.3);
    box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(74, 144, 226, 0.1), transparent);
    transition: left 0.6s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const InfoIcon = styled.div`
  font-size: 2rem;
  color: #4a90e2;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background: rgba(74, 144, 226, 0.1);
  border-radius: 50%;
  margin: 0 auto 1rem;
  transition: all 0.3s ease;

  ${InfoItem}:hover & {
    transform: scale(1.1);
    background: rgba(74, 144, 226, 0.2);
  }
`;

const InfoTitle = styled.h3`
  color: #4a90e2;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
`;

const InfoValue = styled.p`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  word-break: break-all;
  line-height: 1.4;
`;

const MapContainer = styled(motion.div)`
  margin-top: 2rem;
  border-radius: 15px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const LocationBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${props => props.userLocation 
    ? 'linear-gradient(135deg, #28a745, #20c997)' 
    : 'linear-gradient(135deg, #4a90e2, #17a2b8)'
  };
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const DomainInfo = styled(motion.div)`
  background: rgba(23, 162, 184, 0.1);
  border: 1px solid rgba(23, 162, 184, 0.3);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const DomainText = styled.p`
  color: #17a2b8;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ResolvedIP = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

const ResultContainer = ({ data }) => {
  const formattedData = formatLocationData(data);
  
  const infoItems = [
    { 
      icon: FaGlobe, 
      title: 'Endereço IP', 
      value: formattedData.ip,
      delay: 0.1 
    },
    { 
      icon: FaMapMarkerAlt, 
      title: 'Coordenadas', 
      value: formattedData.location,
      delay: 0.2 
    },
    { 
      icon: FaBuilding, 
      title: 'Provedor (ISP)', 
      value: formattedData.isp,
      delay: 0.3 
    },
    { 
      icon: FaFlag, 
      title: 'País', 
      value: formattedData.country,
      delay: 0.4 
    },
    { 
      icon: FaCity, 
      title: 'Cidade', 
      value: formattedData.city,
      delay: 0.5 
    },
    { 
      icon: FaClock, 
      title: 'Fuso Horário', 
      value: formattedData.timezone,
      delay: 0.6 
    }
  ];

  return (
    <Container>
      <ResultCard
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LocationBadge
          userLocation={formattedData.userLocation}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {formattedData.userLocation ? (
            <>
              <FaMapMarkerAlt />
              Sua Localização Atual
            </>
          ) : (
            <>
              <FaWifi />
              Localização por IP
            </>
          )}
        </LocationBadge>

        {formattedData.domain && (
          <DomainInfo
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <DomainText>
              <FaEnvelope style={{ marginRight: '0.5rem' }} />
              Domínio: {formattedData.domain}
            </DomainText>
            <ResolvedIP>
              IP Resolvido: {formattedData.resolvedIP}
            </ResolvedIP>
          </DomainInfo>
        )}

        <InfoGrid>
          {infoItems.map((item, index) => (
            <InfoItem
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: item.delay,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.02 }}
            >
              <InfoIcon>
                <item.icon />
              </InfoIcon>
              <InfoTitle>{item.title}</InfoTitle>
              <InfoValue>{item.value}</InfoValue>
            </InfoItem>
          ))}
        </InfoGrid>

        <MapContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <MapComponent 
            latitude={formattedData.latitude}
            longitude={formattedData.longitude}
            city={formattedData.city}
            country={formattedData.country}
            ip={formattedData.ip}
            userLocation={formattedData.userLocation}
            accuracy={formattedData.accuracy}
          />
        </MapContainer>
      </ResultCard>
    </Container>
  );
};

export default ResultContainer;