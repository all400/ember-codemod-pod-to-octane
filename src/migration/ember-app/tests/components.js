import { join } from 'node:path';

import glob from 'glob';

import { mapFilePath } from '../../../utils/files.js';

export function migrationStrategyForComponents(options) {
  const { podPath, projectRoot } = options;

  const oldPaths = glob.sync(
    join(
      'tests/integration',
      podPath,
      'components',
      '**',
      'component-test.{js,ts}'
    ),
    {
      cwd: projectRoot,
    }
  );

  return oldPaths.map((oldPath) => {
    if (oldPath.endsWith('.ts')) {
      return mapFilePath(oldPath, {
        find: {
          directory: join('tests/integration', podPath, 'components'),
          file: 'component-test.ts',
        },
        replace(key) {
          return `tests/integration/components/${key}-test.ts`;
        },
      });
    }

    return mapFilePath(oldPath, {
      find: {
        directory: join('tests/integration', podPath, 'components'),
        file: 'component-test.js',
      },
      replace(key) {
        return `tests/integration/components/${key}-test.js`;
      },
    });
  });
}
