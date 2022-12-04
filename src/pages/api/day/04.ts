import type { NextApiRequest, NextApiResponse } from "next";
import { readInputFile } from "src/utils/input";

type Section = [number, number];
type SectionPair = [Section, Section];

function sectionContainsSection([a, b]: SectionPair): boolean {
  // 2-4
  // 6-8
  // false

  // 2-8
  // 3-7
  // true

  if ((a[0] <= b[0] && a[1] >= b[1]) || (a[0] >= b[0] && a[1] <= b[1])) {
    return true;
  }

  return false;
}

function baseFunction(input: string) {
  const rows = input.split("\r\n");
  const pairs = rows
    .map((row) => row.split(","))
    .map(
      (sections) =>
        sections.map(
          (section) =>
            section
              .split("-")
              .map((sectionString) => Number(sectionString)) as Section
        ) as SectionPair
    );

  return pairs;
}

function partOne(input: string) {
  const pairs = baseFunction(input);

  const pairsOverlap = pairs.map(sectionContainsSection);
  const overlappingCount = pairsOverlap.filter(
    (overlapping) => overlapping === true
  ).length;

  return overlappingCount;
}

function partTwo(input: string) {
  const pairs = baseFunction(input);

  function helper(section: Section) {
    const result: number[] = [];

    for (let i = section[0]; i <= section[1]; i++) {
      result.push(i);
    }

    return result;
  }

  const pairsNotOverlapping = pairs.map(([a, b]) => {
    const arrA = helper(a);
    const arrB = helper(b);

    const overlappingItems = Array.from(
      new Set(arrA.filter((A) => arrB.includes(A)))
    );

    return overlappingItems.length > 0;
  });

  const count = pairsNotOverlapping.filter(
    (overlapping) => overlapping === true
  ).length;

  return count;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const input = await readInputFile("04");

  const star = {
    one: partOne(input),
    two: partTwo(input),
  };

  res.status(200).json(star);
}
