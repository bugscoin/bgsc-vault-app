import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 24px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #1a1a2e;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #333;
  }
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
`;

const Step = styled.div`
  width: 40px;
  height: 4px;
  background: ${props => props.active ? '#667eea' : '#e0e0e0'};
  border-radius: 2px;
  transition: background 0.3s;
`;

const InputGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 16px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DepositStepModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDeposit = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return;
    }

    setIsProcessing(true);

    try {
      // Deposit transaction logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep(2);

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Deposit error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>Deposit BGSC</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <StepIndicator>
          <Step active={step >= 1} />
          <Step active={step >= 2} />
          <Step active={step >= 3} />
        </StepIndicator>

        {step === 1 && (
          <>
            <InputGroup>
              <Label>Amount to Deposit</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isProcessing}
              />
            </InputGroup>

            <Button onClick={handleDeposit} disabled={isProcessing || !amount}>
              {isProcessing ? 'Processing...' : 'Deposit'}
            </Button>
          </>
        )}

        {step === 2 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
            <div style={{ fontSize: '20px', fontWeight: 600, color: '#667eea' }}>
              Deposit Successful!
            </div>
            <div style={{ color: '#666', marginTop: '8px' }}>
              {amount} BGSC deposited
            </div>
          </div>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default DepositStepModal;
