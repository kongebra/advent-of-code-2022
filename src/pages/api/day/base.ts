import type { NextApiRequest, NextApiResponse } from "next";
import { readInputFile } from "src/utils/input";

function baseFunction(input: string) {
  const rows = input.split("\r\n");

  return rows;
}

function partOne(input: string) {
  const rows = baseFunction(input);

  return null;
}

function partTwo(input: string) {
  const rows = baseFunction(input);

  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const input = await readInputFile("01");

  const star = {
    one: partOne(input),
    two: partTwo(input),
  };

  res.status(200).json(star);
}
