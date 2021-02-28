const Path = require('path');
const Fs = require('fs');
const MarkdownIt = require('markdown-it')();
const Mkdirp = require('mkdirp');
const Glob = require('glob');

/**
 * @typedef {object} Config
 * @property {string} inputPattern
 * @property {string} ignorePattern
 * @property {string} outputDir
 * @property {string} template
 */

main({
  workingDir: process.cwd(),
  inputPattern: '**/*.md',
  ignorePattern: 'node_modules/**/*',
  outputDir: 'output',
  template: 'template.html',
});

/**
 * @param {string} workingDir
 * @param {Config} config 
 */
function main(config) {
  const template = readTemplate(config);

  traverseInputFiles (config, async param => {
    const result = applyTemplate(template, {
      content: convertMdToHtml(param.content),
    });
  
    const outputPath = getOutputPath(config, param.absolutePath);

    await makeDir(Path.parse(outputPath).dir);
    Fs.writeFileSync(outputPath, result);
  });
}

/**
 * @param {Config} config
 * @returns {string}
 */
function readTemplate (config) {
  return Fs.readFileSync(
    Path.resolve(config.workingDir, config.template)
  ).toString();
}

/**
 * @param {Config} config
 * @param {(
 *    param: {
 *    name: string,
 *    content: string
 *  }) => void
 * } callback
 * @returns {void}
 */
function traverseInputFiles (config, callback) {
  return Glob
    .sync(config.inputPattern, {ignore: config.ignorePattern})
    .map(matched => Path.resolve(config.workingDir, matched))
    .forEach(path => callback(
      {
        name: Path.parse(path).name,
        absolutePath: path,
        content: Fs.readFileSync(path).toString()
      })
    );
}

/**
 * @param {string} template
 * @param {object} options
 * @param {string} options.content
 */
function applyTemplate (template, options) {
  return template.replace('{{content}}', options.content);
}

/**
 * @param {string} content
 * @returns {string}
 */
function convertMdToHtml (content) {
  return MarkdownIt.render(content);
}

/**
 * @param {Config} config 
 * @param {string} inputPath 
 * @returns {string}
 */
function getOutputPath (config, inputPath) {
  return Path
    .join(
      config.workingDir,
      config.outputDir,
      inputPath
      .replace(config.workingDir, '')
      .replace('.md', '.html')
    );
}

/**
 * @param {string} dirPath 
 * @returns {Promise<void>}
 */
function makeDir (dirPath) {
  return Mkdirp(dirPath);
}
