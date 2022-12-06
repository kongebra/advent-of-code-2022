import type { NextApiRequest, NextApiResponse } from "next";
import { readInputFile } from "src/utils/input";

function baseFunction(input: string) {
  const characters = input.split("");

  return characters;
}

function partOne(input: string) {
  const characters = baseFunction(input);

  for (let i = 0; i < characters.length - 4; i++) {
    let arr: string[] = [];
    for (let j = 0; j < 4; j++) {
      arr.push(characters[i + j]);
    }

    const set = Array.from(new Set(arr));

    if (set.length === 4) {
      return i + 4;
    }

    arr = [];
  }

  return -1;
}

function partTwo(input: string) {
  const characters = baseFunction(input);

  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const input = await readInputFile("06");

  const star = {
    one: partOne(input),
    two: partTwo(input),
  };

  res.status(200).json(star);
}
