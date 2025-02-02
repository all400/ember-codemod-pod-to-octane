import { migrateEmberAddon } from '../../../../src/migration/ember-addon/index.js';
import {
  inputProject,
  outputProject,
} from '../../../fixtures/ember-addon/javascript/index.js';
import { codemodOptions } from '../../../helpers/shared-test-setups/ember-addon/javascript.js';
import { assertFixture, loadFixture, test } from '../../../helpers/testing.js';

test('migration | ember-addon | index > javascript', function () {
  loadFixture(inputProject, codemodOptions);

  migrateEmberAddon(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  migrateEmberAddon(codemodOptions);

  assertFixture(outputProject, codemodOptions);
});
