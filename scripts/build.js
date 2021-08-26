import {join, parse} from 'node:path';
import {readFile, mkdirIfNotExist, rmdir, writeFile, log, isMarkdown, isDirectory, copyFile, applyTemplate} from './libs.js';
import convertMarkdown from './convert-markdown.js';
import glob from 'glob';

const IGNORE = [
  'node_modules/**',
  "scripts/**",
  "build/**",
  "dev-build/**",
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
    // const {html, meta} = await mdToHTML(markdown);
    const {html, meta} = await convertMarkdown(markdown, { relPath: file });
    const name = parsed.name === 'README' ? 'index' : parsed.name;
    outputPath = join(OUTPUT, parsed.dir, `${name}.html`); 
    log('convert', `${file} => ${outputPath}`);
    writeFile(outputPath, applyTemplate(html, meta));
  } else if (isDirectory(file)) {

    log('create', outputPath);
    mkdirIfNotExist(outputPath);
  } else if (!isDirectory(file)) {
    log('copy', `${file} => ${outputPath}`);
    copyFile(file, outputPath);
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
