import type { NextApiRequest, NextApiResponse } from "next";
import { readInputFile } from "src/utils/input";

type Play = "rock" | "paper" | "scissor";
type Input = "A" | "B" | "C" | "X" | "Y" | "Z";
type Result = "win" | "draw" | "loss";

const TRANSLATOR: Record<Input, Play> = {
  A: "rock",
  B: "paper",
  C: "scissor",
  X: "rock",
  Y: "paper",
  Z: "scissor",
};

const PLAY_SCORE: Record<Play, number> = {
  rock: 1,
  paper: 2,
  scissor: 3,
};

const RESULT_SCORE: Record<Result, number> = {
  win: 6,
  draw: 3,
  loss: 0,
};

const RULES: Record<Play, Record<Play, Result>> = {
  rock: {
    rock: "draw",
    paper: "loss",
    scissor: "win",
  },
  paper: {
    rock: "win",
    paper: "draw",
    scissor: "loss",
  },
  scissor: {
    rock: "loss",
    paper: "win",
    scissor: "draw",
  },
};

function baseFunction(input: string) {}

function partOne(input: string) {
  const rows = input
    .split("\r\n")
    .map((row) => row.split(" ") as [Input, Input]);

  const points = rows.map((row) => {
    const [opponent, player] = [TRANSLATOR[row[0]], TRANSLATOR[row[1]]];
    const result = RULES[player][opponent];

    const playScore = PLAY_SCORE[player];
    const resultScore = RESULT_SCORE[result];

    const score = playScore + resultScore;

    return score;
  });

  const sumPoints = points.reduce((prev, curr) => prev + curr, 0);

  return sumPoints;
}

function partTwo(input: string) {
  return null;
}

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
