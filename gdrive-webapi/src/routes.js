import { logger } from "./logger.js"
import FileHelper from "./fileHelper.js"
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const _dirname = dirname(fileURLToPath(import.meta.url))
const defaultDownloadsFolder = resolve(_dirname, '../', "downloads")
export default class Routes {
  io
  constructor(downloadsFolder = defaultDownloadsFolder) {
    this.downloadsFolder = downloadsFolder
    this.fileHelper = FileHelper
  }

  setSocketInstance(io) {
    this.io = io
  }

  async dafaultRoute(req, res) {
    res.end('hello')
  }

  async options(req, res) {
    res.writeHead(204)
    res.end()
  }

  async post(req, res) {
    logger.info('post')
    res.end()
  }

  async get(req, res) {
    const files = await this.fileHelper.getFilesStatus(this.downloadsFolder)

    res.writeHead(200)
    res.end(JSON.stringify(files))
  }

  handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const chosen = this[req.method.toLowerCase()] || this.dafaultRoute

    return chosen.apply(this, [req, res])
  }
}