import glob from 'glob';

import { mapFilePath } from '../../../utils/files.js';

export function migrationStrategyForRouteControllers(options) {
  const { projectRoot } = options;

  /*
    Case 1: Didn't pass the --pod flag, but configured { usePods: true } in .ember-cli
  */
  const oldPaths1 = glob.sync(
    'tests/unit/!(controllers)/**/controller-test.{js,ts}',
    {
      cwd: projectRoot,
    }
  );

  const newPaths1 = oldPaths1.map((oldPath) => {
    if (oldPath.endsWith('.ts')) {
      return mapFilePath(oldPath, {
        find: {
          directory: 'tests/unit',
          file: 'controller-test.ts',
        },
        replace(key) {
          return `tests/unit/controllers/${key}-test.ts`;
        },
      });
    }

    return mapFilePath(oldPath, {
      find: {
        directory: 'tests/unit',
        file: 'controller-test.js',
      },
      replace(key) {
        return `tests/unit/controllers/${key}-test.js`;
      },
    });
  });

  /*
    Case 2: Passed the --pod flag to Ember CLI
  */
  const oldPaths2 = glob.sync(
    'tests/unit/controllers/**/controller-test.{js,ts}',
    {
      cwd: projectRoot,
    }
  );

  const newPaths2 = oldPaths2.map((oldPath) => {
    if (oldPath.endsWith('.ts')) {
      return mapFilePath(oldPath, {
        find: {
          directory: 'tests/unit/controllers',
          file: 'controller-test.ts',
        },
        replace(key) {
          return `tests/unit/controllers/${key}-test.ts`;
        },
      });
    }

    return mapFilePath(oldPath, {
      find: {
        directory: 'tests/unit/controllers',
        file: 'controller-test.js',
      },
      replace(key) {
        return `tests/unit/controllers/${key}-test.js`;
      },
    });
  });

  return [...newPaths1, ...newPaths2];
}
