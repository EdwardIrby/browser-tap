/* eslint-disable no-console */
import hapi from '@hapi/hapi'
import inert from '@hapi/inert'
/**
 * @description start static file server for rapid SPA/Hybrid-SPA development forked off npm package S. Returns
 * server object to enable graceful stopping of server
 * @param {Object} obj
 * @param {String} obj.root
 * @param {Function} obj.page
 * @param {Boolean} obj.browser
 * @param {Number} obj.port
 * @param {Boolean} obj.reload
 */
/** @param Object */
export const servor = async ({ root, page, port = 5000 }) => {
  const server = new hapi.Server({
    host: 'localhost',
    port,
    routes: {
      files: {
        relativeTo: root,
      },
    },
  })
  await server.register(inert)
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
      },
    },
  })
  server.route({
    method: 'GET',
    path: '/',
    handler: page,
  })
  await server.start()
  console.log(
    `\n 🗂  Serving${root ? ` files from ./${root}` : ''} on ${server.info.uri}`,
  )
  return server
}
