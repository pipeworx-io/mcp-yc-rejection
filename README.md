# mcp-yc-rejection

yc-rejection MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `yc_rejection_generate` | Instant YC rejection for any startup idea. Encouragement included. Encouragement is not sincere. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "yc-rejection": {
      "url": "https://gateway.pipeworx.io/yc-rejection/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use yc-rejection
```

## License

MIT
