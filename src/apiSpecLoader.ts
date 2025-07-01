import SwaggerParser from '@apidevtools/swagger-parser';
import * as path from 'path';

export async function loadOpenApiSpec() {
  const specPath = path.resolve(__dirname, '../openapi/internal-spec.json');
  const api = await SwaggerParser.dereference(specPath);
  return api;
}
