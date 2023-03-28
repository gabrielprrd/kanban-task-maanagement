import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { IBoard } from '@/models/board';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const dataDirectory = path.join(process.cwd(), 'src/data');
  const fileContents = await fs.readFile(dataDirectory + '/boards.json', 'utf8');
  const parsedFileContents = JSON.parse(fileContents)
  let response = {};

  if (!parsedFileContents) {
    return res.status(500).json({"error": "Internal server error"})
  }

  response = parsedFileContents.boards.find((b: IBoard) => b.slug === req.query.slug)


  if (!response) {
    return res.status(404).json({"error": "Could not found a board with respective slug."})
  }

  res.status(200).json(response);
}
