function formatPrompt(path: string, method: string, schema: any, summary: string): string {
  const requestProps = schema?.requestBody?.content?.['application/json']?.schema?.properties || {};
  const paramDoc = Object.entries(requestProps)
    .map(([key, val]: any) => `- ${key}: ${val.type}`)
    .join('\n');

  return `
You are a senior engineer writing TypeScript code to call an internal API.

Endpoint:
  ${method.toUpperCase()} ${path}
Summary:
  ${summary}

Request body parameters:
${paramDoc}

Write a complete example using \`fetch\` or a custom API client to call this endpoint, with comments and error handling.
`;
}

export function generateStubFromSchema(path: string, method: string, operation: any): string {
  const prompt = formatPrompt(path, method, operation, operation.summary || '');
  
  // Replace this with Copilot/LLM integration
  return `/* Copilot-style code (simulated) based on prompt:
${prompt}
*/

async function createInvoice() {
  const response = await fetch('${path}', {
    method: '${method.toUpperCase()}',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN'
    },
    body: JSON.stringify({
      customerId: "cust_12345",
      amount: 250.00
    })
  });

  if (!response.ok) {
    throw new Error("Failed to create invoice");
  }

  const data = await response.json();
  console.log("Invoice created:", data);
}
`;
}
