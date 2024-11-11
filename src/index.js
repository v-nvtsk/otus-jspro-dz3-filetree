import path from "path";
import { getDirectoryTree } from "./files";
import { printTree } from "./tree";

async function main() {
  const args = process.argv.slice(2);
  const dir = args[0] || ".";
  const depthIndex = args.findIndex((arg) => arg === "--depth" || arg === "-d");
  const depth = depthIndex !== -1 ? parseInt(args[depthIndex + 1], 10) : Infinity;

  const { tree, fileCount, dirCount } = await getDirectoryTree(dir, depth);

  console.log(path.basename(dir));
  printTree(tree);

  console.log(`\n${dirCount} directories, ${fileCount} files`);
}

main();
