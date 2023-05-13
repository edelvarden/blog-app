import fs from "fs"
import path from "path"

// Get hook names from command line arguments
const hookNames = process.argv.slice(2)

// If no hook name is provided, exit the script with an error message
if (hookNames.length === 0) {
  console.error("Please provide at least one hook name")
  process.exit(1)
}

// Loop through each hook name and create the hook
hookNames.forEach((hookName) => {
  const hookDir = path.join("src", "hooks", hookName)
  const hookFilePath = path.join(hookDir, `${hookName}.ts`)

  // create hook directory
  fs.mkdirSync(hookDir)

  // create hook file
  fs.writeFileSync(
    hookFilePath,
    `import { useState } from "react"

interface I${hookName}State {
  
}

export const use${hookName} = (): I${hookName}State => {
  const [state, setState] = useState<I${hookName}State>()

  return state
}
`
  )

  console.log(`Created at: "${hookDir}"`)
})
