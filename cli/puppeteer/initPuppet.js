import chromePuppet from 'puppeteer-core'

export const initPuppet = async debug => {
  const browser = await chromePuppet.launch({
    executablePath: process.env.CHROME,
    args: ['--no-sandbox'],
  })
  const page = await browser.newPage()
  return { browser, page }
}
