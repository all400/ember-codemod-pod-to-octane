import { migrateEmberEngine } from '../../../../src/migration/ember-engine/index.js';
import {
  inputProject,
  outputProject,
} from '../../../fixtures/engine-typescript.js';
import { assertFixture, loadFixture, test } from '../../../test-helpers.js';

const projectRoot = 'tmp/engine-typescript';

test('migration | ember-engine | index > TypeScript', function () {
  loadFixture(projectRoot, inputProject);

  migrateEmberEngine({
    projectRoot,
    testRun: false,
  });

  assertFixture(projectRoot, outputProject);

  // Check idempotence
  migrateEmberEngine({
    projectRoot,
    testRun: false,
  });

  assertFixture(projectRoot, outputProject);
});
