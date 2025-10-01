import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LanguageContext } from './contexts/LanguageContext';
import { VaultDataContext } from './contexts/VaultDataContext';
import { useVaultOperations } from './hooks';
import HeaderLanguageToggle from './components/HeaderLanguageToggle';
import DepositStepModal from './components/DepositStepModal';
import WalletDisconnectedAlert from './components/WalletDisconnectedAlert';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const VaultCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
`;

const StatLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
`;

const Button = styled.button`
  flex: 1;
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  ${props => props.primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }
  ` : `
    background: white;
    color: #667eea;
    border: 2px solid #667eea;

    &:hover {
      background: #f7f7ff;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function App() {
  const [language, setLanguage] = useState('en');
  const [vaultData, setVaultData] = useState({
    totalDeposited: '0',
    userBalance: '0',
    apy: '0',
    nextRewardTime: null
  });
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const { deposit, withdraw, claimRewards } = useVaultOperations();

  useEffect(() => {
    // Check wallet connection
    const checkConnection = async () => {
      // Wallet connection check logic
      setIsWalletConnected(false);
    };

    checkConnection();
  }, []);

  const handleDeposit = async () => {
    setIsDepositModalOpen(true);
  };

  const handleWithdraw = async () => {
    if (!isWalletConnected) return;
    await withdraw();
  };

  const handleClaim = async () => {
    if (!isWalletConnected) return;
    await claimRewards();
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <VaultDataContext.Provider value={{ vaultData, setVaultData }}>
        <AppContainer>
          <HeaderLanguageToggle />

          <MainContent>
            <VaultCard>
              <h1 style={{ fontSize: '36px', marginBottom: '8px', color: '#1a1a2e' }}>
                BGSC Vault
              </h1>
              <p style={{ color: '#666', marginBottom: '24px' }}>
                Stake your BGSC tokens and earn rewards
              </p>

              <StatsGrid>
                <StatCard>
                  <StatLabel>Total Value Locked</StatLabel>
                  <StatValue>${vaultData.totalDeposited}</StatValue>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>BGSC</div>
                </StatCard>

                <StatCard>
                  <StatLabel>Your Balance</StatLabel>
                  <StatValue>{vaultData.userBalance}</StatValue>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>BGSC</div>
                </StatCard>

                <StatCard>
                  <StatLabel>Current APY</StatLabel>
                  <StatValue>{vaultData.apy}%</StatValue>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>Annual Yield</div>
                </StatCard>
              </StatsGrid>

              <ActionButtons>
                <Button primary onClick={handleDeposit} disabled={!isWalletConnected}>
                  Deposit
                </Button>
                <Button onClick={handleWithdraw} disabled={!isWalletConnected}>
                  Withdraw
                </Button>
                <Button onClick={handleClaim} disabled={!isWalletConnected}>
                  Claim Rewards
                </Button>
              </ActionButtons>
            </VaultCard>
          </MainContent>

          {isDepositModalOpen && (
            <DepositStepModal onClose={() => setIsDepositModalOpen(false)} />
          )}

          {!isWalletConnected && <WalletDisconnectedAlert />}
        </AppContainer>
      </VaultDataContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
