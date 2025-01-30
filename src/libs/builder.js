import path from 'path'
import fs from 'fs/promises'
import { glob } from 'glob'

export class Builder {
  /**
    * @type {{ type: string, params: any }[]}
   */
  commands = []

  /**
   * @param {object} params
   * @param {string} params.srcRoot
   * @param {string} params.outRoot
   */
  constructor(params) {
    this.srcRoot = params.srcRoot
    this.outRoot = params.outRoot
  }

  /**
   * @private
   * @param {string} type
   * @param {any} params
   * @returns {this}
   */
  command(type, params) {
    this.commands.push({ type, params })
    return this
  }

  /**
   * @param {object} params
   * @param {string} params.key
   * @param {string} params.src
   * @returns {this}
   */
  loadJson(params) {
    return this.command('loadJson', params)
  }

  /**
   * @param {[string, string][]} params
   * @returns {this}
   */
  copy(params) {
    return this.command('copy', params)
  }

  /**
   * @param {{srcPattern: string, outDir: string}} params
   * @returns {this}
   */
  copyGlob(params) {
    return this.command('copyGlob', params)
  }

  /**
   * @param {object} params
   * @param {string} params.src
   * @param {string} params.out
   * @param {(content: string) => Promise<string> | string} [params.parse]
   * @param {(content: string, getData: <T>(key: string) => T) => string} [params.render]
   * @returns {this}
   */
  markdown(params) {
    return this.command('markdown', params)
  }

  /**
   * @param {object} params
   * @param {string} params.srcPattern
   * @param {string} params.outDir
   * @param {(content: string) => Promise<string> | string} [params.parse]
   * @param {(content: string, getData: <T>(key: string) => T) => string} [params.render]
   * @returns {this}
   */
  markdownGlob(params) {
    return this.command('markdownGlob', params)
  }

  /**
   * @param {object} params
   * @param {string} params.out
   * @param {Record<string, any>[]} [params.paths]
   * @param {(content: string, getData: <T>(key: string) => T) => string} [params.render]
   * @returns {this}
   */
  html(params) {
    return this.command('html', params)
  }

  /**
   * @returns {Promise<void>}
   */
  async build() {
    const resolvers = {
      src: (/** @type {string[]} */...subPath) => path.resolve(this.srcRoot, ...subPath),
      out: (/** @type {string[]} */...subPath) => path.resolve(this.outRoot, ...subPath),
    }
    const data = new Map()
    console.log(this.commands)
    for (const { type, params } of this.commands) {
      switch (type) {
        case 'loadJson': {
          const json = await fs.readFile(resolvers.src(params.src), 'utf-8')
          data.set(params.key, JSON.parse(json))
          break
        }
        case 'copy': {
          await Promise.all(params.map(([src, out]) => {
            return fs.cp(resolvers.src(src), resolvers.out(out), { recursive: true })
          }))
          break
        }
        case 'copyGlob': {
          const files = await glob(params.srcPattern, { cwd: this.srcRoot })
          await Promise.all(files.map((file) => {
            return fs.cp(resolvers.src(file), resolvers.out(file), { recursive: true })
          }))
          break
        }
        case 'markdown': {
          const outDirname = path.dirname(resolvers.out(params.out))

          if (!(await isDirExists(outDirname))) {
            await fs.mkdir(outDirname, { recursive: true })
          }

          const parse = params.parse || (content => content)
          const render = params.render || (content => content)
          const content = await fs.readFile(resolvers.src(params.src), 'utf-8')

          const result = await parse(content)
          await fs.writeFile(
            resolvers.out(params.out),
            await render(result, key => data.get(key)),
            'utf-8',
          )
          break
        }
        case 'markdownGlob': {
          const files = await glob(params.srcPattern, { cwd: this.srcRoot })
          await Promise.all(files.map(async (file) => {
            const out = resolvers.out(params.outDir, file.replace(/\.md$/, '.html'))
            const outDirname = path.dirname(out)

            if (!(await isDirExists(outDirname))) {
              await fs.mkdir(outDirname, { recursive: true })
            }

            const parse = params.parse || (content => content)
            const render = params.render || (content => content)
            const content = await fs.readFile(resolvers.src(file), 'utf-8')

            const result = await parse(content)
            await fs.writeFile(
              out,
              await render(result, key => data.get(key), { originalFilename: file }),
              'utf-8',
            )
          }))

          break
        }
        case 'html': {
          const render = params.render || (content => content)
          const paths = params.paths || []
          const getData = key => data.get(key)
          if (paths.length <= 0) {
            const out = resolvers.out(params.out)
            if (!params.src) {
              await fs.writeFile(out, render('', getData), 'utf-8')
              break
            }
            const src = resolvers.src(params.src)
            const content = await fs.readFile(src, 'utf-8')
            const result = await render(content, getData)

            await fs.writeFile(out, result, 'utf-8')
          }
          else {
            await Promise.all(paths.map(async (pathParams) => {
              let replacedOut = params.out
              Object.entries(pathParams).forEach(([key, value]) => {
                replacedOut = replacedOut.replace(`[${key}]`, value)
              })
              const out = resolvers.out(replacedOut)
              await fs.writeFile(out, render('', getData, pathParams), 'utf-8')
            }))
          }

          break
        }
      }
    }
  }
}

const isDirExists = async (dirname) => {
  try {
    const outStat = await fs.stat(dirname)
    if (!outStat.isDirectory()) {
      return false
    }
    return true
  }
  catch {
    return false
  }
}
