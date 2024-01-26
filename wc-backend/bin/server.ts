/*
|--------------------------------------------------------------------------
| HTTP server entrypoint
|--------------------------------------------------------------------------
|
| The "server.ts" file is the entrypoint for starting the AdonisJS HTTP
| server. Either you can run this file directly or use the "serve"
| command to run this file and monitor file changes
|
*/
import { createServer as createHttpServer } from 'http'
import { createServer as createHttpsServer } from 'https'
import 'reflect-metadata'
import { Ignitor, prettyPrintError } from '@adonisjs/core'

/**
 * URL to the application root. AdonisJS need it to resolve
 * paths to file and directories for scaffolding commands
 */
const APP_ROOT = new URL('../', import.meta.url)

/**
 * The importer is used to import files in context of the
 * application.
 */
const IMPORTER = (filePath: string) => {
  if (filePath.startsWith('./') || filePath.startsWith('../')) {
    return import(new URL(filePath, APP_ROOT).href)
  }
  return import(filePath)
}

new Ignitor(APP_ROOT, { importer: IMPORTER })
  .tap((app) => {
    app.booting(async () => {
      await import('#start/env')
    })
    app.listen('SIGTERM', () => app.terminate())
    app.listenIf(app.managedByPm2, 'SIGINT', () => app.terminate())
  })
  .httpServer()
  .start((handle) => {
    if (process.env.NODE_ENV === 'development') {
      return createHttpServer(handle)
    }

    if (!process.env.SSL_KEY_PATH || !process.env.SSL_CERT_PATH) {
      throw new Error('SSL_KEY_PATH and SSL_CERT_PATH must be set in production mode')
    }

    return createHttpsServer(
      {
        key: process.env.SSL_KEY_PATH,
        cert: process.env.SSL_CERT_PATH,
      },
      handle
    )
  })
  .catch((error) => {
    process.exitCode = 1
    prettyPrintError(error)
  })
