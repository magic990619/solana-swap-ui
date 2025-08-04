# 🚀 Solana Token Swap UI

A modern React Native application built with Expo for swapping Solana tokens. This is a UI-focused implementation featuring smooth animations, drag-and-drop interactions, and clean TypeScript architecture.

## ✨ Features

- 🔄 **Intuitive Token Swap Interface** - Clean swap card with real-time conversion calculations
- 🔍 **Smart Token Selection** - Modal with token exclusion logic
- ⭐ **Interactive Favorites List** - Drag-and-drop reorderable token list with smooth animations
- 🎨 **Polished Animations** - Fade-in transitions and subtle micro-interactions
- 📱 **Responsive Design** - Optimized for both iOS and Android devices
- 🛡️ **Type Safety** - Full TypeScript implementation with comprehensive type definitions
- ✅ **Input Validation** - Smart numeric input

## 📱 Quick Start

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Expo CLI](https://docs.expo.dev/get-started/installation/): `npm install -g @expo/cli`
- [Expo Go](https://expo.dev/client) app on your mobile device

### Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/magic990619/solana-swap-ui.git
cd solana-swap-ui

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

### Running the App

**📱 On Your Phone**
1. Open Expo Go app on your device
2. Scan the QR code from your terminal
3. App will load instantly

**💻 On Simulators**
```bash
# Android Emulator
npm run android

# iOS Simulator (macOS only)
npm run ios

# Web Browser
npm run web
```

## 🏗️ Project Architecture

```
src/
├── components/                 # Reusable UI components
│   ├── SwapCard/              # 🔄 Main swap interface
│   ├── TokenInput/            # 📝 Token input with selector
│   ├── TokenSelectorModal/    # 🔍 Token selection modal
│   └── FavoriteTokensList/    # ⭐ Drag-and-drop favorites
├── constants/                 # 📊 Mock data & app constants
├── screens/                   # 📱 Screen components
├── types/                     # 🏷️ TypeScript definitions
└── utils/                     # 🛠️ Utility functions
```

## 📋 Available Scripts

```bash
# Development
npm start              # Start Expo development server
npm run ios            # Run on iOS simulator
npm run android        # Run on Android emulator
npm run web            # Run in web browser

# Code Quality
npm run lint           # ESLint code analysis
npm run format         # Prettier code formatting

# Utilities
npx expo start --clear # Clear Metro bundler cache
```

## 🔧 Customization Guide

### Adding New Tokens

```typescript
// src/constants/index.ts
export const MOCK_TOKENS: Token[] = [
  {
    id: 'your-token',
    symbol: 'YTK',
    name: 'Your Token',
    price: 2.50,
    logo: 'https://example.com/token-logo.png',
  },
  // ... existing tokens
];
```

### Customizing Animations

```typescript
// Adjust animation timing in components
const animationConfig = {
  duration: 800,        // Fade-in duration
  buttonFeedback: 100,  // Button press duration
  scaleValue: 0.98,     // Button scale factor
};
```

## 📊 Mock Data Structure

The app uses comprehensive mock data for demonstration:

```typescript
interface Token {
  id: string;           // Unique identifier
  symbol: string;       // Token symbol (e.g., "SOL")
  name: string;         // Full name (e.g., "Solana")
  price: number;        // USD price
  logo: string;         // Logo URL
}
```

## 📄 License

This project is created for demonstration purposes as part of a React Native technical assessment.


---

<div align="center">

**Built with ❤️ using React Native & Expo by 0xMagic**

[⭐ Star this repo](https://github.com/magic990619/solana-swap-ui) if you found it helpful!

</div>