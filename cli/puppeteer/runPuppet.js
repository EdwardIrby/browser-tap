import Finished from 'tap-finished'
import Parser from 'tap-parser'
import { PassThrough } from 'stream'
import colorize from 'tap-colorize'

import { execShellCommand } from './execShellCommand'
import { generateCoverage } from './generateCoverage'
import { initPuppet } from './initPuppet'

export const runPuppet = async ({ url, debug, coverage, stop }) => {
  let done
  const { browser, page } = await initPuppet(debug)
  const passStream = new PassThrough()
  const close = async code => {
    stop()
    await page.close()
    await browser.close()
    process.exit(code)
  }
  // Streams
  passStream.pipe(colorize()).pipe(process.stdout)
  const parseStream = new Parser()
  const finishedStream = new Finished(() => {
    done = true
    parseStream.end()
  })
  // Internal close conditions
  parseStream.on('fail', async () => {
    !debug && (await close(1))
  })
  parseStream.on('complete', async () => {
    if (!debug && coverage) {
      await generateCoverage(page)
      // const report = await execShellCommand('nyc report --branches 80')
      // passStream.write(report)
    }
    !debug && (await close(0))
  })
  debug &&
    browser.on('disconnected', () => {
      process.exit()
    })
  // Connect streams to page
  page.on('console', msg => {
    const text = `${msg.text()}\n`
    if (!done) {
      parseStream.write(text)
      finishedStream.write(text)
    }
    passStream.write(text)
  })
  await page.goto(url)
  return close
}
