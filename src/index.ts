interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * yc-rejection MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Instant YC rejection for any startup idea. Encouragement included. Encouragement
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'yc_rejection_generate',
    description: 'Instant YC rejection for any startup idea. Encouragement included. Encouragement is not sincere.',
    inputSchema: {
      type: 'object' as const,
      properties: {"idea": {"type": "string"}, "founder_count": {"type": "number"}, "traction": {"type": "string", "enum": ["none", "some", "impressive", "pre-traction"]}, "pivot_count": {"type": "number"}, "have_you_talked_to_users": {"type": "boolean"}, "is_it_uber_for": {"type": "boolean"}},
      required: ["idea"],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('yc-rejection API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'yc_rejection_generate':
      return callApi('https://api.stupidapis.com/yc-rejection/generate', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
