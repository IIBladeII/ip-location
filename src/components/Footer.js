import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

const FooterContainer = styled(motion.footer)`
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(15px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #f0f2f5;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(135deg, #4a90e2, #17a2b8, #20c997);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2.5rem;
  }
`;

const FooterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h3`
  color: #4a90e2;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 2px;
    background: linear-gradient(135deg, #4a90e2, #17a2b8);
    border-radius: 1px;

    @media (max-width: 768px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const Description = styled.p`
  line-height: 1.7;
  opacity: 0.9;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: rgba(74, 144, 226, 0.1);
  border: 1px solid rgba(74, 144, 226, 0.3);
  border-radius: 50%;
  color: #4a90e2;
  font-size: 1.2rem;
  text-decoration: none;
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
    background: linear-gradient(135deg, #4a90e2, #17a2b8);
    transition: left 0.3s ease;
    z-index: -1;
  }

  &:hover {
    color: white;
    border-color: #4a90e2;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(74, 144, 226, 0.3);

    &::before {
      left: 0;
    }
  }
`;

const QuickLinks = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const QuickLink = styled(motion.li)`
  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    border-radius: 5px;
    position: relative;

    &::before {
      content: '→';
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.3s ease;
    }

    &:hover {
      color: #4a90e2;
      padding-left: 1rem;

      &::before {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @media (max-width: 768px) {
      justify-content: center;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(74, 144, 226, 0.1);
    border-color: rgba(74, 144, 226, 0.3);
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    justify-content: center;
    transform: none;

    &:hover {
      transform: none;
    }
  }

  .icon {
    color: #4a90e2;
    font-size: 1.1rem;
    min-width: 20px;
  }

  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #4a90e2;
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
`;

const Copyright = styled(motion.p)`
  opacity: 0.7;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  .heart {
    color: #e74c3c;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;

const TechStack = styled.div`
  margin-top: 1rem;
  font-size: 0.8rem;
  opacity: 0.6;
  
  span {
    color: #4a90e2;
    font-weight: 600;
  }
`;

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <FooterContainer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <FooterContent>
        <FooterSection variants={itemVariants}>
          <SectionTitle>Pedro Riccio</SectionTitle>
          <Description>
            IP Location Finder - Uma ferramenta moderna e elegante para descobrir a localização 
            geográfica de qualquer endereço IP ou domínio no mundo.
          </Description>
          <SocialLinks>
            <SocialLink
              href="https://github.com/IIBladeII"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub />
            </SocialLink>
            <SocialLink
              href="https://www.linkedin.com/in/pedro-riccio"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaLinkedin />
            </SocialLink>
            <SocialLink
              href="mailto:pedroworkdev@gmail.com"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEnvelope />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection variants={itemVariants}>
          <SectionTitle>Links Úteis</SectionTitle>
          <QuickLinks>
            <QuickLink variants={itemVariants}>
              <a href="https://pedroriccio.vercel.app/" target="_blank" rel="noopener noreferrer">
                Portfolio
              </a>
            </QuickLink>
            <QuickLink variants={itemVariants}>
              <a href="https://github.com/Pedro-Dev/ip-location-finder" target="_blank" rel="noopener noreferrer">
                Código Fonte
              </a>
            </QuickLink>
            <QuickLink variants={itemVariants}>
              <a href="https://ipapi.co/" target="_blank" rel="noopener noreferrer">
                API ipapi.co
              </a>
            </QuickLink>
            <QuickLink variants={itemVariants}>
              <a href="https://leafletjs.com/" target="_blank" rel="noopener noreferrer">
                Leaflet Maps
              </a>
            </QuickLink>
          </QuickLinks>
        </FooterSection>

        <FooterSection variants={itemVariants}>
          <SectionTitle>Informações de Contato</SectionTitle>
          <ContactInfo>
            <ContactItem variants={itemVariants}>
              <FaEnvelope className="icon" />
              <a href="mailto:pedroworkdev@gmail.com">
                pedroworkdev@gmail.com
              </a>
            </ContactItem>
            <ContactItem variants={itemVariants}>
              <FaMapMarkerAlt className="icon" />
              <span>Bahia, Brasil</span>
            </ContactItem>
          </ContactInfo>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <Copyright variants={itemVariants}>
          <span>&copy; 2024 Pedro Riccio. Todos os direitos reservados.</span>
          <span>Feito com</span>
          <FaHeart className="heart" />
          <span>e muito café ☕</span>
        </Copyright>
        <TechStack>
          Desenvolvido com <span>React</span>, <span>Framer Motion</span>, <span>Styled Components</span> e <span>Leaflet</span>
        </TechStack>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;