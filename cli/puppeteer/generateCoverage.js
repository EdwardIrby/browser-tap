import { promises as fs } from 'fs'
import path from 'path'
import { execShellCommand } from './execShellCommand'
const coverageDir = path.resolve(process.cwd(), './.nyc_output')

export const generateCoverage = async page => {
  await execShellCommand(`rm -rf ${coverageDir}`)
  await fs.mkdir(coverageDir, { recursive: true })
  const obj = await page.evaluate('window.__coverage__')
  return fs.writeFile(`${coverageDir}/coverage.json`, JSON.stringify(obj))
}
