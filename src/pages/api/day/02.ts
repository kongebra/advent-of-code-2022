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

const PART_TWO_RULES: Record<Play, Result> = {
  rock: "loss",
  paper: "draw",
  scissor: "win",
};

function baseFunction(input: string) {
  const rows = input
    .split("\r\n")
    .map((row) => row.split(" ") as [Input, Input]);

  return rows;
}

function partOne(input: string) {
  const rows = baseFunction(input);

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
  const rows = baseFunction(input);

  const points = rows.map((row) => {
    const [opponent, player] = [TRANSLATOR[row[0]], TRANSLATOR[row[1]]];

    const result = PART_TWO_RULES[player];

    const resultScore = RESULT_SCORE[result];

    const playerPlay = getPartTwoPlayerPlay(result, opponent);
    const playScore = PLAY_SCORE[playerPlay];

    const score = playScore + resultScore;

    return score;
  });

  const sumPoints = points.reduce((prev, curr) => prev + curr, 0);

  return sumPoints;
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
function getPartTwoPlayerPlay(result: Result, opponent: Play): Play {
  if (result === "win") {
    if (opponent === "rock") {
      return "paper";
    } else if (opponent === "paper") {
      return "scissor";
    } else if (opponent === "scissor") {
      return "rock";
    }
  } else if (result === "draw") {
    return opponent;
  } else if (result === "loss") {
    if (opponent === "rock") {
      return "scissor";
    } else if (opponent === "paper") {
      return "rock";
    } else if (opponent === "scissor") {
      return "paper";
    }
  }

  return "rock";
}
