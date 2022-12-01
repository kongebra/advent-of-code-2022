import type { NextApiRequest, NextApiResponse } from "next";
import { readInputFile } from "src/utils/input";

function baseFunction(input: string): number[] {
  // Splitter opp basert på blanke linjer
  const elfs = input.split("\r\n\r\n");

  // Remove all new lines, and convert string to numbers
  const elfCalories = elfs.map((elf) =>
    elf.split("\r\n").map((calStr) => Number(calStr))
  );

  // Summer opp kalorier for hver alv
  const elfSumCalories = elfCalories.map((calories) =>
    calories.reduce((prev, curr) => prev + curr, 0)
  );

  return elfSumCalories;
}

function partOne(input: string): number {
  const elfSumCalories = baseFunction(input);

  // Finn høyeste kalorisum
  const maxCalories = Math.max(...elfSumCalories);

  return maxCalories;
}

function partTwo(input: string) {
  // Sorter innhold (størst først)
  const elfSumCalories = baseFunction(input).sort((a, b) => b - a);

  const threeLargest = elfSumCalories.slice(0, 3);

  const sum = threeLargest.reduce((prev, curr) => prev + curr, 0);

  return sum;
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
