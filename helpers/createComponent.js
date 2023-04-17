import fs from "fs";
import path from "path";

// Get component names from command line arguments
const componentNames = process.argv.slice(2);

// If no component name is provided, exit the script with an error message
if (componentNames.length === 0) {
  console.error("Please provide at least one component name");
  process.exit(1);
}

// Loop through each component name and create the component
componentNames.forEach((componentName) => {
  const componentDir = path.join("src", "components", componentName);
  const componentFilePath = path.join(componentDir, `${componentName}.tsx`);
  const componentStylePath = path.join(componentDir, `${componentName}.scss`);
  const indexFilePath = path.join(componentDir, "index.ts");

  const componentContent = `import { FC } from "react"
import "./${componentName}.scss"

interface I${componentName}Props {
  
}

const ${componentName}: FC<I${componentName}Props> = () => {
  return (
    <>

    </>
  )
}

export default ${componentName}
  `;

  // create component directory and files
  fs.mkdirSync(componentDir);
  fs.writeFileSync(componentFilePath, componentContent);
  fs.writeFileSync(componentStylePath, "");
  fs.writeFileSync(indexFilePath, `export { default } from "./${componentName}"`);

  console.log(`Created at: "${componentDir}"`)
})
