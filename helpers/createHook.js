import fs from "fs";
import path from "path";

const hookName = process.argv[2];

if (!hookName) {
  console.error("Please provide a hook name");
  process.exit(1);
}

const hookDir = path.join("src", "hooks", hookName);
const hookFilePath = path.join(hookDir, `${hookName}.ts`);

// create hook directory
fs.mkdirSync(hookDir);

// create hook file
fs.writeFileSync(
  hookFilePath,
  `import { useState } from "react";

interface I${hookName}State {
  
}

export const use${hookName} = (): I${hookName}State => {
  const [state, setState] = useState<I${hookName}State>()

  return state
}
`
);

console.log(`Created at: "${hookDir}"`);
