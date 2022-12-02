import type { NextApiRequest, NextApiResponse } from "next";
import { readInputFile } from "src/utils/input";

function baseFunction(input: string) {}

function partOne(input: string) {}

function partTwo(input: string) {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const input = await readInputFile("02");

  const star = {
    one: partOne(input),
    two: partTwo(input),
  };

  res.status(200).json(star);
}
