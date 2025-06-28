import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

/**
 * Sets up the single minimal resource
 */
export function setupMinimalResource(server: McpServer): void {
  server.registerResource(
    "server-info",
    "info://server",
    {
      title: "Server Information",
      description: "Basic information about this minimal MCP server",
      mimeType: "application/json"
    },
    async (uri: URL) => {
      const serverInfo = {
        name: "minimal-mcp",
        version: "1.0.0",
        description: "A minimal MCP server with one resource, one tool, and one prompt",
        timestamp: new Date().toISOString(),
        features: ["resources", "tools", "prompts"],
        uri: uri.href,
        capabilities: {
          resources: 1,
          tools: 1,
          prompts: 1
        },
        transport: "Streamable HTTP",
        status: "active"
      };

      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(serverInfo, null, 2),
          mimeType: "application/json"
        }]
      };
    }
  );
}
