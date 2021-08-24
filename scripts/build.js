import nodeFs from 'node:fs'
import {join, parse} from 'node:path';
import {mdToHTML, readFile, mkdirIfNotExist, rmdir, writeFile, log, isMarkdown, isDirectory} from './libs.js';
import glob from 'glob';

const IGNORE = [
  'node_modules/**',
  "scripts/**",
  "build/**",
  "package.json",
  "package-lock.json"
];

const OUTPUT = 'build';

function cleanOutput () {
  log('remove', OUTPUT);
  rmdir(OUTPUT);
}

/**
 * @param {string} file 
 * @returns {void}
 */
async function onEachFile (file) {
  let outputPath = join(OUTPUT, file);

  if (isMarkdown(file)) {
    const parsed = parse(file);
    const markdown = readFile(file);
    const html = await mdToHTML(markdown);
    outputPath = join(OUTPUT, parsed.dir, `${parsed.name}.html`);

    log('convert', `${file} => ${outputPath}`);
    writeFile(outputPath, html);
  } else if (isDirectory(file)) {

    log('create', outputPath);
    mkdirIfNotExist(outputPath);
  } else if (!isDirectory(file)) {
    const content = readFile(file);

    log('copy', `${file} => ${outputPath}`);
    writeFile(outputPath, content);
  }
}

(() => {
  cleanOutput();
  mkdirIfNotExist('build');
  glob("**/*", {ignore: IGNORE}, async (error, files) => {
    if (error) {
      console.error(error);
      return;
    }
    for (const file of files) {
      await onEachFile(file);
    }
  });
})();
