import { sql } from "@vercel/postgres";
export default async function handler(request, response) {
  try {
    const result = await sql`CREATE TABLE words (word varchar(255) NOT NULL);`;
    return response.status(200).json({ result });
  } catch (err) {
    return response.status(500).json({ err });
  }
}
