import type { NextApiRequest, NextApiResponse } from "next";
import { readInputFile } from "src/utils/input";

type Board = string[][];
type Instruction = {
  amount: number;
  from: number;
  to: number;
};

function copyBoard(board: Board): Board {
  const result: Board = [];

  for (let i = 0; i < board.length; i++) {
    result.push([...board[i]]);
  }

  return result;
}

function printBoard(board: Board) {
  const longest = Math.max(...board.map((row) => row.length));

  for (let i = 0; i < board.length; i++) {
    console.log(`${i} ${board[i].join(" ")}`);
  }
  console.log(" ");
}

function movePartOne(board: Board, instruction: Instruction) {
  const copy = copyBoard(board);

  if (instruction.from < 1 || instruction.to > board.length) {
    throw new Error("index out of bounds");
  }

  for (let i = 0; i < instruction.amount; i++) {
    const item = copy[instruction.from - 1].pop();
    if (item) {
      copy[instruction.to - 1].push(item);
    } else {
      throw new Error("cannot pop nothing darling");
    }
  }

  return copy;
}

function movePartTwo(board: Board, instruction: Instruction) {
  const copy = copyBoard(board);

  if (instruction.from < 1 || instruction.to > board.length) {
    throw new Error("index out of bounds");
  }

  const items: string[] = [];

  for (let i = 0; i < instruction.amount; i++) {
    const item = copy[instruction.from - 1].pop();

    if (item) {
      items.push(item);
    } else {
      throw new Error("cannot pop nothing darling");
    }
  }

  copy[instruction.to - 1].push(...items.reverse());

  return copy;
}

function performInstructionsPartOne(board: Board, instructions: Instruction[]) {
  let copy = copyBoard(board);

  for (let i = 0; i < instructions.length; i++) {
    copy = movePartOne(copy, instructions[i]);
  }

  return copy;
}

function performInstructionsPartTwo(board: Board, instructions: Instruction[]) {
  let copy = copyBoard(board);

  for (let i = 0; i < instructions.length; i++) {
    copy = movePartTwo(copy, instructions[i]);
  }
  return copy;
}

function getAnswer(board: Board) {
  let result = "";

  for (let i = 0; i < board.length; i++) {
    const column = board[i];
    const topCrate = column[column.length - 1];

    result += topCrate;
  }

  return result;
}

function createBoard(input: string[]) {
  const copy = [...input];
  copy.pop(); // remove column numbers

  const length = copy.map((r) => r.length)[0];
  const columns = (length + 1) / 4;

  const board: Board = [];
  for (let i = 0; i < columns; i++) {
    board.push([]);
  }

  for (let r = 0; r < copy.length; r++) {
    for (let c = 0; c < columns; c++) {
      const row = copy[r];
      const item = row.slice(1 + c * 4, 2 + c * 4).trim();

      if (item) {
        board[c].unshift(item);
      }
    }
  }

  return board;
}

function createInstructions(input: string[]) {
  const instructions: Instruction[] = [];

  for (const line of input) {
    const [amount, from, to] = line
      .replace("move ", "")
      .replace(" from ", " ")
      .replace(" to ", " ")
      .split(" ")
      .map((char) => Number(char));

    instructions.push({
      amount,
      from,
      to,
    });
  }

  return instructions;
}

function baseFunction(input: string): [Board, Instruction[]] {
  const [boardBlock, instructionBlock] = input.split("\r\n\r\n");
  const boardInput = boardBlock.split("\r\n");
  const instructionsInput = instructionBlock.split("\r\n");

  const board = createBoard(boardInput);
  const instructions = createInstructions(instructionsInput);

  return [board, instructions];
}

function partOne(input: string) {
  const [board, instructions] = baseFunction(input);

  const result = performInstructionsPartOne(board, instructions);
  const answer = getAnswer(result);

  return answer;
}

function partTwo(input: string) {
  const [board, instructions] = baseFunction(input);

  const result = performInstructionsPartTwo(board, instructions);
  const answer = getAnswer(result);

  return answer;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const input = await readInputFile("05");

  const star = {
    one: partOne(input),
    two: partTwo(input),
  };

  res.status(200).json(star);
}
