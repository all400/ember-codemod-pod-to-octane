import { migrationStrategyForComponentTemplates } from '../../../../../src/migration/ember-engine/addon/component-templates.js';
import { inputProject } from '../../../../fixtures/ember-engine/typescript/index.js';
import {
  codemodOptions,
  options,
} from '../../../../helpers/shared-test-setups/ember-engine/typescript.js';
import { assert, loadFixture, test } from '../../../../helpers/testing.js';

test('migration | ember-engine | addon | component-templates > typescript', function () {
  loadFixture(inputProject, codemodOptions);

  const migrationStrategy = migrationStrategyForComponentTemplates(options);

  assert.deepStrictEqual(migrationStrategy, [
    [
      'addon/components/product/card/template.hbs',
      'addon/components/product/card.hbs',
    ],
    [
      'addon/components/product/details/template.hbs',
      'addon/components/product/details.hbs',
    ],
    [
      'addon/components/product/image/template.hbs',
      'addon/components/product/image.hbs',
    ],
  ]);
});
