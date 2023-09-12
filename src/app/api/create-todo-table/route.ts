import { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '@vercel/postgres';
 
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const result =
      await sql`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'todo');`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
