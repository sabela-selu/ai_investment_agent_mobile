## 📈 AI Investment Agent Mobile App

A React Native Expo mobile application that helps you make informed investment decisions by comparing the performance of two stocks using GPT-4 and Yahoo Finance data.

### Features
- Compare the performance of two stocks
- Get real-time stock prices and market data
- Access comprehensive company information
- View analyst recommendations
- Beautiful native mobile interface

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- OpenAI API Key

### Getting Started

1. Clone the repository and install dependencies:
```bash
git clone https://github.com/sabela-selu/ai_investment_agent_mobile.git
cd ai_investment_agent

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

2. Set up your OpenAI API Key:
- Sign up for an [OpenAI account](https://platform.openai.com/) and obtain your API key
- You'll enter this key in the app when comparing stocks

3. Start the backend server:
```bash
cd server
npm start
```

4. Start the Expo app:
```bash
# In a new terminal, from the project root
npm start
```

5. Run on your device:
- Install the Expo Go app on your iOS or Android device
- Scan the QR code from the terminal with your camera (iOS) or Expo Go app (Android)
- Or press 'i' for iOS simulator or 'a' for Android emulator

### How it Works

1. The app provides a clean, native mobile interface where you can:
   - Enter your OpenAI API key
   - Input two stock symbols to compare
   - View the detailed analysis

2. Behind the scenes, the app:
   - Fetches real-time stock data from Yahoo Finance
   - Retrieves company information and analyst recommendations
   - Uses GPT-4 to generate comprehensive analysis
   - Presents the results in a mobile-friendly format

3. The analysis includes:
   - Current stock prices and performance metrics
   - Company profiles and business descriptions
   - Market trends and analyst recommendations
   - AI-generated insights and comparisons

### Tech Stack
- Frontend: React Native with Expo
- UI Components: React Native Paper
- Backend: Node.js with Express
- APIs: OpenAI GPT-4, Yahoo Finance
- State Management: React Hooks
- Data Fetching: Axios

### Note
Make sure to keep your OpenAI API key secure and never commit it to version control.
