import fs from "fs";
import path from "path";

const componentName = process.argv[2];

if (!componentName) {
  console.error("Please provide a component name");
  process.exit(1);
}

const componentDir = path.join("src", "components", componentName);
const componentFilePath = path.join(componentDir, `${componentName}.tsx`);
const componentStylePath = path.join(componentDir, `${componentName}.scss`);
const indexFilePath = path.join(componentDir, "index.ts");

const componentContent = `import { FC } from "react";
import "./${componentName}.scss";

interface I${componentName}Props {
  
}

const ${componentName}: FC<I${componentName}Props> = () => {
  return (
    <>

    </>
  )
}

export default ${componentName};
`;

// create component directory and files
fs.mkdirSync(componentDir);
fs.writeFileSync(componentFilePath, componentContent);
fs.writeFileSync(componentStylePath, "");
fs.writeFileSync(indexFilePath, `export { default } from "./${componentName}";`);

console.log(`Created at: "${componentDir}"`);
