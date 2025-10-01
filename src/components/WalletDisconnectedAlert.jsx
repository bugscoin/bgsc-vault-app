import React from 'react';
import styled from 'styled-components';

const AlertContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: rgba(255, 59, 48, 0.95);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(255, 59, 48, 0.3);
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 400px;
  z-index: 999;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Icon = styled.div`
  font-size: 24px;
`;

const Message = styled.div`
  flex: 1;

  strong {
    display: block;
    margin-bottom: 4px;
    font-size: 16px;
  }

  span {
    font-size: 14px;
    opacity: 0.9;
  }
`;

const ConnectButton = styled.button`
  background: white;
  color: #ff3b30;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const WalletDisconnectedAlert = () => {
  const handleConnect = () => {
    // Wallet connection logic
    console.log('Connecting wallet...');
  };

  return (
    <AlertContainer>
      <Icon>⚠️</Icon>
      <Message>
        <strong>Wallet Not Connected</strong>
        <span>Connect your wallet to interact with the vault</span>
      </Message>
      <ConnectButton onClick={handleConnect}>
        Connect
      </ConnectButton>
    </AlertContainer>
  );
};

export default WalletDisconnectedAlert;
