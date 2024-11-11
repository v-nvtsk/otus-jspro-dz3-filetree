import fs from "fs/promises";
import path from "path";

export async function getDirectoryTree(dir, depth, currentDepth = 0) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = [];
    const directories = [];
    let fileCount = 0;
    let dirCount = 0;

    const directoryPromises = entries.map(async (entry) => {
      if (entry.isDirectory()) {
        dirCount += 1;
        if (currentDepth < depth) {
          const subDirTree = await getDirectoryTree(path.join(dir, entry.name), depth, currentDepth + 1);
          directories.push({ name: entry.name, children: subDirTree.tree });
          fileCount += subDirTree.fileCount;
          dirCount += subDirTree.dirCount;
        } else {
          directories.push({ name: entry.name, children: [] });
        }
      } else {
        files.push(entry.name);
        fileCount += 1;
      }
    });

    await Promise.all(directoryPromises);

    return { tree: { files, directories }, fileCount, dirCount };
  } catch (error) {
    console.log(`Error reading directory ${dir}: ${error.message}`);
    return { tree: { files: [], directories: [] }, fileCount: 0, dirCount: 0 };
  }
}
