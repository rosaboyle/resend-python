import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import QRCode from "qrcode";

/**
 * Sets up the minimal tools
 */
export function setupMinimalTool(server: McpServer): void {
  server.registerTool(
    "echo",
    {
      title: "Echo Tool",
      description: "Echoes back the provided message with timestamp and server metadata",
      inputSchema: {
        message: z.string().describe("The message to echo back")
      }
    },
    async ({ message }) => {
      const response = {
        input: {
          original: message,
          length: message.length,
          type: typeof message
        },
        output: {
          echoed: `Echo: ${message}`,
          timestamp: new Date().toISOString(),
          server: "minimal-mcp",
          processed: true
        },
        metadata: {
          tool: "echo",
          version: "1.0.0",
          transport: "Streamable HTTP"
        }
      };

      return {
        content: [{
          type: "text",
          text: JSON.stringify(response, null, 2)
        }]
      };
    }
  );
  server.registerTool(
    "generate_qr",
    {
      title: "QR Code Generator",
      description: "Generate QR code from URL or text",
      inputSchema: {
        url: z.string().describe("URL or text to encode in QR code")
      }
    },
    async ({ url }) => {
      try {
        const qrCodeDataURL = await QRCode.toDataURL(url);
        
        return {
          content: [{
            type: "text",
            text: JSON.stringify({
              input: url,
              qr_code: qrCodeDataURL,
              format: "data:image/png;base64",
              timestamp: new Date().toISOString()
            }, null, 2)
          }]
        };
      } catch (error) {
        throw new Error(`Failed to generate QR code: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  );
}
