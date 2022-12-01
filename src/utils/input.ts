import path from "path";
import { promises as fs } from "fs";

export async function readInputFile(day: string): Promise<string> {
  const inputDirectory = path.join(process.cwd(), "public/input");
  const fileContents = await fs.readFile(
    `${inputDirectory}/${day}.txt`,
    "utf-8"
  );

  return fileContents;
}
