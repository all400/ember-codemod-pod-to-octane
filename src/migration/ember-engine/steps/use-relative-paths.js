import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

import glob from 'glob';

function normalizeRelativePath(relativePath) {
  if (relativePath.startsWith('..')) {
    return relativePath;
  }

  return `./${relativePath}`;
}

function updateFile(oldFile, { filePath, projectName, projectRoot }) {
  const regex = new RegExp(`(?:'|")(${projectName}/(.*/)*(.*))(?:'|")`, 'g');
  const matchResults = [...oldFile.matchAll(regex)];

  let newFile = oldFile;

  matchResults.forEach((matchResult) => {
    // eslint-disable-next-line no-unused-vars
    const [_, oldPath, remainingDirectories, fileName] = matchResult;

    const from = dirname(filePath);
    const to = join(projectRoot, remainingDirectories);

    const relativePath = join(relative(from, to), fileName);
    const newPath = normalizeRelativePath(relativePath);

    newFile = newFile.replace(oldPath, newPath);
  });

  return newFile;
}

function useRelativePathInAddonFolder(options) {
  const { projectName, projectRoot } = options;

  // File extensions had been specified, partly to encode assumptions
  // about Ember, and partly to avoid corrupting non-text files
  const filePaths = glob.sync('addon/**/*.{d.ts,js,ts}', {
    cwd: projectRoot,
    dot: true,
    nodir: true,
  });

  filePaths.forEach((filePath) => {
    const oldPath = join(projectRoot, filePath);
    const oldFile = readFileSync(oldPath, 'utf8');

    const newFile = updateFile(oldFile, {
      filePath,
      projectName,
      projectRoot: 'addon',
    });

    writeFileSync(oldPath, newFile, 'utf8');
  });
}

function useRelativePathInTestsFolder(options) {
  const { projectRoot } = options;

  // File extensions had been specified, partly to encode assumptions
  // about Ember, and partly to avoid corrupting non-text files
  const filePaths = glob.sync('tests/**/*.{d.ts,js,ts}', {
    cwd: projectRoot,
    dot: true,
    ignore: 'tests/dummy/**/*',
    nodir: true,
  });

  filePaths.forEach((filePath) => {
    const oldPath = join(projectRoot, filePath);
    const oldFile = readFileSync(oldPath, 'utf8');

    const newFile = updateFile(oldFile, {
      filePath,
      projectName: 'dummy',
      projectRoot: '',
    });

    writeFileSync(oldPath, newFile, 'utf8');
  });
}

function useRelativePathInTestsDummyFolder(options) {
  const { projectRoot } = options;

  // File extensions had been specified, partly to encode assumptions
  // about Ember, and partly to avoid corrupting non-text files
  const filePaths = glob.sync('tests/dummy/**/*.{d.ts,js,ts}', {
    cwd: projectRoot,
    dot: true,
    nodir: true,
  });

  filePaths.forEach((filePath) => {
    const oldPath = join(projectRoot, filePath);
    const oldFile = readFileSync(oldPath, 'utf8');

    const newFile = updateFile(oldFile, {
      filePath,
      projectName: 'dummy',
      projectRoot: 'tests/dummy/app',
    });

    writeFileSync(oldPath, newFile, 'utf8');
  });
}

export function useRelativePaths(options) {
  useRelativePathInAddonFolder(options);
  useRelativePathInTestsFolder(options);
  useRelativePathInTestsDummyFolder(options);
}
