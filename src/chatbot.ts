import { loadOpenApiSpec } from './apiSpecLoader';
import { generateStubFromSchema } from './stubGenerator';

export async function handleChatPrompt(userInput: string): Promise<string> {
  const api = await loadOpenApiSpec();
  const search = userInput.toLowerCase();

  for (const [path, methods] of Object.entries(api.paths)) {
    for (const [method, operation] of Object.entries<any>(methods)) {
      const summary = operation.summary?.toLowerCase() || '';
      if (summary.includes(search) || path.includes(search)) {
        return generateStubFromSchema(path, method, operation);
      }
    }
  }

  return '// No matching endpoint found.';
}
