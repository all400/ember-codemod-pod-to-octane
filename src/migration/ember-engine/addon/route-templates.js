import glob from 'glob';

import { mapFilePath } from '../../../utils/files.js';

export function migrationStrategyForRouteTemplates(options) {
  const { projectRoot } = options;

  const oldPaths = glob.sync('addon/!(components)/**/template.hbs', {
    cwd: projectRoot,
  });

  return oldPaths.map((oldPath) => {
    return mapFilePath(oldPath, {
      find: {
        directory: 'addon',
        file: 'template.hbs',
      },
      replace(key) {
        return `addon/templates/${key}.hbs`;
      },
    });
  });
}
