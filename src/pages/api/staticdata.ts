import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  const dataDirectory = path.join(process.cwd(), 'src/data');
  const fileContents = await fs.readFile(dataDirectory + '/data.json', 'utf8');
  res.status(200).json(fileContents);
}
