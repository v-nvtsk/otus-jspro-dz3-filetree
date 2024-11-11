export function printTree(tree, prefix = "") {
  const { files = [], directories = [] } = tree;

  directories.forEach((dir, i) => {
    const isLast = i === directories.length - 1 && files.length === 0;
    console.log(prefix + (isLast ? "└── " : "├── ") + dir.name);

    printTree(dir.children, prefix + (isLast ? "    " : "│   "));
  });

  files.forEach((file, i) => {
    const isLast = i === files.length - 1;
    console.log(prefix + (isLast ? "└── " : "├── ") + file);
  });
}
