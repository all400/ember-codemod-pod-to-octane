import { join } from 'node:path';

import glob from 'glob';

import { mapFilePath } from '../../../utils/files.js';

export function migrationStrategyForRouteRoutes(options) {
  const { podPath, projectRoot } = options;

  const oldPaths = glob.sync(join('app', podPath, '**', 'route.{js,ts}'), {
    cwd: projectRoot,
  });

  return oldPaths.map((oldPath) => {
    if (oldPath.endsWith('.ts')) {
      return mapFilePath(oldPath, {
        find: {
          directory: join('app', podPath),
          file: 'route.ts',
        },
        replace(key) {
          return `app/routes/${key}.ts`;
        },
      });
    }

    return mapFilePath(oldPath, {
      find: {
        directory: join('app', podPath),
        file: 'route.js',
      },
      replace(key) {
        return `app/routes/${key}.js`;
      },
    });
  });
}
