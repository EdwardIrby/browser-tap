import { servor } from './puppeteer/servor'
import { runPuppet } from './puppeteer/runPuppet'
import { testPage } from './puppeteer/testPage'
import { bundle } from './puppeteer/bundle'
import { favicon } from './puppeteer/favicon'

export const puppeteer = async ({ coverage, root, template, debug, files }) => {
  const tests = await bundle({ input: files, coverage })
  const page = template ? await import(template) : testPage(tests)
  const server = await servor({
    page,
    root,
  })
  server.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: () => favicon,
  })
  const close = await runPuppet({
    url: server.info.uri,
    debug,
    coverage,
    stop: server.stop.bind(server),
  })
  process.on('SIGINT', () => close(0))
}
