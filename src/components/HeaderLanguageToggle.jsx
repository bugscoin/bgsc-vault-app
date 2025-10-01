import React, { useContext } from 'react';
import styled from 'styled-components';
import { LanguageContext } from '../contexts/LanguageContext';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  margin-bottom: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const LanguageToggle = styled.div`
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px;
  border-radius: 12px;
`;

const LanguageButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  color: ${props => props.active ? '#667eea' : 'white'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const HeaderLanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <Header>
      <Logo>
        <img src="/logo.png" alt="BGSC" style={{ height: '32px' }} />
        BGSC Vault
      </Logo>
      <LanguageToggle>
        <LanguageButton
          active={language === 'en'}
          onClick={() => setLanguage('en')}
        >
          EN
        </LanguageButton>
        <LanguageButton
          active={language === 'ko'}
          onClick={() => setLanguage('ko')}
        >
          한국어
        </LanguageButton>
      </LanguageToggle>
    </Header>
  );
};

export default HeaderLanguageToggle;
