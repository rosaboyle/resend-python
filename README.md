# Minimal MCP Server

This is the minimal MCP (Model Context Protocol) server implementation with Streamable HTTP transport.

## Features

- **One Resource**: `server-info` - Provides JSON information about the server
- **One Tool**: `echo` - Echoes back messages with metadata
- **One Prompt**: `greeting` - Generates personalized greeting prompts
- **Streamable HTTP Transport**: Modern MCP transport protocol
- **TypeScript**: Full type safety with ES modules

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or build and run production
npm run build
npm start
```

## API Endpoints

- **MCP Endpoint**: `POST http://localhost:3000/mcp`
- **Health Check**: `GET http://localhost:3000/health`
- **Server Info**: `GET http://localhost:3000/`

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=3000
MCP_SERVER_NAME=minimal-mcp
MCP_SERVER_VERSION=1.0.0
```

## MCP Capabilities

### Resource: `server-info`
- **URI**: `info://server`
- **Description**: Returns server information and metadata

### Tool: `echo`
- **Input**: `{ message: string }`
- **Description**: Echoes back the message with timestamp and metadata

### Prompt: `greeting`
- **Arguments**: `{ name: string, style?: "formal" | "casual" | "friendly" }`
- **Description**: Generates personalized greeting prompts

## Usage with MCP Clients

Connect your MCP client to `http://localhost:3000/mcp` using the Streamable HTTP transport.

## Architecture

```
src/
├── server.ts          # Express server with Streamable HTTP transport
├── mcp-server.ts      # MCP server configuration
└── minimal/
    ├── resource.ts    # Single resource implementation
    ├── tool.ts        # Single tool implementation
    └── prompt.ts      # Single prompt implementation