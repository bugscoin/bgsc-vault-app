# BGSC Vault App

Production-grade DeFi staking vault interface for BGSC token on BNB Chain. Features include staking, unstaking, reward claiming, and real-time vault analytics.

## Technical Overview

React-based Web3 application utilizing Wagmi/Viem for blockchain interactions. Implements advanced patterns including optimistic updates, transaction queueing, and automatic retry logic for failed transactions.

### Stack
- **React 18.2** - Concurrent rendering with Suspense boundaries
- **Wagmi 2.15 + Viem 2.29** - Type-safe Ethereum interactions
- **RainbowKit 2.2** - Multi-wallet support (MetaMask, WalletConnect, Coinbase)
- **Ethers.js 6.14** - Smart contract ABI encoding/decoding
- **Styled Components 6.1** - CSS-in-JS with theme support
- **React Hot Toast** - Non-blocking toast notifications

### Smart Contract Integration

Interfaces with `BugsDepositVault` contract on BNB Chain:
- Deposit BGSC tokens
- Withdraw with time-lock validation
- Claim accumulated rewards
- Query vault state (TVL, APY, user balance)

Contract address configured per network in environment variables.

## Architecture

```
src/
├── components/           # UI components
│   ├── DepositStepModal.jsx
│   ├── HeaderLanguageToggle.jsx
│   └── WalletDisconnectedAlert.jsx
├── contexts/            # React Context providers
│   ├── LanguageContext.js
│   └── VaultDataContext.js
├── hooks.js             # Custom React hooks
├── utils/               # Helper functions
└── App.js              # Main application
```

### Key Features

**Multi-step Deposit Flow**
- Amount input validation
- Token approval (if needed)
- Deposit transaction
- Success confirmation

**Real-time Vault Data**
- Polling interval: 30s
- WebSocket fallback for instant updates
- Optimistic UI updates during transactions

**Error Handling**
- Automatic RPC failover
- Transaction retry with exponential backoff
- User-friendly error messages

## Environment Setup

Required environment variables:

```env
REACT_APP_VAULT_ADDRESS=0x...
REACT_APP_BGSC_TOKEN_ADDRESS=0x...
REACT_APP_WBNB_ADDRESS=0x...
REACT_APP_VAULT_KEEPER_ADDRESS=0x...
```

Optional:
```env
REACT_APP_ALCHEMY_KEY=...
REACT_APP_INFURA_KEY=...
```

## Development

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm start
```

Runs on `http://localhost:3000`

### Build Configuration

Production builds use CRACO for custom webpack configuration:
- Code obfuscation via `webpack-obfuscator`
- Console statement removal
- Minification with Terser
- Source maps disabled for security

Build for production:
```bash
npm run build
```

Linux/macOS build:
```bash
npm run build:linux
```

## Testing

Run test suite:
```bash
npm test
```

Tests use React Testing Library with wagmi test utilities.

## Network Support

- BNB Chain Mainnet (chainId: 56)
- BNB Chain Testnet (chainId: 97)

Auto-switches to correct network if user is on wrong chain.

## Performance Optimizations

- Component-level code splitting
- Lazy loading for modals and heavy components
- Memoization of expensive computations
- Virtual scrolling for transaction history
- Debounced input validation

## Security

- All user inputs sanitized
- BigNumber handling to prevent overflow
- Transaction simulation before broadcast
- Slippage protection on swaps
- Rate limiting on API calls

## Browser Compatibility

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Brave
- Edge (Chromium-based)

Requires Web3 provider (MetaMask, WalletConnect, etc.)
