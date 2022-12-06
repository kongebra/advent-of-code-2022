import type { NextApiRequest, NextApiResponse } from "next";
import { readInputFile } from "src/utils/input";

function solver(characters: string[], num: number): number {
  for (let i = 0; i < characters.length - num; i++) {
    const arr: string[] = [];
    for (let j = 0; j < num; j++) {
      arr.push(characters[i + j]);
    }

    const set = Array.from(new Set(arr));

    if (set.length === num) {
      return i + num;
    }
  }

  return -1;
}

function baseFunction(input: string) {
  const characters = input.split("");

  return characters;
}

function partOne(input: string) {
  const characters = baseFunction(input);

  return solver(characters, 4);
}

function partTwo(input: string) {
  const characters = baseFunction(input);

  return solver(characters, 14);
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
