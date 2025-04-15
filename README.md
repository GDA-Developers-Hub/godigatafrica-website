# Chat Backend with AI and Human Agent Support

This project provides a chat system with dual support modes:
1. AI Assistant - Powered by AI to handle common queries
2. Human Agent Support - Real-time chat with human support agents

## Features

- AI-powered chat assistant for automated responses
- Seamless transition from AI to human agent support
- Real-time chat using Socket.io
- Chat room management for personalized conversations
- Agent dashboard to handle multiple support requests
- Message history persistence within chat sessions

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MySQL database

### Installation

1. Clone the repository:
```
git clone <repository-url>
cd chat-backend
```

2. Install dependencies:
```
npm install
```

3. Configure environment variables:
   - Create a `.env` file based on the provided `.env.example`
   - Set your database credentials and API keys

4. Set up the database:
```
mysql -u your_username -p < chat_interface.sql
```

5. Start the server:
```
npm start
```

## Using the Chat System

### As a User
1. Open the chat assistant interface
2. Start chatting with the AI assistant
3. To request human support, type something like:
   - "Connect me to an agent"
   - "I want to speak to a human"
   - "Talk to agent"
4. Wait for an available agent to join your chat
5. Continue your conversation with the human agent

### As a Support Agent
1. Open the agent interface at `/agent`
2. Your status will show as "Online" when connected
3. View all active support requests in the sidebar
4. Select a chat room to join and assist users
5. Chat history will be loaded automatically
6. Use the "Leave Chat" button when finished

## Components

- **Assistant.jsx**: User interface for chat with AI and requesting agents
- **Agent.jsx**: Support agent interface for managing multiple chat sessions
- **Socket.io Integration**: Real-time communication between users and agents
- **Chat Rooms**: Each conversation has a unique room ID for privacy and organization

## Technical Details

- Frontend: React with Tailwind CSS
- Backend: Node.js with Express
- Real-time Communication: Socket.io
- Database: MySQL for persistence
- Authentication: JWT for secure agent access

## Switching Between AI and Human Support

The system automatically detects phrases like "connect me to an agent" in user messages and initiates a connection to a human agent. If no agents are available, the system will notify the user and continue with AI support.

Agents can see all pending support requests and choose which ones to respond to. The chat history is preserved when transitioning between AI and human support. 