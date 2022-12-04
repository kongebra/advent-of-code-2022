import type { NextApiRequest, NextApiResponse } from "next";
import { readInputFile } from "src/utils/input";

const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

type Compartment = [string, string];

function findReoccuringCharacter([compA, compB]: Compartment) {
  const compACharacters = compA.split("");

  const occuringCharacters = compB
    .split("")
    .filter((char) => compACharacters.includes(char));

  if (occuringCharacters.length) {
    return occuringCharacters[0] as string;
  }

  console.log(occuringCharacters);

  return "";
}

function baseFunction(input: string) {
  const compartments = input.split("\r\n").map((rucksack) => {
    const length = rucksack.length;
    const halfWay = length / 2;
    const firstCompartment = rucksack.slice(0, halfWay);
    const secondCompartemnt = rucksack.slice(halfWay, length);

    return [firstCompartment, secondCompartemnt] as Compartment;
  });

  return compartments;
}

function partOne(input: string) {
  const compartments = baseFunction(input);

  const occuringCharacters = compartments.map(findReoccuringCharacter);
  const priorities = occuringCharacters.map(
    (char) => ALPHABET.indexOf(char) + 1
  );

  const sum = priorities.reduce((prev, curr) => prev + curr, 0);

  return sum;
}

function partTwo(input: string) {
  const rows = baseFunction(input);

  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const input = await readInputFile("03");

  const star = {
    one: partOne(input),
    two: partTwo(input),
  };

  res.status(200).json(star);
}
